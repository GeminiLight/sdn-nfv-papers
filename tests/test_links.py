from __future__ import annotations

import sys
import unittest
import urllib.error
from pathlib import Path
from unittest import mock


ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

from catalog import load_catalog  # noqa: E402
from check_links import collect_urls, doi_resolver_status, request_status  # noqa: E402


class LinkCollectionTests(unittest.TestCase):
    def test_every_primary_paper_url_is_scheduled_once(self) -> None:
        catalog = load_catalog()
        urls = collect_urls(catalog)
        for paper in catalog.papers:
            self.assertIn(paper["paper_url"], urls)
            self.assertIn(f"{paper['paper_id']}:paper_url", urls[paper["paper_url"]])

    def test_registry_and_screening_sources_are_included(self) -> None:
        catalog = load_catalog()
        urls = collect_urls(catalog)
        self.assertTrue(any(reference.startswith("venue:") for references in urls.values() for reference in references))
        self.assertTrue(any(reference.startswith("screening:") for references in urls.values() for reference in references))


class RequestStatusTests(unittest.TestCase):
    class Response:
        status = 200

        def __enter__(self):
            return self

        def __exit__(self, *_args):
            return False

        def geturl(self) -> str:
            return "https://example.com/final"

    def test_head_access_denied_retries_with_get(self) -> None:
        denied = urllib.error.HTTPError("https://example.com", 403, "Forbidden", {}, None)
        with mock.patch("check_links.urllib.request.urlopen", side_effect=[denied, self.Response()]) as urlopen:
            status, code, final_url = request_status("https://example.com", 1)
        self.assertEqual(("ok", 200, "https://example.com/final"), (status, code, final_url))
        self.assertEqual("HEAD", urlopen.call_args_list[0].args[0].get_method())
        self.assertEqual("GET", urlopen.call_args_list[1].args[0].get_method())

    def test_not_found_is_definitive_without_get_retry(self) -> None:
        missing = urllib.error.HTTPError("https://example.com", 404, "Not Found", {}, None)
        with mock.patch("check_links.urllib.request.urlopen", side_effect=missing) as urlopen:
            status, code, _ = request_status("https://example.com", 1)
        self.assertEqual(("broken", 404), (status, code))
        self.assertEqual(1, urlopen.call_count)

    def test_doi_access_denied_falls_back_to_crossref(self) -> None:
        denied_head = urllib.error.HTTPError("https://doi.org/10.1000/example", 403, "Forbidden", {}, None)
        denied_get = urllib.error.HTTPError("https://doi.org/10.1000/example", 403, "Forbidden", {}, None)
        with (
            mock.patch("check_links.doi_resolver_status", return_value=None),
            mock.patch(
                "check_links.urllib.request.urlopen",
                side_effect=[denied_head, denied_get, self.Response()],
            ) as urlopen,
        ):
            status, code, detail = request_status("https://doi.org/10.1000/example", 1)
        self.assertEqual(("ok", 200), (status, code))
        self.assertIn("api.crossref.org", detail)
        registry_request = urlopen.call_args_list[2].args[0]
        self.assertIn("api.crossref.org/works/10.1000%2Fexample", registry_request.full_url)

    def test_doi_redirect_is_healthy_without_following_publisher(self) -> None:
        redirect = urllib.error.HTTPError(
            "https://doi.org/10.1000/example",
            302,
            "Found",
            {"Location": "https://publisher.example/paper"},
            None,
        )
        opener = mock.Mock()
        opener.open.side_effect = redirect
        with mock.patch("check_links.urllib.request.build_opener", return_value=opener):
            status, code, location = doi_resolver_status("https://doi.org/10.1000/example", 1)
        self.assertEqual(("ok", 302, "https://publisher.example/paper"), (status, code, location))


if __name__ == "__main__":
    unittest.main()
