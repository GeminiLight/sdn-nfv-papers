#!/usr/bin/env python3
"""Validate all catalog sources and print a compact coverage report."""

from __future__ import annotations

import sys
from collections import Counter

sys.dont_write_bytecode = True
from catalog import ValidationError, load_catalog


def main() -> int:
    try:
        catalog = load_catalog()
    except ValidationError as error:
        print(f"catalog validation failed:\n{error}", file=sys.stderr)
        return 1

    statuses = Counter(paper["verification_status"] for paper in catalog.papers)
    status_text = ", ".join(f"{status}={count}" for status, count in sorted(statuses.items()))
    print(
        f"catalog valid: papers={len(catalog.papers)}, venues={len(catalog.venues)}, "
        f"screening={len(catalog.screening)}, provenance({status_text})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
