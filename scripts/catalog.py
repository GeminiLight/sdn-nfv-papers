#!/usr/bin/env python3
"""Load and validate the paper catalog and its companion registries."""

from __future__ import annotations

import csv
import io
import re
import unicodedata
from collections import Counter
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"

PAPER_FIELDS = (
    "paper_id",
    "title",
    "categories",
    "directions",
    "venue",
    "year",
    "ranks",
    "authors",
    "keywords",
    "objectives",
    "paper_url",
    "code_url",
    "data_url",
    "other_urls",
)
VENUE_FIELDS = (
    "venue",
    "display_name",
    "venue_type",
    "ccf_rank",
    "ccf_edition",
    "jcr_quartile",
    "jcr_year",
    "rank_source_urls",
)
PROVENANCE_FIELDS = (
    "paper_id",
    "metadata_source_url",
    "verification_status",
    "verified_at",
    "notes",
)
TAXONOMY_FIELDS = ("paper_id", "paper_type", "method_families", "scenarios")
SCREENING_FIELDS = (
    "candidate_id",
    "title",
    "venue",
    "year",
    "status",
    "reason",
    "source_url",
    "reviewed_at",
)

CATEGORIES = (
    ("survey_analysis", "1. Survey and Analysis", False),
    ("mathematical", "2. Mathematical-based Methods", True),
    ("heuristic", "3. Heuristic-based Methods", True),
    ("machine_learning", "4. Machine Learning-based Methods", True),
    ("other_unclassified", "5. Systems and Other Methods", False),
)
DIRECTIONS = (
    ("slicing", 1, "Slicing"),
    ("chaining", 2, "Chaining"),
    ("deployment", 3, "Deployment"),
    ("scheduling", 4, "Scheduling"),
    ("routing", 5, "Routing"),
    ("", 6, "Other"),
)

ALLOWED_CATEGORIES = {item[0] for item in CATEGORIES}
ALLOWED_DIRECTIONS = {item[0] for item in DIRECTIONS if item[0]}
ALLOWED_PAPER_TYPES = {"research", "survey_analysis"}
ALLOWED_METHODS = {"mathematical", "heuristic", "machine_learning", "systems", "unclassified"}
ALLOWED_SCENARIOS = {
    "5g",
    "6g",
    "cloud",
    "data_center",
    "edge",
    "industrial_iot",
    "internet_of_vehicles",
    "iot",
    "mobile",
    "multi_domain",
    "optical",
    "radio_access",
    "satellite",
    "smart_city",
}
ALLOWED_VENUE_TYPES = {"conference", "journal", "magazine", "preprint", "workshop"}
ALLOWED_VERIFICATION_STATUSES = {"legacy", "pending", "verified"}
ALLOWED_SCREENING_STATUSES = {"exclude", "include", "pending"}
MULTI_VALUE_PAPER_FIELDS = (
    "categories",
    "directions",
    "ranks",
    "authors",
    "keywords",
    "objectives",
    "other_urls",
)


class ValidationError(Exception):
    """Raised when catalog data violates a repository invariant."""


@dataclass(frozen=True)
class Catalog:
    papers: list[dict[str, str]]
    venues: dict[str, dict[str, str]]
    provenance: dict[str, dict[str, str]]
    taxonomy: dict[str, dict[str, str]]
    screening: list[dict[str, str]]


def split_values(value: str) -> list[str]:
    return [part.strip() for part in value.split(";") if part.strip()]


def primary_value(value: str) -> str:
    values = split_values(value)
    return values[0] if values else ""


def normalize_title(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value).casefold()
    return "".join(character for character in normalized if character.isalnum())


def validate_url(value: str, field: str, record_id: str, errors: list[str]) -> None:
    if not value:
        return
    parsed = urlparse(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        errors.append(f"{record_id}: invalid {field}: {value}")


def _canonical_csv(rows: list[list[str]]) -> str:
    output = io.StringIO(newline="")
    csv.writer(output, quoting=csv.QUOTE_ALL, lineterminator="\n").writerows(rows)
    return output.getvalue()


def _read_csv(path: Path, expected_fields: tuple[str, ...]) -> list[dict[str, str]]:
    try:
        raw = path.read_text(encoding="utf-8")
    except OSError as error:
        raise ValidationError(f"unable to read {path}: {error}") from error

    try:
        parsed_rows = list(csv.reader(io.StringIO(raw, newline=""), strict=True))
    except csv.Error as error:
        raise ValidationError(f"{path}: malformed CSV: {error}") from error

    if not parsed_rows:
        raise ValidationError(f"{path}: file is empty")
    if tuple(parsed_rows[0]) != expected_fields:
        raise ValidationError(
            f"{path}: header mismatch\n"
            f"expected: {','.join(expected_fields)}\n"
            f"actual:   {','.join(parsed_rows[0])}"
        )
    if raw != _canonical_csv(parsed_rows):
        raise ValidationError(
            f"{path}: CSV must quote every field, use LF line endings, and end with one newline"
        )

    rows: list[dict[str, str]] = []
    errors: list[str] = []
    for line_number, values in enumerate(parsed_rows[1:], start=2):
        if len(values) != len(expected_fields):
            errors.append(f"{path}:{line_number}: expected {len(expected_fields)} fields, got {len(values)}")
            continue
        rows.append(dict(zip(expected_fields, values, strict=True)))
    if errors:
        raise ValidationError("\n".join(errors))
    return rows


def _validate_multi_value(value: str, field: str, prefix: str, errors: list[str]) -> None:
    values = split_values(value)
    canonical = "; ".join(values)
    if value != canonical:
        errors.append(f"{prefix}: {field} must use canonical '; ' separators")
    duplicates = [item for item, count in Counter(item.casefold() for item in values).items() if count > 1]
    if duplicates:
        errors.append(f"{prefix}: duplicate values in {field}: {duplicates}")


def _canonical_paper_url(paper_id: str) -> str:
    if paper_id.startswith("doi:"):
        return f"https://doi.org/{paper_id[4:]}"
    if paper_id.startswith("arxiv:"):
        return f"https://arxiv.org/abs/{paper_id[6:]}"
    return ""


def identifier_from_url(url: str) -> str:
    parsed = urlparse(url)
    host = parsed.netloc.casefold().removeprefix("www.")
    path = unquote(parsed.path).strip("/")
    if host in {"doi.org", "dx.doi.org"} and path:
        return f"doi:{path.casefold()}"
    if host == "arxiv.org":
        match = re.match(r"(?:abs|pdf)/([^/?#]+?)(?:\.pdf)?$", path, flags=re.IGNORECASE)
        if match:
            return f"arxiv:{match.group(1).casefold()}"
    if host == "dl.acm.org":
        match = re.match(r"doi/(?:abs/|pdf/)?(10\..+)$", path, flags=re.IGNORECASE)
        if match:
            return f"doi:{match.group(1).casefold()}"
    return ""


def is_iso_date(value: str) -> bool:
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return False
    try:
        date.fromisoformat(value)
    except ValueError:
        return False
    return True


def load_papers(path: Path | None = None) -> list[dict[str, str]]:
    csv_path = path or DATA_DIR / "papers.csv"
    papers = _read_csv(csv_path, PAPER_FIELDS)
    if not papers:
        raise ValidationError(f"{csv_path}: catalog must contain at least one paper")
    errors: list[str] = []
    required = ("paper_id", "title", "categories", "venue", "year", "authors", "paper_url")

    ids = Counter(paper["paper_id"].casefold() for paper in papers)
    for paper_id, count in ids.items():
        if count > 1:
            errors.append(f"duplicate paper_id: {paper_id}")

    normalized_titles: dict[str, list[str]] = {}
    canonical_urls: dict[str, list[str]] = {}
    identifier_claims: dict[str, set[str]] = {}
    for line_number, paper in enumerate(papers, start=2):
        prefix = f"{csv_path}:{line_number} ({paper.get('paper_id') or 'missing id'})"
        for field in required:
            if not paper[field].strip():
                errors.append(f"{prefix}: blank {field}")
        for field in PAPER_FIELDS:
            if "\n" in paper[field] or "\r" in paper[field]:
                errors.append(f"{prefix}: embedded newline in {field}")
        for field in MULTI_VALUE_PAPER_FIELDS:
            _validate_multi_value(paper[field], field, prefix, errors)

        if not re.fullmatch(r"\d{4}", paper["year"]):
            errors.append(f"{prefix}: year must contain four digits")
        unknown_categories = set(split_values(paper["categories"])) - ALLOWED_CATEGORIES
        if unknown_categories:
            errors.append(f"{prefix}: unknown categories: {sorted(unknown_categories)}")
        unknown_directions = set(split_values(paper["directions"])) - ALLOWED_DIRECTIONS
        if unknown_directions:
            errors.append(f"{prefix}: unknown directions: {sorted(unknown_directions)}")

        validate_url(paper["paper_url"], "paper_url", prefix, errors)
        validate_url(paper["code_url"], "code_url", prefix, errors)
        validate_url(paper["data_url"], "data_url", prefix, errors)
        for url in split_values(paper["other_urls"]):
            validate_url(url, "other_urls", prefix, errors)

        expected_url = _canonical_paper_url(paper["paper_id"].casefold())
        if not expected_url:
            errors.append(f"{prefix}: paper_id must start with doi: or arxiv:")
        elif paper["paper_id"] != paper["paper_id"].casefold():
            errors.append(f"{prefix}: paper_id must use lowercase canonical form")
        elif paper["paper_url"].casefold() != expected_url.casefold():
            errors.append(f"{prefix}: paper_url does not match paper_id")

        title_key = normalize_title(paper["title"])
        normalized_titles.setdefault(title_key, []).append(paper["paper_id"])
        url_key = paper["paper_url"].casefold().rstrip("/")
        canonical_urls.setdefault(url_key, []).append(paper["paper_id"])

        identifier_claims.setdefault(paper["paper_id"].casefold(), set()).add(paper["paper_id"])
        for url in split_values(paper["other_urls"]):
            identifier = identifier_from_url(url)
            if identifier:
                identifier_claims.setdefault(identifier, set()).add(paper["paper_id"])

    for title_key, paper_ids in normalized_titles.items():
        if title_key and len(paper_ids) > 1:
            errors.append(f"duplicate normalized title: {', '.join(paper_ids)}")
    for url, paper_ids in canonical_urls.items():
        if url and len(paper_ids) > 1:
            errors.append(f"duplicate canonical paper_url: {url}: {', '.join(paper_ids)}")
    for identifier, paper_ids in identifier_claims.items():
        if len(paper_ids) > 1:
            errors.append(f"identifier claimed by multiple records: {identifier}: {', '.join(sorted(paper_ids))}")

    if errors:
        raise ValidationError("\n".join(errors))
    return papers


def _index_unique(rows: list[dict[str, str]], key: str, path: Path, errors: list[str]) -> dict[str, dict[str, str]]:
    indexed: dict[str, dict[str, str]] = {}
    for line_number, row in enumerate(rows, start=2):
        value = row[key]
        if not value:
            errors.append(f"{path}:{line_number}: blank {key}")
        elif value in indexed:
            errors.append(f"{path}:{line_number}: duplicate {key}: {value}")
        else:
            indexed[value] = row
    return indexed


def _expected_rank(venue: dict[str, str]) -> str:
    labels: list[str] = []
    if venue["ccf_rank"]:
        labels.append(f"CCF-{venue['ccf_rank']}")
    if venue["jcr_quartile"]:
        labels.append(f"JCR-{venue['jcr_quartile']}")
    return "; ".join(labels)


def load_catalog(data_dir: Path | None = None) -> Catalog:
    source_dir = data_dir or DATA_DIR
    papers = load_papers(source_dir / "papers.csv")
    venue_rows = _read_csv(source_dir / "venues.csv", VENUE_FIELDS)
    provenance_rows = _read_csv(source_dir / "provenance.csv", PROVENANCE_FIELDS)
    taxonomy_rows = _read_csv(source_dir / "taxonomy.csv", TAXONOMY_FIELDS)
    screening_rows = _read_csv(source_dir / "screening.csv", SCREENING_FIELDS)
    errors: list[str] = []

    venues = _index_unique(venue_rows, "venue", source_dir / "venues.csv", errors)
    provenance = _index_unique(provenance_rows, "paper_id", source_dir / "provenance.csv", errors)
    taxonomy = _index_unique(taxonomy_rows, "paper_id", source_dir / "taxonomy.csv", errors)
    _index_unique(screening_rows, "candidate_id", source_dir / "screening.csv", errors)

    paper_ids = {paper["paper_id"] for paper in papers}
    for name, indexed in (("provenance", provenance), ("taxonomy", taxonomy)):
        missing = sorted(paper_ids - set(indexed))
        orphaned = sorted(set(indexed) - paper_ids)
        if missing:
            errors.append(f"{name}: missing paper_id rows: {', '.join(missing)}")
        if orphaned:
            errors.append(f"{name}: orphan paper_id rows: {', '.join(orphaned)}")

    for line_number, venue in enumerate(venue_rows, start=2):
        prefix = f"{source_dir / 'venues.csv'}:{line_number} ({venue['venue'] or 'missing venue'})"
        if not venue["display_name"]:
            errors.append(f"{prefix}: blank display_name")
        if venue["venue_type"] not in ALLOWED_VENUE_TYPES:
            errors.append(f"{prefix}: invalid venue_type: {venue['venue_type']}")
        if venue["ccf_rank"] not in {"", "A", "B", "C"}:
            errors.append(f"{prefix}: invalid ccf_rank: {venue['ccf_rank']}")
        if bool(venue["ccf_rank"]) != bool(re.fullmatch(r"\d{4}", venue["ccf_edition"])):
            errors.append(f"{prefix}: ccf_edition must be a four-digit year exactly when ccf_rank is set")
        if venue["jcr_quartile"] not in {"", "Q1", "Q2", "Q3", "Q4"}:
            errors.append(f"{prefix}: invalid jcr_quartile: {venue['jcr_quartile']}")
        if bool(venue["jcr_quartile"]) != bool(re.fullmatch(r"\d{4}", venue["jcr_year"])):
            errors.append(f"{prefix}: jcr_year must be a four-digit year exactly when jcr_quartile is set")
        sources = split_values(venue["rank_source_urls"])
        _validate_multi_value(venue["rank_source_urls"], "rank_source_urls", prefix, errors)
        if _expected_rank(venue) and not sources:
            errors.append(f"{prefix}: ranked venue requires rank_source_urls")
        for url in sources:
            validate_url(url, "rank_source_urls", prefix, errors)

    for paper in papers:
        venue = venues.get(paper["venue"])
        if not venue:
            errors.append(f"{paper['paper_id']}: venue is missing from venues.csv: {paper['venue']}")
        elif paper["ranks"] != _expected_rank(venue):
            errors.append(
                f"{paper['paper_id']}: ranks {paper['ranks']!r} do not match venue registry {_expected_rank(venue)!r}"
            )

        source = provenance.get(paper["paper_id"])
        if source:
            prefix = f"{paper['paper_id']} provenance"
            validate_url(source["metadata_source_url"], "metadata_source_url", prefix, errors)
            if not source["metadata_source_url"]:
                errors.append(f"{prefix}: blank metadata_source_url")
            if source["verification_status"] not in ALLOWED_VERIFICATION_STATUSES:
                errors.append(f"{prefix}: invalid verification_status: {source['verification_status']}")
            if source["verified_at"] and not is_iso_date(source["verified_at"]):
                errors.append(f"{prefix}: verified_at must use YYYY-MM-DD")
            if source["verification_status"] == "verified" and not source["verified_at"]:
                errors.append(f"{prefix}: verified status requires verified_at")
            if source["verification_status"] != "verified" and source["verified_at"]:
                errors.append(f"{prefix}: verified_at is only allowed for verified status")
            if source["verification_status"] in {"legacy", "pending"} and not source["notes"]:
                errors.append(f"{prefix}: {source['verification_status']} status requires explanatory notes")

        classification = taxonomy.get(paper["paper_id"])
        if classification:
            prefix = f"{paper['paper_id']} taxonomy"
            paper_type = classification["paper_type"]
            methods = set(split_values(classification["method_families"]))
            scenarios = set(split_values(classification["scenarios"]))
            _validate_multi_value(classification["method_families"], "method_families", prefix, errors)
            _validate_multi_value(classification["scenarios"], "scenarios", prefix, errors)
            if paper_type not in ALLOWED_PAPER_TYPES:
                errors.append(f"{prefix}: invalid paper_type: {paper_type}")
            unknown_methods = methods - ALLOWED_METHODS
            if unknown_methods:
                errors.append(f"{prefix}: unknown method_families: {sorted(unknown_methods)}")
            unknown_scenarios = scenarios - ALLOWED_SCENARIOS
            if unknown_scenarios:
                errors.append(f"{prefix}: unknown scenarios: {sorted(unknown_scenarios)}")
            if paper_type == "research" and not methods:
                errors.append(f"{prefix}: research papers require at least one method_family")
            legacy = split_values(paper["categories"])
            expected_legacy: list[str] = []
            if paper_type == "survey_analysis":
                expected_legacy.append("survey_analysis")
            for method in split_values(classification["method_families"]):
                projected = "other_unclassified" if method in {"systems", "unclassified"} else method
                if projected not in expected_legacy:
                    expected_legacy.append(projected)
            if legacy != expected_legacy:
                errors.append(
                    f"{prefix}: legacy categories {legacy} do not match ordered taxonomy projection {expected_legacy}"
                )

    for line_number, row in enumerate(screening_rows, start=2):
        prefix = f"{source_dir / 'screening.csv'}:{line_number} ({row['candidate_id'] or 'missing id'})"
        if row["status"] not in ALLOWED_SCREENING_STATUSES:
            errors.append(f"{prefix}: invalid status: {row['status']}")
        for field in ("title", "status", "reason", "source_url", "reviewed_at"):
            if not row[field]:
                errors.append(f"{prefix}: blank {field}")
        if row["year"] and not re.fullmatch(r"\d{4}", row["year"]):
            errors.append(f"{prefix}: year must contain four digits")
        if row["reviewed_at"] and not is_iso_date(row["reviewed_at"]):
            errors.append(f"{prefix}: reviewed_at must use YYYY-MM-DD")
        validate_url(row["source_url"], "source_url", prefix, errors)
        if row["status"] == "exclude" and row["candidate_id"] in paper_ids:
            errors.append(f"{prefix}: excluded candidate is still present in papers.csv")
        if row["status"] == "include" and row["candidate_id"] not in paper_ids:
            errors.append(f"{prefix}: included candidate is missing from papers.csv")

    if errors:
        raise ValidationError("\n".join(errors))

    enriched: list[dict[str, str]] = []
    for paper in papers:
        enriched.append(
            {
                **paper,
                **taxonomy[paper["paper_id"]],
                "verification_status": provenance[paper["paper_id"]]["verification_status"],
                "verified_at": provenance[paper["paper_id"]]["verified_at"],
                "metadata_source_url": provenance[paper["paper_id"]]["metadata_source_url"],
                "venue_type": venues[paper["venue"]]["venue_type"],
                "ccf_edition": venues[paper["venue"]]["ccf_edition"],
                "jcr_year": venues[paper["venue"]]["jcr_year"],
            }
        )
    return Catalog(enriched, venues, provenance, taxonomy, screening_rows)
