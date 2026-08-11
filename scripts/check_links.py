#!/usr/bin/env python3
"""Check catalog links, failing only on definitive HTTP 404/410 responses by default."""

from __future__ import annotations

import argparse
import concurrent.futures
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict

sys.dont_write_bytecode = True
from catalog import Catalog, ValidationError, load_catalog, split_values


USER_AGENT = "sdn-nfv-papers-link-check/1.0 (+https://github.com/GeminiLight/sdn-nfv-papers)"
DEFINITIVE_FAILURES = {404, 410}


class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, file_pointer, code, message, headers, new_url):
        return None


def collect_urls(catalog: Catalog) -> dict[str, list[str]]:
    locations: dict[str, list[str]] = defaultdict(list)

    def add(url: str, location: str) -> None:
        if url:
            locations[url].append(location)

    for paper in catalog.papers:
        paper_id = paper["paper_id"]
        for field in ("paper_url", "code_url", "data_url", "metadata_source_url"):
            add(paper[field], f"{paper_id}:{field}")
        for url in split_values(paper["other_urls"]):
            add(url, f"{paper_id}:other_urls")
    for venue, row in catalog.venues.items():
        for url in split_values(row["rank_source_urls"]):
            add(url, f"venue:{venue}:rank_source_urls")
    for row in catalog.screening:
        add(row["source_url"], f"screening:{row['candidate_id']}:source_url")
    return dict(locations)


def crossref_registry_status(url: str, timeout: float) -> tuple[str, int | None, str] | None:
    parsed = urllib.parse.urlparse(url)
    if parsed.netloc.casefold().removeprefix("www.") not in {"doi.org", "dx.doi.org"}:
        return None
    doi = urllib.parse.unquote(parsed.path).strip("/")
    if not doi:
        return None
    registry_url = f"https://api.crossref.org/works/{urllib.parse.quote(doi, safe='')}"
    request = urllib.request.Request(
        registry_url,
        headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
        method="GET",
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            if response.status == 200:
                return "ok", 200, f"registered DOI via {registry_url}"
    except urllib.error.HTTPError as error:
        error.close()
        return None
    except (OSError, urllib.error.URLError):
        return None
    return None


def doi_resolver_status(url: str, timeout: float) -> tuple[str, int | None, str] | None:
    parsed = urllib.parse.urlparse(url)
    if parsed.netloc.casefold().removeprefix("www.") not in {"doi.org", "dx.doi.org"}:
        return None
    request = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "*/*"},
        method="HEAD",
    )
    opener = urllib.request.build_opener(NoRedirectHandler())
    try:
        with opener.open(request, timeout=timeout) as response:
            if 200 <= response.status < 400:
                return "ok", response.status, response.geturl()
    except urllib.error.HTTPError as error:
        code = error.code
        location = error.headers.get("Location", "")
        detail = str(error)
        error.close()
        if 300 <= code < 400 and location:
            return "ok", code, location
        if code in DEFINITIVE_FAILURES:
            return "broken", code, detail
    except (OSError, urllib.error.URLError):
        return None
    return None


def request_status(url: str, timeout: float) -> tuple[str, int | None, str]:
    resolver_result = doi_resolver_status(url, timeout)
    if resolver_result:
        return resolver_result
    headers = {"User-Agent": USER_AGENT, "Accept": "*/*"}
    for method in ("HEAD", "GET"):
        request_headers = dict(headers)
        if method == "GET":
            request_headers["Range"] = "bytes=0-0"
        request = urllib.request.Request(url, headers=request_headers, method=method)
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return "ok", response.status, response.geturl()
        except urllib.error.HTTPError as error:
            code = error.code
            detail = str(error)
            error.close()
            if method == "HEAD" and code not in DEFINITIVE_FAILURES:
                continue
            if code in DEFINITIVE_FAILURES:
                return "broken", code, detail
            registry_result = crossref_registry_status(url, timeout)
            if registry_result:
                return registry_result
            return "warning", code, detail
        except (OSError, urllib.error.URLError) as error:
            if method == "HEAD":
                continue
            registry_result = crossref_registry_status(url, timeout)
            if registry_result:
                return registry_result
            return "warning", None, str(error)
    return "warning", None, "request failed without a response"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workers", type=int, default=10, help="number of concurrent requests")
    parser.add_argument("--timeout", type=float, default=15.0, help="timeout per request in seconds")
    parser.add_argument("--limit", type=int, default=0, help="check only the first N sorted URLs")
    parser.add_argument("--strict", action="store_true", help="also fail on timeouts, rate limits, and other warnings")
    args = parser.parse_args()

    try:
        locations = collect_urls(load_catalog())
    except ValidationError as error:
        print(f"catalog validation failed:\n{error}", file=sys.stderr)
        return 2

    urls = sorted(locations)
    if args.limit > 0:
        urls = urls[: args.limit]
    results: list[tuple[str, str, int | None, str]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, args.workers)) as executor:
        futures = {executor.submit(request_status, url, args.timeout): url for url in urls}
        for future in concurrent.futures.as_completed(futures):
            url = futures[future]
            status, code, detail = future.result()
            results.append((url, status, code, detail))

    counts = {status: sum(result[1] == status for result in results) for status in ("ok", "warning", "broken")}
    for url, status, code, detail in sorted(results):
        if status == "ok":
            continue
        references = ", ".join(locations[url][:3])
        suffix = f" (+{len(locations[url]) - 3} more)" if len(locations[url]) > 3 else ""
        print(f"{status.upper()} {code or '-'} {url} [{references}{suffix}] — {detail}")
    print(f"checked {len(results)} unique URLs: ok={counts['ok']}, warning={counts['warning']}, broken={counts['broken']}")
    return 1 if counts["broken"] or (args.strict and counts["warning"]) else 0


if __name__ == "__main__":
    raise SystemExit(main())
