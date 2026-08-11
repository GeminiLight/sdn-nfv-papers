# AGENTS.md

## Project scope

This repository maintains a curated catalog of SDN/NFV network resource allocation papers. Keep changes focused and preserve curated metadata unless authoritative evidence supports a correction.

## Sources and generated files

- `data/papers.csv` is the canonical paper catalog.
- `data/taxonomy.csv` separates paper type, method families, and scenarios while `categories` remains the compatibility field used by the README.
- `data/venues.csv` is the canonical venue/rank registry; materialized `ranks` values in `papers.csv` must match it.
- `data/provenance.csv` records source and verification status for every paper. Use `legacy` unless a source and review date are known.
- `data/screening.csv` records Include, Pending, and Exclude decisions so rejected candidates are not repeatedly reviewed.
- `data/README.header.md` and `data/README.footer.md` are manually maintained README fragments.
- `data/README.md` documents the schemas, allowed values, and ownership boundaries for the catalog sources.
- `docs/repository-settings.md` records the required branch-protection, Pages, and scheduled-maintenance settings that cannot be enforced by repository files alone.
- `README.md`, `assets/papers.js`, `papers.html`, `robots.txt`, `sitemap.xml`, `visualization/analysis.md`, and the SVG charts are generated artifacts; do not edit them directly.

## Paper data rules

- Preserve the existing CSV schema and quote every field.
- Separate multiple values with `; ` and put the primary category or direction first.
- Classify surveys with `paper_type=survey_analysis`; do not use the Survey section for primary research. Classify research methods independently in `method_families`.
- Use the latest official CCF directory for CCF ranks and re-audit venue mappings when a new edition is released.
- When both CCF and JCR ranks apply, put CCF first (for example, `CCF-C; JCR-Q1`). Treat JCR ranks as supplemental and do not add or update them without a source and ranking year.
- Use unique `doi:<doi>` or `arxiv:<id>` paper IDs with matching canonical URLs.
- Verify titles, authors, venue, year, identifiers, code, and data links from authoritative sources. Do not guess missing metadata; report uncertain items for user review.
- Do not bulk reorder or reclassify papers without explicit approval.

## Required refresh and validation

After changing any catalog CSV, README fragment, or generator, run:

```bash
python3 -m unittest discover -s tests -v
python3 scripts/validate_catalog.py
python3 scripts/generate_readme.py
python3 scripts/generate_readme.py --check
```

Commit source changes and regenerated artifacts together. A data update is incomplete if the freshness check fails. Before finishing, verify that the CSV record count matches the rendered README paper count.

The scheduled link workflow runs `python3 scripts/check_links.py`. A 404/410 is a catalog defect; timeouts, rate limits, and access-denied responses require manual review before changing a URL.

Visualizations must derive only from the validated catalog sources, remain deterministic and readable in light and dark themes, and state that they describe catalog coverage rather than total field output.
