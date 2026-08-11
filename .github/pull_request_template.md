## Summary

Describe the catalog, generator, website, or documentation change.

## Catalog checklist

- [ ] Metadata changes are backed by authoritative publisher, DOI, arXiv, author, code, or dataset sources.
- [ ] New papers have matching taxonomy and provenance rows; new venues are registered in `data/venues.csv`.
- [ ] Screening decisions, including exclusions or unresolved scope questions, are recorded in `data/screening.csv`.
- [ ] No missing metadata, code URL, data URL, category, direction, or rank was guessed.
- [ ] Generated artifacts were refreshed and committed with their sources.

## Verification

- [ ] `python3 -m unittest discover -s tests -v`
- [ ] `node tests/site_exports.test.js`
- [ ] `python3 scripts/validate_catalog.py`
- [ ] `python3 scripts/generate_readme.py --check`
