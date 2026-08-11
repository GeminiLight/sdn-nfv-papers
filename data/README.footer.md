## Contributing

Contributions are welcome. The paper catalog in `README.md` is generated from the CSV sources in `data/`; do not edit the generated catalog directly.

1. Add or update a fully quoted row in `data/papers.csv`.
2. Add matching rows to `taxonomy.csv` and `provenance.csv`; register new venues or rank changes in `venues.csv`.
3. Use `; ` between multiple values and put the primary `categories` and `directions` value first.
4. Record reviewed candidates, including exclusions, in `screening.csv`.
5. Regenerate and verify the website data, visualizations, and README:

```bash
python3 -m unittest discover -s tests -v
python3 scripts/validate_catalog.py
python3 scripts/generate_readme.py
python3 scripts/generate_readme.py --check
```

The CSV schema is:

```text
paper_id,title,categories,directions,venue,year,ranks,authors,keywords,objectives,paper_url,code_url,data_url,other_urls
```

Companion schemas and controlled values are documented in `data/README.md`. See `docs/paper-search-and-screening.md` for the review workflow.

## Recommend

🤩 There are some repositories which probably help you to comprehend or research this topic:

- [Virne: Python framework for VNE](https://github.com/GeminiLight/virne)
- [GNN-Communication-Networks](https://github.com/jwwthu/GNN-Communication-Networks)
- [The Internet Topology Zoo: Real Network Topology Dataset](http://topology-zoo.org/index.html)
- [SNDlib: Survivable Network Design Library](http://sndlib.zib.de/)
- [awesome-rl (Awesome Reinforcement Learning)](https://github.com/aikorea/awesome-rl)
- [awesome-ml4co (Awesome Machine Learning for Combinatorial Optimization Resources)](https://github.com/Thinklab-SJTU/awesome-ml4co)
