(() => {
  "use strict";

  const catalog = window.PAPER_CATALOG;
  const pageSize = 30;

  const categoryLabels = {
    survey_analysis: "Survey & analysis",
    mathematical: "Mathematical",
    heuristic: "Heuristic",
    machine_learning: "Machine learning",
    other_unclassified: "Other",
  };

  const directionLabels = {
    slicing: "Slicing",
    chaining: "Chaining",
    deployment: "Deployment",
    scheduling: "Scheduling",
    routing: "Routing",
  };

  const elements = {
    search: document.querySelector("#paper-search"),
    category: document.querySelector("#filter-category"),
    direction: document.querySelector("#filter-direction"),
    venue: document.querySelector("#filter-venue"),
    year: document.querySelector("#filter-year"),
    rank: document.querySelector("#filter-rank"),
    sort: document.querySelector("#sort-order"),
    list: document.querySelector("#paper-list"),
    count: document.querySelector("#result-count"),
    clear: document.querySelector("#clear-filters"),
    empty: document.querySelector("#empty-state"),
    emptyReset: document.querySelector("#empty-reset"),
    loadMore: document.querySelector("#load-more"),
    loading: document.querySelector("#loading-state"),
    dialog: document.querySelector("#paper-dialog"),
    dialogClose: document.querySelector("#dialog-close"),
    dialogContent: document.querySelector("#dialog-content"),
    themeToggle: document.querySelector("#theme-toggle"),
    coverageTitle: document.querySelector("#coverage-title"),
    coverageNote: document.querySelector("#coverage-note"),
    coverageYearView: document.querySelector("#coverage-year-view"),
    coverageVenueView: document.querySelector("#coverage-venue-view"),
    coverageButtons: document.querySelectorAll("[data-coverage-view]"),
  };

  const state = {
    query: "",
    category: "",
    direction: "",
    venue: "",
    year: "",
    rank: "",
    sort: "newest",
    limit: pageSize,
  };

  const splitValues = (value) => value ? value.split(";").map((part) => part.trim()).filter(Boolean) : [];
  const normalize = (value) => String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const escapeHtml = (value) => String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("paper-index-theme", theme);
    elements.themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
    elements.themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#101621" : "#f4f7fb";
  }

  function initializeTheme() {
    const saved = localStorage.getItem("paper-index-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (systemDark ? "dark" : "light"));
    elements.themeToggle.addEventListener("click", () => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  function appendOptions(select, values, labels = {}) {
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = labels[value] || value;
      select.append(option);
    });
  }

  function uniqueValues(papers, field) {
    return [...new Set(papers.flatMap((paper) => splitValues(paper[field])))];
  }

  function initializeFilters(papers) {
    appendOptions(elements.category, Object.keys(categoryLabels), categoryLabels);
    appendOptions(elements.direction, Object.keys(directionLabels), directionLabels);
    appendOptions(elements.venue, uniqueValues(papers, "venue").sort((a, b) => a.localeCompare(b)));
    appendOptions(elements.year, uniqueValues(papers, "year").sort((a, b) => Number(b) - Number(a)));
    appendOptions(elements.rank, uniqueValues(papers, "ranks").sort((a, b) => a.localeCompare(b)));
  }

  function renderCoverage(papers) {
    const yearCounts = papers.reduce((result, paper) => {
      result[paper.year] = (result[paper.year] || 0) + 1;
      return result;
    }, {});
    const years = Object.keys(yearCounts).sort((a, b) => Number(a) - Number(b));
    const max = Math.max(...Object.values(yearCounts));
    const chart = document.querySelector("#coverage-chart");
    chart.style.setProperty("--bar-count", years.length);
    chart.innerHTML = years.map((year, index) => {
      const height = Math.max(4, Math.round((yearCounts[year] / max) * 100));
      const tone = Math.round(45 + (index / Math.max(years.length - 1, 1)) * 50);
      const showYear = index % 2 === 0 || index === years.length - 1;
      return `
        <div class="coverage-bar-wrap" style="--bar-height:${height}%;--bar-tone:${tone}%" title="${escapeHtml(year)}: ${yearCounts[year]} papers">
          <span class="coverage-value">${yearCounts[year]}</span>
          <span class="coverage-bar"></span>
          <span class="coverage-year">${showYear ? escapeHtml(year) : ""}</span>
        </div>`;
    }).join("");

    const venueCounts = papers.reduce((result, paper) => {
      result[paper.venue] = (result[paper.venue] || 0) + 1;
      return result;
    }, {});
    const venues = Object.entries(venueCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 8);
    const venueMax = venues[0]?.[1] || 1;
    const venueChart = document.querySelector("#venue-chart");
    venueChart.innerHTML = venues.map(([venue, count], index) => {
      const width = Math.max(4, Math.round((count / venueMax) * 100));
      const share = ((count / papers.length) * 100).toFixed(1);
      return `
        <div class="venue-row" style="--venue-width:${width}%;--venue-order:${index}" role="img" aria-label="${escapeHtml(venue)}: ${count} papers, ${share} percent of the catalog">
          <span class="venue-name">${escapeHtml(venue)}</span>
          <span class="venue-measure"><span class="venue-bar"></span></span>
          <span class="venue-count">${count}</span>
        </div>`;
    }).join("");
    const represented = venues.reduce((total, [, count]) => total + count, 0);
    document.querySelector("#venue-footnote").textContent = `Top 8 venues account for ${((represented / papers.length) * 100).toFixed(1)}% of the catalog.`;

    function setCoverageView(view) {
      const showVenue = view === "venue";
      elements.coverageYearView.hidden = showVenue;
      elements.coverageVenueView.hidden = !showVenue;
      elements.coverageTitle.textContent = showVenue ? "Papers by venue" : "Papers by year";
      elements.coverageNote.textContent = showVenue ? `Top 8 of ${Object.keys(venueCounts).length} venues` : "All publication years";
      elements.coverageButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.coverageView === view));
      });
    }

    elements.coverageButtons.forEach((button) => {
      button.addEventListener("click", () => setCoverageView(button.dataset.coverageView));
    });

    document.querySelector("#stat-papers").textContent = papers.length.toLocaleString();
    document.querySelector("#stat-venues").textContent = new Set(papers.map((paper) => paper.venue)).size.toLocaleString();
    document.querySelector("#stat-year").textContent = Math.max(...papers.map((paper) => Number(paper.year)));
  }

  function searchableText(paper) {
    return normalize([
      paper.title,
      paper.authors,
      paper.keywords,
      paper.objectives,
      paper.venue,
      paper.year,
      paper.ranks,
      paper.categories,
      paper.directions,
    ].join(" "));
  }

  function matchesState(paper) {
    const terms = normalize(state.query).split(/\s+/).filter(Boolean);
    const haystack = searchableText(paper);
    return terms.every((term) => haystack.includes(term))
      && (!state.category || splitValues(paper.categories).includes(state.category))
      && (!state.direction || splitValues(paper.directions).includes(state.direction))
      && (!state.venue || paper.venue === state.venue)
      && (!state.year || paper.year === state.year)
      && (!state.rank || splitValues(paper.ranks).includes(state.rank));
  }

  function sortedPapers(papers) {
    return [...papers].sort((a, b) => {
      if (state.sort === "oldest") {
        return Number(a.year) - Number(b.year) || a.title.localeCompare(b.title);
      }
      if (state.sort === "title") {
        return a.title.localeCompare(b.title) || Number(b.year) - Number(a.year);
      }
      return Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    });
  }

  function tagMarkup(paper) {
    const tags = [
      ...splitValues(paper.categories).map((value) => categoryLabels[value] || value),
      ...splitValues(paper.directions).map((value) => directionLabels[value] || value),
    ];
    return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  }

  function paperMarkup(paper, index) {
    const rank = splitValues(paper.ranks)[0];
    return `
      <li class="paper-item" style="--item-index:${Math.min(index, 10)}">
        <div class="paper-index"><strong>${escapeHtml(paper.year)}</strong>${escapeHtml(paper.venue)}${rank ? ` / ${escapeHtml(rank)}` : ""}</div>
        <div>
          <a class="paper-title" href="${escapeHtml(paper.paper_url)}" target="_blank" rel="noreferrer">${escapeHtml(paper.title)}</a>
          <p class="paper-authors">${escapeHtml(paper.authors.replaceAll("; ", ", "))}</p>
          <div class="paper-tags">${tagMarkup(paper)}</div>
        </div>
        <div class="paper-actions">
          <button class="details-button" type="button" data-paper-id="${escapeHtml(paper.paper_id)}">Details</button>
        </div>
      </li>`;
  }

  function activeFilterCount() {
    return [state.query, state.category, state.direction, state.venue, state.year, state.rank].filter(Boolean).length;
  }

  function updateUrl() {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (value && key !== "limit" && !(key === "sort" && value === "newest")) params.set(key, value);
    });
    const next = `${location.pathname}${params.size ? `?${params}` : ""}${location.hash}`;
    history.replaceState(null, "", next);
  }

  function render() {
    const filtered = sortedPapers(catalog.papers.filter(matchesState));
    const visible = filtered.slice(0, state.limit);
    const filters = activeFilterCount();

    elements.loading.hidden = true;
    elements.list.innerHTML = visible.map(paperMarkup).join("");
    elements.count.textContent = `${filtered.length.toLocaleString()} paper${filtered.length === 1 ? "" : "s"}${filters ? ` across ${filters} active filter${filters === 1 ? "" : "s"}` : ""}`;
    elements.empty.hidden = filtered.length !== 0;
    elements.loadMore.hidden = visible.length >= filtered.length || filtered.length === 0;
    if (!elements.loadMore.hidden) {
      elements.loadMore.textContent = `Show ${Math.min(pageSize, filtered.length - visible.length)} more of ${filtered.length}`;
    }

    elements.list.querySelectorAll("[data-paper-id]").forEach((button) => {
      button.addEventListener("click", () => openDialog(button.dataset.paperId));
    });
    updateUrl();
  }

  function dialogLink(url, label, primary = false) {
    if (!url) return "";
    return `<a class="button ${primary ? "button-primary" : "button-secondary"}" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
  }

  function openDialog(paperId) {
    const paper = catalog.papers.find((item) => item.paper_id === paperId);
    if (!paper) return;
    const citation = `${paper.authors.replaceAll("; ", ", ")}. “${paper.title}.” ${paper.venue}, ${paper.year}.`;
    const otherLinks = splitValues(paper.other_urls);
    elements.dialogContent.innerHTML = `
      <p class="dialog-meta">${escapeHtml(paper.venue)} / ${escapeHtml(paper.year)}${paper.ranks ? ` / ${escapeHtml(paper.ranks)}` : ""}</p>
      <h2 class="dialog-title">${escapeHtml(paper.title)}</h2>
      <p class="dialog-authors">${escapeHtml(paper.authors.replaceAll("; ", ", "))}</p>
      <dl class="dialog-details">
        <div><dt>Method</dt><dd>${escapeHtml(splitValues(paper.categories).map((value) => categoryLabels[value] || value).join(", ") || "Unspecified")}</dd></div>
        <div><dt>Direction</dt><dd>${escapeHtml(splitValues(paper.directions).map((value) => directionLabels[value] || value).join(", ") || "Other")}</dd></div>
        <div><dt>Identifier</dt><dd>${escapeHtml(paper.paper_id)}</dd></div>
        <div><dt>Rank</dt><dd>${escapeHtml(paper.ranks || "Not listed")}</dd></div>
      </dl>
      ${paper.keywords ? `<div class="dialog-section"><h3>Keywords</h3><p>${escapeHtml(paper.keywords.replaceAll("; ", ", "))}</p></div>` : ""}
      ${paper.objectives ? `<div class="dialog-section"><h3>Objectives</h3><p>${escapeHtml(paper.objectives.replaceAll("; ", ", "))}</p></div>` : ""}
      <div class="dialog-actions">
        ${dialogLink(paper.paper_url, paper.paper_id.startsWith("arxiv:") ? "Open arXiv" : "Open DOI", true)}
        ${dialogLink(paper.code_url, "View code")}
        ${dialogLink(paper.data_url, "View data")}
        ${otherLinks.map((url, index) => dialogLink(url, otherLinks.length > 1 ? `Related link ${index + 1}` : "Published version")).join("")}
        <button class="button button-secondary" id="copy-citation" type="button">Copy citation</button>
      </div>`;

    elements.dialog.showModal();
    document.querySelector("#copy-citation").addEventListener("click", async (event) => {
      try {
        await navigator.clipboard.writeText(citation);
        event.currentTarget.textContent = "Copied";
        window.setTimeout(() => { event.currentTarget.textContent = "Copy citation"; }, 1400);
      } catch {
        event.currentTarget.textContent = "Copy unavailable";
      }
    });
  }

  function resetFilters() {
    Object.assign(state, {
      query: "",
      category: "",
      direction: "",
      venue: "",
      year: "",
      rank: "",
      sort: "newest",
      limit: pageSize,
    });
    elements.search.value = "";
    elements.category.value = "";
    elements.direction.value = "";
    elements.venue.value = "";
    elements.year.value = "";
    elements.rank.value = "";
    elements.sort.value = "newest";
    render();
  }

  function readUrlState() {
    const params = new URLSearchParams(location.search);
    ["query", "category", "direction", "venue", "year", "rank", "sort"].forEach((key) => {
      if (params.has(key)) state[key] = params.get(key);
    });
    elements.search.value = state.query;
    elements.category.value = state.category;
    elements.direction.value = state.direction;
    elements.venue.value = state.venue;
    elements.year.value = state.year;
    elements.rank.value = state.rank;
    elements.sort.value = state.sort;
  }

  function bindControls() {
    let searchTimer;
    elements.search.addEventListener("input", () => {
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => {
        state.query = elements.search.value.trim();
        state.limit = pageSize;
        render();
      }, 100);
    });

    ["category", "direction", "venue", "year", "rank", "sort"].forEach((key) => {
      elements[key].addEventListener("change", () => {
        state[key] = elements[key].value;
        state.limit = pageSize;
        render();
      });
    });

    elements.clear.addEventListener("click", resetFilters);
    elements.emptyReset.addEventListener("click", resetFilters);
    elements.loadMore.addEventListener("click", () => {
      state.limit += pageSize;
      render();
    });
    elements.dialogClose.addEventListener("click", () => elements.dialog.close());
    elements.dialog.addEventListener("click", (event) => {
      if (event.target === elements.dialog) elements.dialog.close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && !["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        elements.search.focus();
      }
    });
  }

  function showCatalogError() {
    elements.loading.hidden = true;
    elements.count.textContent = "Catalog data could not be loaded";
    elements.empty.hidden = false;
    elements.empty.querySelector("h3").textContent = "The generated catalog is missing.";
    elements.empty.querySelector("p").textContent = "Run python3 scripts/generate_site.py, then reload this page.";
    elements.emptyReset.hidden = true;
  }

  initializeTheme();
  if (!catalog || !Array.isArray(catalog.papers)) {
    showCatalogError();
    return;
  }

  initializeFilters(catalog.papers);
  renderCoverage(catalog.papers);
  readUrlState();
  bindControls();
  render();
})();
