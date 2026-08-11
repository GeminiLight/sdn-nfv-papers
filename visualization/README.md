# Catalog Visualizations

This directory contains deterministic, dependency-free visualizations generated from the validated paper and taxonomy sources in `data/`.

Generated artifacts:

- `papers-by-year.svg`: publication-year coverage, separating surveys from primary research method families.
- `papers-by-direction.svg`: distribution of primary research directions.
- `analysis.md`: concise statistics and chart embeds merged into the root `README.md`.

Refresh the visualizations and root README together:

```bash
python3 scripts/generate_readme.py
```

Verify that every generated file is current:

```bash
python3 scripts/generate_readme.py --check
```

For visualization-only development, run `python3 visualization/generate_visualizations.py`. Do not edit the generated SVG or analysis files directly; update the catalog sources or generator instead.
