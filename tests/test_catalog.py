from __future__ import annotations

import csv
import shutil
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

from catalog import (  # noqa: E402
    PAPER_FIELDS,
    PROVENANCE_FIELDS,
    TAXONOMY_FIELDS,
    VENUE_FIELDS,
    ValidationError,
    load_catalog,
)


class CatalogValidationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.data_dir = Path(self.temporary_directory.name) / "data"
        shutil.copytree(ROOT / "data", self.data_dir)

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    def read_rows(self, filename: str) -> list[dict[str, str]]:
        with (self.data_dir / filename).open(newline="", encoding="utf-8") as handle:
            return list(csv.DictReader(handle))

    def write_rows(self, filename: str, fields: tuple[str, ...], rows: list[dict[str, str]]) -> None:
        with (self.data_dir / filename).open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=fields, quoting=csv.QUOTE_ALL, lineterminator="\n")
            writer.writeheader()
            writer.writerows(rows)

    def test_repository_catalog_is_valid_and_fully_joined(self) -> None:
        catalog = load_catalog(ROOT / "data")
        self.assertGreater(len(catalog.papers), 0)
        self.assertEqual(len(catalog.papers), len(catalog.provenance))
        self.assertEqual(len(catalog.papers), len(catalog.taxonomy))
        self.assertTrue(all(paper["paper_type"] for paper in catalog.papers))

    def test_empty_paper_catalog_is_rejected(self) -> None:
        self.write_rows("papers.csv", PAPER_FIELDS, [])
        with self.assertRaisesRegex(ValidationError, "at least one paper"):
            load_catalog(self.data_dir)

    def test_duplicate_normalized_title_is_rejected(self) -> None:
        rows = self.read_rows("papers.csv")
        rows[1]["title"] = rows[0]["title"].swapcase()
        self.write_rows("papers.csv", PAPER_FIELDS, rows)
        with self.assertRaisesRegex(ValidationError, "duplicate normalized title"):
            load_catalog(self.data_dir)

    def test_cross_record_identifier_in_other_urls_is_rejected(self) -> None:
        rows = self.read_rows("papers.csv")
        rows[1]["other_urls"] = rows[0]["paper_url"]
        self.write_rows("papers.csv", PAPER_FIELDS, rows)
        with self.assertRaisesRegex(ValidationError, "identifier claimed by multiple records"):
            load_catalog(self.data_dir)

    def test_shared_alternate_identifier_is_rejected(self) -> None:
        rows = self.read_rows("papers.csv")
        rows[0]["other_urls"] = "https://doi.org/10.9999/shared-alternate"
        rows[1]["other_urls"] = "https://doi.org/10.9999/shared-alternate"
        self.write_rows("papers.csv", PAPER_FIELDS, rows)
        with self.assertRaisesRegex(ValidationError, "doi:10.9999/shared-alternate"):
            load_catalog(self.data_dir)

    def test_venue_rank_drift_is_rejected(self) -> None:
        rows = self.read_rows("venues.csv")
        ranked = next(row for row in rows if row["ccf_rank"] == "A")
        ranked["ccf_rank"] = "B"
        self.write_rows("venues.csv", VENUE_FIELDS, rows)
        with self.assertRaisesRegex(ValidationError, "do not match venue registry"):
            load_catalog(self.data_dir)

    def test_taxonomy_and_legacy_categories_must_agree(self) -> None:
        rows = self.read_rows("taxonomy.csv")
        rows[0]["method_families"] = "systems"
        self.write_rows("taxonomy.csv", TAXONOMY_FIELDS, rows)
        with self.assertRaisesRegex(ValidationError, "do not match ordered taxonomy projection"):
            load_catalog(self.data_dir)

    def test_taxonomy_method_order_must_match_readme_order(self) -> None:
        rows = self.read_rows("taxonomy.csv")
        hybrid = next(row for row in rows if "; " in row["method_families"])
        hybrid["method_families"] = "; ".join(reversed(hybrid["method_families"].split("; ")))
        self.write_rows("taxonomy.csv", TAXONOMY_FIELDS, rows)
        with self.assertRaisesRegex(ValidationError, "ordered taxonomy projection"):
            load_catalog(self.data_dir)

    def test_legacy_provenance_requires_an_explanation(self) -> None:
        rows = self.read_rows("provenance.csv")
        legacy = next(row for row in rows if row["verification_status"] == "legacy")
        legacy["notes"] = ""
        self.write_rows("provenance.csv", PROVENANCE_FIELDS, rows)
        with self.assertRaisesRegex(ValidationError, "legacy status requires explanatory notes"):
            load_catalog(self.data_dir)

    def test_verification_date_must_be_a_real_calendar_date(self) -> None:
        rows = self.read_rows("provenance.csv")
        verified = next(row for row in rows if row["verification_status"] == "verified")
        verified["verified_at"] = "2026-02-31"
        self.write_rows("provenance.csv", PROVENANCE_FIELDS, rows)
        with self.assertRaisesRegex(ValidationError, "verified_at must use YYYY-MM-DD"):
            load_catalog(self.data_dir)

    def test_unquoted_csv_is_rejected(self) -> None:
        path = self.data_dir / "papers.csv"
        raw = path.read_text(encoding="utf-8")
        path.write_text(raw.replace('"paper_id"', "paper_id", 1), encoding="utf-8")
        with self.assertRaisesRegex(ValidationError, "quote every field"):
            load_catalog(self.data_dir)


if __name__ == "__main__":
    unittest.main()
