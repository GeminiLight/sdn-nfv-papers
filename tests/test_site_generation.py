from __future__ import annotations

import sys
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

from generate_site import OUTPUT_PATHS, SITE_URL, build_outputs  # noqa: E402


class PaperItemCounter(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.count = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "li" and "paper-item" in dict(attrs).get("class", "").split():
            self.count += 1


class LocalAssetCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.paths: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        reference: str | None = None
        if tag == "link" and "stylesheet" in (attributes.get("rel") or "").split():
            reference = attributes.get("href")
        elif tag == "script":
            reference = attributes.get("src")
        if not reference:
            return
        parsed = urlsplit(reference)
        if not parsed.scheme and not parsed.netloc and parsed.path:
            self.paths.add(parsed.path.removeprefix("./"))


class SiteGenerationTests(unittest.TestCase):
    def test_static_index_contains_every_paper(self) -> None:
        outputs, paper_count = build_outputs()
        parser = PaperItemCounter()
        parser.feed(outputs[OUTPUT_PATHS["static"]])
        self.assertEqual(paper_count, parser.count)
        self.assertIn(f'<link rel="canonical" href="{SITE_URL}papers.html">', outputs[OUTPUT_PATHS["static"]])

    def test_all_generated_site_artifacts_are_present(self) -> None:
        outputs, _ = build_outputs()
        self.assertEqual(set(OUTPUT_PATHS.values()), set(outputs))
        self.assertTrue(all(path.exists() for path in OUTPUT_PATHS.values()))

    def test_interactive_page_exposes_new_filter_and_export_controls(self) -> None:
        page = (ROOT / "index.html").read_text(encoding="utf-8")
        for control_id in (
            "filter-paper-type",
            "filter-method",
            "filter-scenario",
            "filter-verification",
            "filter-availability",
            "filter-toggle",
            "active-filters",
            "export-csv",
            "export-bibtex",
            "pagination",
        ):
            self.assertIn(f'id="{control_id}"', page)
        self.assertNotIn('id="load-more"', page)

    def test_interactive_page_local_assets_exist(self) -> None:
        page = (ROOT / "index.html").read_text(encoding="utf-8")
        parser = LocalAssetCollector()
        parser.feed(page)
        self.assertGreater(len(parser.paths), 0)
        for path in parser.paths:
            with self.subTest(path=path):
                self.assertTrue((ROOT / path).is_file(), f"missing local website asset: {path}")

    def test_interactive_page_uses_custom_select_enhancement(self) -> None:
        page = (ROOT / "index.html").read_text(encoding="utf-8")
        script = (ROOT / "assets" / "app.js").read_text(encoding="utf-8")
        styles = (ROOT / "assets" / "selects.css").read_text(encoding="utf-8")
        self.assertIn('href="assets/selects.css"', page)
        self.assertIn("initializeCustomSelects();", script)
        self.assertIn('role", "listbox"', script)
        self.assertIn(".select-menu", styles)

    def test_custom_select_triggers_are_not_nested_in_native_labels(self) -> None:
        page = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertNotIn('<label class="filter-field">', page)
        self.assertNotIn('<label class="sort-control">', page)
        self.assertEqual(9, page.count('<div class="filter-field">'))
        self.assertEqual(1, page.count('<div class="sort-control">'))

    def test_static_index_uses_shared_brand_treatment(self) -> None:
        outputs, _ = build_outputs()
        static_page = outputs[OUTPUT_PATHS["static"]]
        self.assertIn('href="assets/brand.css"', static_page)
        self.assertIn('class="wordmark-descriptor">Paper Index</span>', static_page)

    def test_canonical_domain_is_consistent_across_pages_and_readme(self) -> None:
        expected_url = "https://tianfuwang.tech/sdn-nfv-papers/"
        self.assertEqual(expected_url, SITE_URL)
        self.assertFalse(
            (ROOT / "CNAME").exists(),
            "the project site must inherit the account-site custom domain instead of overriding it",
        )
        page = (ROOT / "index.html").read_text(encoding="utf-8")
        header = (ROOT / "data" / "README.header.md").read_text(encoding="utf-8")
        self.assertIn(f'<link rel="canonical" href="{expected_url}">', page)
        self.assertIn(f'<meta property="og:url" content="{expected_url}">', page)
        self.assertIn(f"[Website]({expected_url})", header)


if __name__ == "__main__":
    unittest.main()
