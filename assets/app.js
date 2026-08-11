(() => {
  "use strict";

  const catalog = window.PAPER_CATALOG;
  const exporters = window.PAPER_EXPORTS;
  const pageSize = 30;

  const paperTypeLabels = {
    research: "Research paper",
    survey_analysis: "Survey & analysis",
  };
  const methodLabels = {
    mathematical: "Mathematical",
    heuristic: "Heuristic",
    machine_learning: "Machine learning",
    systems: "Systems",
    unclassified: "Unclassified",
  };
  const scenarioLabels = {
    "5g": "5G",
    "6g": "6G",
    cloud: "Cloud",
    data_center: "Data center",
    edge: "Edge / MEC",
    industrial_iot: "Industrial IoT",
    internet_of_vehicles: "Internet of Vehicles",
    iot: "IoT",
    mobile: "Mobile",
    multi_domain: "Multi-domain",
    optical: "Optical",
    radio_access: "Radio access / O-RAN",
    satellite: "Satellite / SAGIN",
    smart_city: "Smart city",
  };
  const directionLabels = {
    slicing: "Slicing",
    chaining: "Chaining",
    deployment: "Deployment",
    scheduling: "Scheduling",
    routing: "Routing",
  };
  const verificationLabels = {
    verified: "Source-verified",
    legacy: "Legacy record",
    pending: "Verification pending",
  };

  const elements = {
    search: document.querySelector("#paper-search"),
    paperType: document.querySelector("#filter-paper-type"),
    method: document.querySelector("#filter-method"),
    scenario: document.querySelector("#filter-scenario"),
    direction: document.querySelector("#filter-direction"),
    venue: document.querySelector("#filter-venue"),
    year: document.querySelector("#filter-year"),
    rank: document.querySelector("#filter-rank"),
    verification: document.querySelector("#filter-verification"),
    availability: document.querySelector("#filter-availability"),
    sort: document.querySelector("#sort-order"),
    list: document.querySelector("#paper-list"),
    count: document.querySelector("#result-count"),
    clear: document.querySelector("#clear-filters"),
    empty: document.querySelector("#empty-state"),
    emptyReset: document.querySelector("#empty-reset"),
    pagination: document.querySelector("#pagination"),
    loading: document.querySelector("#loading-state"),
    exportCsv: document.querySelector("#export-csv"),
    exportBibtex: document.querySelector("#export-bibtex"),
    activeFilters: document.querySelector("#active-filters"),
    filterPanel: document.querySelector("#filter-panel"),
    filterToggle: document.querySelector("#filter-toggle"),
    filterToggleCount: document.querySelector("#filter-toggle-count"),
    filterCount: document.querySelector("#filter-count"),
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
    paperType: "",
    method: "",
    scenario: "",
    direction: "",
    venue: "",
    year: "",
    rank: "",
    verification: "",
    availability: "",
    sort: "newest",
    paper: "",
    page: 1,
  };

  const customSelectControllers = new Map();
  let openCustomSelect = null;

  const filterDefinitions = [
    { key: "query", label: "Search" },
    { key: "paperType", label: "Paper type", labels: paperTypeLabels },
    { key: "method", label: "Method", labels: methodLabels },
    { key: "direction", label: "Direction", labels: directionLabels },
    { key: "scenario", label: "Scenario", labels: scenarioLabels },
    { key: "venue", label: "Venue" },
    { key: "year", label: "Year" },
    { key: "rank", label: "Rank" },
    { key: "verification", label: "Verification", labels: verificationLabels },
    { key: "availability", label: "Artifacts", labels: { code: "Code available", data: "Data available" } },
  ];

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
    appendOptions(elements.paperType, Object.keys(paperTypeLabels), paperTypeLabels);
    appendOptions(elements.method, Object.keys(methodLabels).filter((value) => uniqueValues(papers, "method_families").includes(value)), methodLabels);
    appendOptions(elements.scenario, Object.keys(scenarioLabels).filter((value) => uniqueValues(papers, "scenarios").includes(value)), scenarioLabels);
    appendOptions(elements.direction, Object.keys(directionLabels), directionLabels);
    appendOptions(elements.venue, uniqueValues(papers, "venue").sort((a, b) => a.localeCompare(b)));
    appendOptions(elements.year, uniqueValues(papers, "year").sort((a, b) => Number(b) - Number(a)));
    appendOptions(elements.rank, uniqueValues(papers, "ranks").sort((a, b) => a.localeCompare(b)));
    appendOptions(elements.verification, uniqueValues(papers, "verification_status").sort(), verificationLabels);
  }

  function initializeCustomSelect(select) {
    const nativeOptions = Array.from(select.options);
    const field = select.closest(".filter-field");
    const compact = Boolean(select.closest(".sort-control"));
    const label = field?.querySelector(":scope > span")?.textContent
      || select.closest(".sort-control")?.querySelector(":scope > span")?.textContent
      || "Choose an option";
    const shell = document.createElement("div");
    const trigger = document.createElement("button");
    const value = document.createElement("span");
    const chevron = document.createElement("span");
    const menu = document.createElement("div");
    const list = document.createElement("div");
    let highlightedIndex = Math.max(select.selectedIndex, 0);
    let typeahead = "";
    let typeaheadTimer;

    shell.className = `custom-select${compact ? " custom-select--compact" : ""}`;
    trigger.className = "select-trigger";
    trigger.type = "button";
    trigger.id = `${select.id}-trigger`;
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", `${select.id}-menu`);
    value.className = "select-value";
    chevron.className = "select-chevron";
    chevron.setAttribute("aria-hidden", "true");
    trigger.append(value, chevron);

    menu.className = "select-menu";
    menu.id = `${select.id}-menu`;
    menu.hidden = true;
    list.className = "select-options";
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-labelledby", trigger.id);
    menu.append(list);

    const renderedOptions = nativeOptions.map((option, index) => {
      const item = document.createElement("button");
      item.className = "select-option";
      item.type = "button";
      item.id = `${select.id}-option-${index}`;
      item.setAttribute("role", "option");
      item.textContent = option.textContent;
      item.disabled = option.disabled;
      item.addEventListener("pointermove", () => setHighlight(index, false));
      item.addEventListener("click", () => choose(index));
      list.append(item);
      return item;
    });

    function setHighlight(index, shouldScroll = true) {
      highlightedIndex = Math.max(0, Math.min(index, renderedOptions.length - 1));
      renderedOptions.forEach((option, optionIndex) => {
        option.classList.toggle("is-highlighted", optionIndex === highlightedIndex);
      });
      trigger.setAttribute("aria-activedescendant", renderedOptions[highlightedIndex].id);
      if (shouldScroll) renderedOptions[highlightedIndex].scrollIntoView({ block: "nearest" });
    }

    function sync() {
      const selectedIndex = Math.max(select.selectedIndex, 0);
      const selected = nativeOptions[selectedIndex];
      highlightedIndex = selectedIndex;
      value.textContent = selected?.textContent || "";
      trigger.title = selected?.textContent || "";
      trigger.setAttribute("aria-label", `${label}: ${selected?.textContent || "No selection"}`);
      renderedOptions.forEach((option, optionIndex) => {
        option.setAttribute("aria-selected", String(optionIndex === selectedIndex));
        option.classList.toggle("is-highlighted", optionIndex === highlightedIndex && !menu.hidden);
      });
    }

    function positionMenu() {
      if (menu.hidden) return;
      const margin = 12;
      const gap = 7;
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(
        Math.max(rect.width, compact ? 210 : 260),
        window.innerWidth - (margin * 2),
      );
      menu.style.width = `${width}px`;
      const menuHeight = Math.min(menu.scrollHeight, window.innerHeight - (margin * 2));
      const roomBelow = window.innerHeight - rect.bottom - margin;
      const roomAbove = rect.top - margin;
      const placeAbove = roomBelow < Math.min(menuHeight, 190) && roomAbove > roomBelow;
      const preferredLeft = compact ? rect.right - width : rect.left;
      const left = Math.min(Math.max(preferredLeft, margin), window.innerWidth - width - margin);
      const top = placeAbove
        ? Math.max(margin, rect.top - menuHeight - gap)
        : Math.min(rect.bottom + gap, window.innerHeight - menuHeight - margin);
      menu.dataset.placement = placeAbove ? "top" : "bottom";
      menu.style.left = `${Math.round(left)}px`;
      menu.style.top = `${Math.round(top)}px`;
    }

    function open() {
      if (openCustomSelect && openCustomSelect !== controller) openCustomSelect.close();
      openCustomSelect = controller;
      shell.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      menu.hidden = false;
      sync();
      setHighlight(Math.max(select.selectedIndex, 0));
      positionMenu();
    }

    function close(returnFocus = false) {
      if (menu.hidden) return;
      menu.hidden = true;
      shell.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      trigger.removeAttribute("aria-activedescendant");
      if (openCustomSelect === controller) openCustomSelect = null;
      if (returnFocus) trigger.focus();
    }

    function choose(index) {
      if (nativeOptions[index]?.disabled) return;
      select.selectedIndex = index;
      sync();
      close(true);
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function moveHighlight(amount) {
      let next = highlightedIndex;
      do {
        next = Math.max(0, Math.min(next + amount, renderedOptions.length - 1));
      } while (nativeOptions[next]?.disabled && next > 0 && next < renderedOptions.length - 1);
      setHighlight(next);
    }

    function handleTypeahead(key) {
      window.clearTimeout(typeaheadTimer);
      typeahead += normalize(key);
      typeaheadTimer = window.setTimeout(() => { typeahead = ""; }, 650);
      const start = highlightedIndex + 1;
      const ordered = nativeOptions.slice(start).concat(nativeOptions.slice(0, start));
      const match = ordered.find((option) => !option.disabled && normalize(option.textContent).startsWith(typeahead));
      if (match) setHighlight(nativeOptions.indexOf(match));
    }

    trigger.addEventListener("click", () => {
      if (menu.hidden) open();
      else close();
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (menu.hidden) open();
        else moveHighlight(event.key === "ArrowDown" ? 1 : -1);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        if (menu.hidden) open();
        setHighlight(event.key === "Home" ? 0 : renderedOptions.length - 1);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (menu.hidden) open();
        else choose(highlightedIndex);
      } else if (event.key === "Escape" && !menu.hidden) {
        event.preventDefault();
        close(true);
      } else if (event.key === "Tab") {
        close();
      } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        if (menu.hidden) open();
        handleTypeahead(event.key);
      }
    });

    select.classList.add("native-select-control");
    field?.classList.add("has-custom-select");
    select.insertAdjacentElement("afterend", shell);
    shell.append(trigger);
    document.body.append(menu);
    const controller = { shell, menu, trigger, close, positionMenu, sync };
    customSelectControllers.set(select, controller);
    sync();
  }

  function initializeCustomSelects() {
    document.querySelectorAll("select").forEach(initializeCustomSelect);
    document.addEventListener("pointerdown", (event) => {
      if (!openCustomSelect) return;
      if (!openCustomSelect.shell.contains(event.target) && !openCustomSelect.menu.contains(event.target)) {
        openCustomSelect.close();
      }
    });
    document.addEventListener("scroll", () => openCustomSelect?.positionMenu(), true);
    window.addEventListener("resize", () => openCustomSelect?.positionMenu());
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
      const paperLabel = `${yearCounts[year]} paper${yearCounts[year] === 1 ? "" : "s"}`;
      return `
        <div class="coverage-bar-wrap" style="--bar-height:${height}%;--bar-tone:${tone}%" title="${escapeHtml(year)}: ${paperLabel}">
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
      paper.title, paper.authors, paper.keywords, paper.objectives, paper.venue, paper.year, paper.ranks,
      paper.paper_type, paper.method_families, paper.scenarios, paper.directions, paper.verification_status,
    ].join(" "));
  }

  function matchesState(paper) {
    const terms = normalize(state.query).split(/\s+/).filter(Boolean);
    const haystack = searchableText(paper);
    return terms.every((term) => haystack.includes(term))
      && (!state.paperType || paper.paper_type === state.paperType)
      && (!state.method || splitValues(paper.method_families).includes(state.method))
      && (!state.scenario || splitValues(paper.scenarios).includes(state.scenario))
      && (!state.direction || splitValues(paper.directions).includes(state.direction))
      && (!state.venue || paper.venue === state.venue)
      && (!state.year || paper.year === state.year)
      && (!state.rank || splitValues(paper.ranks).includes(state.rank))
      && (!state.verification || paper.verification_status === state.verification)
      && (!state.availability || Boolean(paper[`${state.availability}_url`]));
  }

  function sortedPapers(papers) {
    return [...papers].sort((a, b) => {
      if (state.sort === "oldest") return Number(a.year) - Number(b.year) || a.title.localeCompare(b.title);
      if (state.sort === "title") return a.title.localeCompare(b.title) || Number(b.year) - Number(a.year);
      return Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    });
  }

  function filteredPapers() {
    return sortedPapers(catalog.papers.filter(matchesState));
  }

  function tagMarkup(paper) {
    const tags = [
      paper.paper_type === "survey_analysis" ? paperTypeLabels.survey_analysis : "",
      ...splitValues(paper.method_families).map((value) => methodLabels[value] || value),
      ...splitValues(paper.directions).map((value) => directionLabels[value] || value),
      ...splitValues(paper.scenarios).map((value) => scenarioLabels[value] || value),
    ].filter(Boolean).slice(0, 6);
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
        <div class="paper-actions"><button class="details-button" type="button" data-paper-id="${escapeHtml(paper.paper_id)}">Details</button></div>
      </li>`;
  }

  function activeFilterCount() {
    return [state.query, state.paperType, state.method, state.scenario, state.direction, state.venue, state.year, state.rank, state.verification, state.availability].filter(Boolean).length;
  }

  function filterDisplayValue(definition, value) {
    if (definition.key === "query") return `“${value}”`;
    return definition.labels?.[value] || value;
  }

  function clearFilter(key) {
    state[key] = "";
    state.page = 1;
    if (key === "query") elements.search.value = "";
    else elements[key].value = "";
    render();
  }

  function renderActiveFilters() {
    const active = filterDefinitions.filter(({ key }) => Boolean(state[key]));
    elements.activeFilters.replaceChildren();
    elements.activeFilters.hidden = active.length === 0;
    active.forEach((definition) => {
      const button = document.createElement("button");
      const value = filterDisplayValue(definition, state[definition.key]);
      button.className = "active-filter";
      button.type = "button";
      button.setAttribute("aria-label", `Remove ${definition.label} filter: ${value}`);
      const label = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = `${definition.label}:`;
      label.append(name, ` ${value}`);
      const mark = document.createElement("span");
      mark.className = "active-filter-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "×";
      button.append(label, mark);
      button.addEventListener("click", () => clearFilter(definition.key));
      elements.activeFilters.append(button);
    });
  }

  function syncFilterUi() {
    const count = activeFilterCount();
    elements.filterCount.textContent = String(count);
    elements.filterCount.hidden = count === 0;
    elements.filterToggleCount.textContent = String(count);
    elements.filterToggleCount.hidden = count === 0;
    elements.clear.disabled = count === 0;
    filterDefinitions.forEach(({ key }) => {
      if (key === "query") return;
      elements[key].closest(".filter-field")?.classList.toggle("is-active", Boolean(state[key]));
    });
    customSelectControllers.forEach((controller) => controller.sync());
    const panelOpen = elements.filterPanel.classList.contains("is-open");
    elements.filterToggle.setAttribute("aria-label", `${panelOpen ? "Hide" : "Show"} filters${count ? `, ${count} active` : ""}`);
    renderActiveFilters();
  }

  function updateUrl() {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (!value || (key === "page" && value === 1) || (key === "sort" && value === "newest")) return;
      params.set(key, value);
    });
    const next = `${location.pathname}${params.size ? `?${params}` : ""}${location.hash}`;
    history.replaceState(null, "", next);
  }

  function paginationItems(currentPage, totalPages) {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

    const pages = new Set([1, totalPages]);
    if (currentPage <= 4) {
      for (let page = 2; page <= 5; page += 1) pages.add(page);
    } else if (currentPage >= totalPages - 3) {
      for (let page = totalPages - 4; page < totalPages; page += 1) pages.add(page);
    } else {
      pages.add(currentPage - 1);
      pages.add(currentPage);
      pages.add(currentPage + 1);
    }

    const items = [];
    [...pages].sort((a, b) => a - b).forEach((page, index, ordered) => {
      if (index && page - ordered[index - 1] > 1) items.push("ellipsis");
      items.push(page);
    });
    return items;
  }

  function renderPagination(totalPages) {
    elements.pagination.replaceChildren();
    elements.pagination.hidden = totalPages <= 1;
    if (totalPages <= 1) return;

    const createButton = (label, page, className, disabled = false) => {
      const button = document.createElement("button");
      button.className = `pagination-button ${className}`;
      button.type = "button";
      button.textContent = label;
      button.dataset.page = String(page);
      button.disabled = disabled;
      return button;
    };

    const previous = createButton("Previous", state.page - 1, "pagination-button--nav pagination-button--previous", state.page === 1);
    previous.setAttribute("aria-label", "Previous page");
    elements.pagination.append(previous);

    const pages = document.createElement("div");
    pages.className = "pagination-pages";
    paginationItems(state.page, totalPages).forEach((item) => {
      if (item === "ellipsis") {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.setAttribute("aria-hidden", "true");
        ellipsis.textContent = "…";
        pages.append(ellipsis);
        return;
      }
      const button = createButton(String(item), item, "pagination-button--page");
      button.setAttribute("aria-label", `Page ${item}`);
      if (item === state.page) button.setAttribute("aria-current", "page");
      pages.append(button);
    });
    elements.pagination.append(pages);

    const summary = document.createElement("p");
    summary.className = "pagination-summary";
    summary.textContent = `Page ${state.page} of ${totalPages}`;
    elements.pagination.append(summary);

    const next = createButton("Next", state.page + 1, "pagination-button--nav pagination-button--next", state.page === totalPages);
    next.setAttribute("aria-label", "Next page");
    elements.pagination.append(next);
  }

  function goToPage(page) {
    const totalPages = Math.max(1, Math.ceil(filteredPapers().length / pageSize));
    const nextPage = Math.max(1, Math.min(Number(page), totalPages));
    if (!Number.isInteger(nextPage) || nextPage === state.page) return;
    state.page = nextPage;
    render();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    elements.count.focus({ preventScroll: true });
    elements.count.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function render() {
    const filtered = filteredPapers();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    state.page = Math.max(1, Math.min(state.page, totalPages));
    const startIndex = (state.page - 1) * pageSize;
    const visible = filtered.slice(startIndex, startIndex + pageSize);
    const filters = activeFilterCount();
    elements.loading.hidden = true;
    elements.list.innerHTML = visible.map(paperMarkup).join("");
    const shownRange = filtered.length ? `Showing ${(startIndex + 1).toLocaleString()}-${(startIndex + visible.length).toLocaleString()} of ` : "";
    elements.count.textContent = `${shownRange}${filtered.length.toLocaleString()} paper${filtered.length === 1 ? "" : "s"}${filters ? ` across ${filters} active filter${filters === 1 ? "" : "s"}` : ""}`;
    elements.empty.hidden = filtered.length !== 0;
    elements.exportCsv.disabled = filtered.length === 0;
    elements.exportBibtex.disabled = filtered.length === 0;
    renderPagination(totalPages);
    elements.list.querySelectorAll("[data-paper-id]").forEach((button) => {
      button.addEventListener("click", () => openDialog(button.dataset.paperId));
    });
    syncFilterUi();
    updateUrl();
  }

  function linkLabel(url, paper) {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
      const path = parsed.pathname.toLowerCase();
      if (host === "doi.org") return paper.paper_id.startsWith("arxiv:") ? "Published version" : "Related DOI";
      if (host === "arxiv.org") return "arXiv";
      if (host === "dl.acm.org") return "ACM Digital Library";
      if (host.includes("researchgate.net")) return "ResearchGate";
      if (path.endsWith(".pdf") || path.includes("/pdf") || path.includes("document")) return "PDF";
      return host || "Related link";
    } catch {
      return "Related link";
    }
  }

  function dialogLink(url, label, primary = false) {
    if (!url) return "";
    return `<a class="button ${primary ? "button-primary" : "button-secondary"}" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
  }

  function citationText(paper) {
    return `${paper.authors.replaceAll("; ", ", ")}. “${paper.title}.” ${paper.venue}, ${paper.year}. ${paper.paper_url}`;
  }

  async function copyText(value, button, successLabel) {
    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = successLabel;
      window.setTimeout(() => { button.textContent = original; }, 1400);
    } catch {
      button.textContent = "Copy unavailable";
    }
  }

  function openDialog(paperId) {
    const paper = catalog.papers.find((item) => item.paper_id === paperId);
    if (!paper) {
      state.paper = "";
      updateUrl();
      return;
    }
    state.paper = paperId;
    updateUrl();
    const otherLinks = splitValues(paper.other_urls);
    const methods = splitValues(paper.method_families).map((value) => methodLabels[value] || value).join(", ");
    const scenarios = splitValues(paper.scenarios).map((value) => scenarioLabels[value] || value).join(", ");
    const verification = paper.verification_status === "verified"
      ? `Source-verified on ${paper.verified_at}`
      : paper.verification_status === "pending"
        ? "Verification pending"
        : "Legacy record awaiting source-by-source re-verification";
    elements.dialogContent.innerHTML = `
      <p class="dialog-meta">${escapeHtml(paper.venue)} / ${escapeHtml(paper.year)}${paper.ranks ? ` / ${escapeHtml(paper.ranks)}` : ""}</p>
      <h2 class="dialog-title" id="dialog-title">${escapeHtml(paper.title)}</h2>
      <p class="dialog-authors">${escapeHtml(paper.authors.replaceAll("; ", ", "))}</p>
      <dl class="dialog-details">
        <div><dt>Paper type</dt><dd>${escapeHtml(paperTypeLabels[paper.paper_type] || paper.paper_type)}</dd></div>
        <div><dt>Method</dt><dd>${escapeHtml(methods || "Not assigned")}</dd></div>
        <div><dt>Direction</dt><dd>${escapeHtml(splitValues(paper.directions).map((value) => directionLabels[value] || value).join(", ") || "Other")}</dd></div>
        <div><dt>Scenario</dt><dd>${escapeHtml(scenarios || "Not assigned")}</dd></div>
        <div><dt>Identifier</dt><dd>${escapeHtml(paper.paper_id)}</dd></div>
        <div><dt>Provenance</dt><dd>${escapeHtml(verification)}</dd></div>
      </dl>
      ${paper.keywords ? `<div class="dialog-section"><h3>Keywords</h3><p>${escapeHtml(paper.keywords.replaceAll("; ", ", "))}</p></div>` : ""}
      ${paper.objectives ? `<div class="dialog-section"><h3>Objectives</h3><p>${escapeHtml(paper.objectives.replaceAll("; ", ", "))}</p></div>` : ""}
      <div class="dialog-actions">
        ${dialogLink(paper.paper_url, paper.paper_id.startsWith("arxiv:") ? "Open arXiv" : "Open DOI", true)}
        ${dialogLink(paper.code_url, "View code")}
        ${dialogLink(paper.data_url, "View data")}
        ${otherLinks.map((url) => dialogLink(url, linkLabel(url, paper))).join("")}
        <button class="button button-secondary" id="copy-citation" type="button">Copy citation</button>
        <button class="button button-secondary" id="copy-bibtex" type="button">Copy BibTeX</button>
        <button class="button button-secondary" id="copy-paper-link" type="button">Copy link</button>
      </div>`;

    if (!elements.dialog.open) elements.dialog.showModal();
    document.querySelector("#copy-citation").addEventListener("click", (event) => copyText(citationText(paper), event.currentTarget, "Copied"));
    document.querySelector("#copy-bibtex").addEventListener("click", (event) => copyText(exporters.bibtexEntry(paper), event.currentTarget, "Copied"));
    document.querySelector("#copy-paper-link").addEventListener("click", (event) => copyText(location.href, event.currentTarget, "Copied"));
  }

  function closeDialog() {
    if (elements.dialog.open) elements.dialog.close();
    if (state.paper) {
      state.paper = "";
      updateUrl();
    }
  }

  function downloadFile(filename, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function resetFilters() {
    Object.assign(state, {
      query: "", paperType: "", method: "", scenario: "", direction: "", venue: "", year: "",
      rank: "", verification: "", availability: "", sort: "newest", paper: "", page: 1,
    });
    ["search", "paperType", "method", "scenario", "direction", "venue", "year", "rank", "verification", "availability"].forEach((key) => {
      elements[key].value = "";
    });
    elements.sort.value = "newest";
    if (elements.dialog.open) elements.dialog.close();
    render();
  }

  function readUrlState() {
    const params = new URLSearchParams(location.search);
    ["query", "paperType", "method", "scenario", "direction", "venue", "year", "rank", "verification", "availability", "sort", "paper"].forEach((key) => {
      if (params.has(key)) state[key] = params.get(key);
    });
    if (params.has("category") && !params.has("method") && !params.has("paperType")) {
      const legacyCategory = params.get("category");
      if (legacyCategory === "survey_analysis") state.paperType = "survey_analysis";
      else if (legacyCategory === "other_unclassified") state.method = "systems";
      else state.method = legacyCategory;
    }
    const requestedPage = Number.parseInt(params.get("page"), 10);
    if (Number.isInteger(requestedPage) && requestedPage > 0) state.page = requestedPage;
    elements.search.value = state.query;
    ["paperType", "method", "scenario", "direction", "venue", "year", "rank", "verification", "availability", "sort"].forEach((key) => {
      const control = elements[key];
      control.value = state[key];
      if (control.value !== state[key]) {
        state[key] = key === "sort" ? "newest" : "";
        control.value = state[key];
      }
    });
  }

  function bindControls() {
    let searchTimer;
    elements.search.addEventListener("input", () => {
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => {
        state.query = elements.search.value.trim();
        state.page = 1;
        render();
      }, 100);
    });
    ["paperType", "method", "scenario", "direction", "venue", "year", "rank", "verification", "availability", "sort"].forEach((key) => {
      elements[key].addEventListener("change", () => {
        state[key] = elements[key].value;
        state.page = 1;
        render();
      });
    });
    elements.clear.addEventListener("click", resetFilters);
    elements.filterToggle.addEventListener("click", () => {
      const panelOpen = elements.filterPanel.classList.toggle("is-open");
      elements.filterToggle.setAttribute("aria-expanded", String(panelOpen));
      elements.filterToggle.setAttribute("aria-label", `${panelOpen ? "Hide" : "Show"} filters${activeFilterCount() ? `, ${activeFilterCount()} active` : ""}`);
    });
    elements.emptyReset.addEventListener("click", resetFilters);
    elements.pagination.addEventListener("click", (event) => {
      const button = event.target.closest("[data-page]");
      if (button && !button.disabled) goToPage(Number(button.dataset.page));
    });
    elements.exportCsv.addEventListener("click", () => downloadFile("sdn-nfv-papers-filtered.csv", `\uFEFF${exporters.csvExport(filteredPapers())}`, "text/csv;charset=utf-8"));
    elements.exportBibtex.addEventListener("click", () => downloadFile("sdn-nfv-papers-filtered.bib", `${filteredPapers().map(exporters.bibtexEntry).join("\n\n")}\n`, "application/x-bibtex;charset=utf-8"));
    elements.dialogClose.addEventListener("click", closeDialog);
    elements.dialog.addEventListener("click", (event) => { if (event.target === elements.dialog) closeDialog(); });
    elements.dialog.addEventListener("close", () => {
      if (state.paper) {
        state.paper = "";
        updateUrl();
      }
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
    elements.empty.querySelector("p").textContent = "Run python3 scripts/generate_site.py and verify the website assets, then reload this page.";
    elements.emptyReset.hidden = true;
  }

  initializeTheme();
  if (!catalog || !Array.isArray(catalog.papers) || !exporters) {
    showCatalogError();
    return;
  }
  initializeFilters(catalog.papers);
  renderCoverage(catalog.papers);
  readUrlState();
  bindControls();
  initializeCustomSelects();
  render();
  if (state.paper) openDialog(state.paper);
})();
