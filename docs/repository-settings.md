# Repository settings

These settings complement the versioned files in the repository and should be rechecked after changing workflows, the default branch, or the Pages domain.

## Main branch protection

After `.github/workflows/validate.yml` has run successfully on GitHub, protect `main` with:

- pull requests required before merging;
- the `validate` status check required and branches required to be up to date;
- conversation resolution required;
- force pushes and branch deletion disabled;
- rules applied to administrators.

For a single-maintainer repository, approving reviews can remain optional. The pull request and green validation check are still required.

## GitHub Pages

- Source branch: `main`, repository root.
- Project custom domain: leave empty. Do not add a `CNAME` file to this repository.
- Domain owner: the account site repository `GeminiLight/geminilight.github.io` owns `tianfuwang.tech`; GitHub Pages automatically serves this project beneath that domain using the repository path.
- Canonical project URL: `https://tianfuwang.tech/sdn-nfv-papers/`.
- HTTPS enforcement belongs to the account site Pages setting because that repository owns the custom domain.

The canonical project URL is also owned by `scripts/generate_site.py`. If the account site's custom domain or this repository name changes, update that constant and the website link in `data/README.header.md` together. Configuring a custom domain directly on this project would override the inherited `/sdn-nfv-papers/` URL.

## Scheduled maintenance

`.github/workflows/links.yml` checks authoritative, artifact, venue-rank, provenance, and screening URLs every Monday. HTTP 404/410 responses fail the job. Access controls and transient failures remain warnings for manual review.
