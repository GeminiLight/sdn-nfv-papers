#!/usr/bin/env python3
"""Generate deterministic SVG charts and README analysis from the paper catalog."""

from __future__ import annotations

import argparse
import html
import sys
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = Path(__file__).resolve().parent
sys.dont_write_bytecode = True
sys.path.insert(0, str(ROOT / "scripts"))

from generate_readme import ValidationError, load_papers, primary_value  # noqa: E402


CATEGORY_STYLES = (
    ("survey_analysis", "Survey & analysis", "var(--series-purple)"),
    ("mathematical", "Mathematical", "var(--series-gold)"),
    ("heuristic", "Heuristic", "var(--series-blue)"),
    ("machine_learning", "Machine learning", "var(--series-green)"),
    ("other_unclassified", "Other / unclassified", "var(--series-slate)"),
)

DIRECTION_STYLES = (
    ("deployment", "Deployment", "var(--series-blue)"),
    ("scheduling", "Scheduling", "var(--series-green)"),
    ("chaining", "Chaining", "var(--series-purple)"),
    ("routing", "Routing", "var(--series-gold)"),
    ("slicing", "Slicing", "var(--series-rose)"),
    ("", "Other / unspecified", "var(--series-slate)"),
)

YEAR_CHART_PATH = OUTPUT_DIR / "papers-by-year.svg"
DIRECTION_CHART_PATH = OUTPUT_DIR / "papers-by-direction.svg"
ANALYSIS_PATH = OUTPUT_DIR / "analysis.md"


def escape(value: object) -> str:
    return html.escape(str(value), quote=True)


def svg_start(width: int, height: int, title: str, description: str) -> list[str]:
    return [
        (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
            'role="img" aria-labelledby="chart-title chart-description">'
        ),
        f'  <title id="chart-title">{escape(title)}</title>',
        f'  <desc id="chart-description">{escape(description)}</desc>',
        "  <style>",
        "    :root { color-scheme: light dark; --background: #fbfdff; --foreground: #24324a; --muted: #66758e; --grid: #e5edf7; --frame: #c9d6e6; --series-blue: #64aaf5; --series-green: #59cda5; --series-purple: #a184ee; --series-gold: #f2bd59; --series-rose: #ef8da5; --series-slate: #91a6c4; }",
        "    @media (prefers-color-scheme: dark) { :root { --background: #141b2a; --foreground: #f3f7ff; --muted: #b5c1d6; --grid: #33415a; --frame: #53647e; --series-blue: #79b9ff; --series-green: #70dfb9; --series-purple: #b49aff; --series-gold: #ffd071; --series-rose: #ff9fb5; --series-slate: #aabedb; } }",
        "    text { fill: var(--foreground); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }",
        "    .title { font-size: 26px; font-weight: 700; letter-spacing: -0.3px; }",
        "    .subtitle, .note { fill: var(--muted); }",
        "    .subtitle { font-size: 14px; }",
        "    .note { font-size: 12px; }",
        "    .axis-label { fill: var(--muted); font-size: 12px; }",
        "    .axis-title { fill: var(--muted); font-size: 13px; font-weight: 600; }",
        "    .value { font-size: 12px; font-weight: 650; }",
        "    .legend { font-size: 12px; }",
        "    .grid { stroke: var(--grid); stroke-width: 1; }",
        "    .frame { fill: none; stroke: var(--frame); stroke-width: 1; }",
        "  </style>",
        f'  <rect width="{width}" height="{height}" rx="14" fill="var(--background)"/>',
    ]


def round_up(value: int, step: int) -> int:
    return max(step, ((value + step - 1) // step) * step)


def year_tick_step(maximum: int) -> int:
    if maximum <= 20:
        return 5
    if maximum <= 60:
        return 10
    return 20


def render_year_chart(papers: list[dict[str, str]]) -> str:
    width, height = 1200, 560
    plot_left, plot_right = 82, 1152
    plot_top, plot_bottom = 146, 472
    plot_width = plot_right - plot_left
    plot_height = plot_bottom - plot_top

    by_year: dict[int, Counter[str]] = defaultdict(Counter)
    for paper in papers:
        by_year[int(paper["year"])][primary_value(paper["categories"])] += 1

    years = list(range(min(by_year), max(by_year) + 1))
    totals = {year: sum(by_year[year].values()) for year in years}
    tick_step = year_tick_step(max(totals.values()))
    y_max = round_up(max(totals.values()), tick_step)
    slot_width = plot_width / len(years)
    bar_width = min(44.0, slot_width * 0.62)

    def x_center(index: int) -> float:
        return plot_left + (index + 0.5) * slot_width

    def y_position(value: int) -> float:
        return plot_bottom - (value / y_max) * plot_height

    lines = svg_start(
        width,
        height,
        "Publication coverage over time",
        "Stacked bars show paper counts by publication year and primary method category.",
    )
    lines.extend(
        [
            '  <text class="title" x="54" y="45">Publication coverage over time</text>',
            '  <text class="subtitle" x="54" y="72">Papers in this catalog, grouped by primary method category</text>',
        ]
    )

    legend_x = 54.0
    for _, label, color in CATEGORY_STYLES:
        lines.append(f'  <rect x="{legend_x:.1f}" y="94" width="12" height="12" rx="2" fill="{color}"/>')
        lines.append(f'  <text class="legend" x="{legend_x + 19:.1f}" y="105">{escape(label)}</text>')
        legend_x += 47 + len(label) * 7.0

    for tick in range(0, y_max + 1, tick_step):
        y = y_position(tick)
        lines.append(f'  <line class="grid" x1="{plot_left}" y1="{y:.1f}" x2="{plot_right}" y2="{y:.1f}"/>')
        lines.append(f'  <text class="axis-label" x="{plot_left - 12}" y="{y + 4:.1f}" text-anchor="end">{tick}</text>')

    lines.append(
        f'  <rect class="frame" x="{plot_left}" y="{plot_top}" width="{plot_width}" height="{plot_height}"/>'
    )
    lines.append(
        f'  <text class="axis-title" transform="translate(22 {(plot_top + plot_bottom) / 2:.1f}) rotate(-90)" text-anchor="middle">Paper count</text>'
    )

    for index, year in enumerate(years):
        center = x_center(index)
        x = center - bar_width / 2
        cumulative = 0
        for category, label, color in CATEGORY_STYLES:
            count = by_year[year][category]
            if not count:
                continue
            segment_bottom = y_position(cumulative)
            cumulative += count
            segment_top = y_position(cumulative)
            segment_height = segment_bottom - segment_top
            lines.extend(
                [
                    f'  <rect x="{x:.1f}" y="{segment_top:.1f}" width="{bar_width:.1f}" height="{segment_height:.1f}" fill="{color}">',
                    f'    <title>{year} — {escape(label)}: {count}</title>',
                    "  </rect>",
                ]
            )

        total = totals[year]
        total_y = y_position(total) - 8 if total else plot_bottom - 8
        lines.append(f'  <text class="value" x="{center:.1f}" y="{total_y:.1f}" text-anchor="middle">{total}</text>')
        lines.append(f'  <text class="axis-label" x="{center:.1f}" y="496" text-anchor="middle">{year}</text>')

    lines.extend(
        [
            f'  <text class="axis-title" x="{(plot_left + plot_right) / 2:.1f}" y="522" text-anchor="middle">Publication year</text>',
            '  <text class="note" x="54" y="548">Source: data/papers.csv · Primary category only · Counts describe catalog coverage, not total field output</text>',
            "</svg>",
        ]
    )
    return "\n".join(lines) + "\n"


def render_direction_chart(papers: list[dict[str, str]]) -> str:
    width, height = 1200, 530
    plot_left, plot_right = 224, 1100
    plot_top = 132
    row_height = 54
    bar_height = 28

    counts = Counter(primary_value(paper["directions"]) for paper in papers)
    style_order = {key: index for index, (key, _, _) in enumerate(DIRECTION_STYLES)}
    rows = sorted(DIRECTION_STYLES, key=lambda item: (-counts[item[0]], style_order[item[0]]))
    tick_step = 25 if max(counts.values()) > 75 else 10
    x_max = round_up(max(counts.values()), tick_step)
    plot_bottom = plot_top + row_height * len(rows)
    total = len(papers)

    def x_position(value: int) -> float:
        return plot_left + (value / x_max) * (plot_right - plot_left)

    lines = svg_start(
        width,
        height,
        "Research direction mix",
        "Horizontal bars compare paper counts by primary research direction.",
    )
    lines.extend(
        [
            '  <text class="title" x="54" y="45">Research direction mix</text>',
            '  <text class="subtitle" x="54" y="72">Primary direction assigned to each cataloged paper</text>',
        ]
    )

    for tick in range(0, x_max + 1, tick_step):
        x = x_position(tick)
        lines.append(f'  <line class="grid" x1="{x:.1f}" y1="{plot_top - 12}" x2="{x:.1f}" y2="{plot_bottom - 12}"/>')
        lines.append(f'  <text class="axis-label" x="{x:.1f}" y="{plot_top - 22}" text-anchor="middle">{tick}</text>')

    lines.append(
        f'  <rect class="frame" x="{plot_left}" y="{plot_top - 12}" width="{plot_right - plot_left}" height="{plot_bottom - plot_top}"/>'
    )

    for index, (direction, label, color) in enumerate(rows):
        count = counts[direction]
        y = plot_top + index * row_height
        bar_width = x_position(count) - plot_left
        percentage = count / total * 100
        lines.append(f'  <text x="{plot_left - 16}" y="{y + 19}" text-anchor="end">{escape(label)}</text>')
        lines.extend(
            [
                f'  <rect x="{plot_left}" y="{y}" width="{bar_width:.1f}" height="{bar_height}" rx="3" fill="{color}">',
                f'    <title>{escape(label)}: {count} papers ({percentage:.1f}%)</title>',
                "  </rect>",
            ]
        )
        lines.append(
            f'  <text class="value" x="{x_position(count) + 10:.1f}" y="{y + 19}">{count} · {percentage:.1f}%</text>'
        )

    lines.extend(
        [
            f'  <text class="axis-title" x="{(plot_left + plot_right) / 2:.1f}" y="{plot_bottom + 22}" text-anchor="middle">Paper count</text>',
            '  <text class="note" x="54" y="512">Source: data/papers.csv · Multiple-value fields are represented by their primary direction</text>',
            "</svg>",
        ]
    )
    return "\n".join(lines) + "\n"


def render_analysis(papers: list[dict[str, str]]) -> str:
    category_counts = Counter(primary_value(paper["categories"]) for paper in papers)
    direction_counts = Counter(primary_value(paper["directions"]) for paper in papers)
    year_counts = Counter(int(paper["year"]) for paper in papers)
    category_labels = {key: label for key, label, _ in CATEGORY_STYLES}
    direction_labels = {key: label for key, label, _ in DIRECTION_STYLES}

    largest_category, largest_category_count = max(category_counts.items(), key=lambda item: item[1])
    largest_direction, largest_direction_count = max(direction_counts.items(), key=lambda item: item[1])
    peak_year, peak_year_count = max(year_counts.items(), key=lambda item: (item[1], item[0]))
    first_year, last_year = min(year_counts), max(year_counts)

    return f"""## Catalog Trends

> [!NOTE]
> These charts summarize this curated catalog. Coverage changes may reflect collection activity as well as research activity.

<p align="center">
  <img src="visualization/papers-by-year.svg" alt="Stacked bar chart of cataloged papers by publication year and primary category" width="100%">
</p>

<p align="center">
  <img src="visualization/papers-by-direction.svg" alt="Horizontal bar chart of cataloged papers by primary research direction" width="100%">
</p>

- **Catalog coverage:** {len(papers)} papers spanning **{first_year}–{last_year}**.
- **Largest method family:** {category_labels[largest_category]} — **{largest_category_count} papers ({largest_category_count / len(papers) * 100:.1f}%)**.
- **Most represented direction:** {direction_labels[largest_direction]} — **{largest_direction_count} papers ({largest_direction_count / len(papers) * 100:.1f}%)**.
- **Most represented publication year:** {peak_year} — **{peak_year_count} papers**.
"""


def build_outputs(papers: list[dict[str, str]]) -> dict[Path, str]:
    return {
        YEAR_CHART_PATH: render_year_chart(papers),
        DIRECTION_CHART_PATH: render_direction_chart(papers),
        ANALYSIS_PATH: render_analysis(papers),
    }


def check_outputs(outputs: dict[Path, str]) -> int:
    stale = [path for path, expected in outputs.items() if not path.exists() or path.read_text(encoding="utf-8") != expected]
    if not stale:
        print("visualization artifacts are up to date")
        return 0

    for path in stale:
        print(f"{path.relative_to(ROOT)} is out of date", file=sys.stderr)
    print("run: python3 visualization/generate_visualizations.py", file=sys.stderr)
    return 1


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail if generated visualization files are stale")
    args = parser.parse_args()

    try:
        papers = load_papers()
        outputs = build_outputs(papers)
    except (OSError, ValidationError, ValueError) as error:
        print(f"error: {error}", file=sys.stderr)
        return 2

    if args.check:
        return check_outputs(outputs)

    for path, content in outputs.items():
        path.write_text(content, encoding="utf-8")
    print(f"generated {len(outputs)} visualization artifacts from {len(papers)} paper records")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
