## Contributing

Contributions are welcome. The paper catalog in `README.md` is generated from `data/papers.csv`; do not edit the generated catalog directly.

1. Add or update a fully quoted row in `data/papers.csv`.
2. Use `; ` between multiple values in `categories`, `directions`, `authors`, `keywords`, `objectives`, and `other_urls`.
3. Put the primary `categories` and `directions` value first; it determines the paper's single display location in the README.
4. Regenerate and verify the visualizations and README:

```bash
python3 scripts/generate_readme.py
python3 scripts/generate_readme.py --check
```

The CSV schema is:

```text
paper_id,title,categories,directions,venue,year,ranks,authors,keywords,objectives,paper_url,code_url,data_url,other_urls
```

## Recommend

🤩 There are some repositories which probably help you to comprehend or research this topic:

- [Virne: Python framework for VNE](https://github.com/GeminiLight/virne)
- [GNN-Communication-Networks](https://github.com/jwwthu/GNN-Communication-Networks)
- [The Internet Topology Zoo: Real Network Topology Dataset](http://topology-zoo.org/index.html)
- [SNDlib: Survivable Network Design Library](http://sndlib.zib.de/)
- [awesome-rl (Awesome Reinforcement Learning)](https://github.com/aikorea/awesome-rl)
- [awesome-ml4co (Awesome Machine Learning for Combinatorial Optimization Resources)](https://github.com/Thinklab-SJTU/awesome-ml4co)
