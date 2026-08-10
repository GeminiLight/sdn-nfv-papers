# AGENTS.md

## Project scope

This repository maintains a verified catalog of SDN/NFV network resource allocation papers. Keep changes focused and preserve curated metadata unless authoritative evidence supports a correction.

## Sources and generated files

- `data/papers.csv` is the canonical paper catalog.
- `data/README.header.md` and `data/README.footer.md` are manually maintained README fragments.
- `README.md`, `visualization/analysis.md`, and the SVG charts are generated artifacts; do not edit them directly.

## Paper data rules

- Preserve the existing CSV schema and quote every field.
- Separate multiple values with `; ` and put the primary category or direction first.
- Use the latest official CCF directory for CCF ranks and re-audit venue mappings when a new edition is released.
- When both CCF and JCR ranks apply, put CCF first (for example, `CCF-C; JCR-Q1`). Treat JCR ranks as supplemental and do not add or update them without a source and ranking year.
- Use unique `doi:<doi>` or `arxiv:<id>` paper IDs with matching canonical URLs.
- Verify titles, authors, venue, year, identifiers, code, and data links from authoritative sources. Do not guess missing metadata; report uncertain items for user review.
- Do not bulk reorder or reclassify papers without explicit approval.

## Required refresh and validation

After changing the CSV, README fragments, or either generator, run:

```bash
python3 scripts/generate_readme.py
python3 scripts/generate_readme.py --check
```

Commit source changes and regenerated artifacts together. A data update is incomplete if the freshness check fails. Before finishing, verify that the CSV record count matches the rendered README paper count.

Visualizations must derive only from `data/papers.csv`, remain deterministic and readable in light and dark themes, and state that they describe catalog coverage rather than total field output.
