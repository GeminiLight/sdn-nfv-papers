# Catalog data

The files in this directory form one validated catalog. `papers.csv` remains the portable public table; companion files add information that should not be compressed into its compatibility schema.

## Source ownership

- `papers.csv`: identity, bibliographic metadata, legacy display categories, research directions, objectives, and paper/artifact links.
- `taxonomy.csv`: independent paper type, method families, and scenarios, keyed by `paper_id`.
- `venues.csv`: one rank record per venue, including ranking edition/year and source URLs. The `ranks` column in `papers.csv` is a materialized compatibility value and must match this registry.
- `provenance.csv`: metadata source, verification status, review date, and notes for every paper.
- `screening.csv`: Include, Pending, and Exclude decisions for candidates and legacy scope questions.
- `README.header.md` and `README.footer.md`: manually maintained fragments used by the README generator.

Every CSV field is quoted. Multi-value fields use `; `, with the primary value first.

## Controlled values

`paper_type`:

```text
research
survey_analysis
```

`method_families`:

```text
mathematical
heuristic
machine_learning
systems
unclassified
```

The compatibility `categories` field uses `survey_analysis`, `mathematical`, `heuristic`, `machine_learning`, and `other_unclassified`. `systems` and `unclassified` method families project to `other_unclassified`; their order must match so the README and website share the same primary classification.

`verification_status`:

```text
verified  source and review date are recorded
legacy    migrated record awaiting source-by-source re-verification
pending   verification has started but is not complete
```

`screening.status`:

```text
include
pending
exclude
```

Allowed directions, scenarios, venue types, and the exact schemas are enforced in `scripts/catalog.py`.

## Update gate

```bash
python3 -m unittest discover -s tests -v
node tests/site_exports.test.js
python3 scripts/validate_catalog.py
python3 scripts/generate_readme.py
python3 scripts/generate_readme.py --check
```

Do not edit generated files to fix a stale check. Update the owning source or generator and regenerate all artifacts together.
