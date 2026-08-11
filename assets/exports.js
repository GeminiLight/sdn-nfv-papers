(function exposePaperExports(root, factory) {
  const exports = factory();
  if (typeof module === "object" && module.exports) module.exports = exports;
  else root.PAPER_EXPORTS = exports;
})(typeof globalThis === "undefined" ? this : globalThis, () => {
  "use strict";

  const publicCsvFields = [
    "paper_id", "title", "categories", "directions", "venue", "year", "ranks", "authors",
    "keywords", "objectives", "paper_url", "code_url", "data_url", "other_urls",
  ];

  const splitValues = (value) => value ? value.split(";").map((part) => part.trim()).filter(Boolean) : [];

  function bibEscape(value) {
    return String(value || "").replace(/([&%$#_{}])/g, "\\$1");
  }

  function shortHash(value) {
    let hash = 0;
    for (const character of value) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
    return Math.abs(hash).toString(36).slice(0, 5);
  }

  function bibtexEntry(paper) {
    const firstAuthor = splitValues(paper.authors)[0] || "Paper";
    const surname = firstAuthor.split(/\s+/).at(-1).replace(/[^a-z0-9]/gi, "") || "Paper";
    const titleWord = paper.title.split(/\s+/).find((word) => word.replace(/[^a-z0-9]/gi, "").length > 3) || "Study";
    const key = `${surname}${paper.year}${titleWord.replace(/[^a-z0-9]/gi, "")}_${shortHash(paper.paper_id)}`;
    const type = paper.venue_type === "conference" || paper.venue_type === "workshop"
      ? "inproceedings"
      : paper.venue_type === "preprint" ? "misc" : "article";
    const venueField = type === "inproceedings" ? "booktitle" : "journal";
    const fields = [
      `  title = {${bibEscape(paper.title)}},`,
      `  author = {${splitValues(paper.authors).map(bibEscape).join(" and ")}},`,
      `  ${venueField} = {${bibEscape(paper.venue)}},`,
      `  year = {${paper.year}},`,
    ];
    if (paper.paper_id.startsWith("doi:")) fields.push(`  doi = {${bibEscape(paper.paper_id.slice(4))}},`);
    if (paper.paper_id.startsWith("arxiv:")) {
      fields.push(`  eprint = {${bibEscape(paper.paper_id.slice(6))}},`);
      fields.push("  archivePrefix = {arXiv},");
    }
    fields.push(`  url = {${bibEscape(paper.paper_url)}}`);
    return `@${type}{${key},\n${fields.join("\n")}\n}`;
  }

  function csvExport(papers) {
    const quote = (value) => `"${String(value || "").replaceAll('"', '""')}"`;
    return [publicCsvFields, ...papers.map((paper) => publicCsvFields.map((field) => paper[field]))]
      .map((row) => row.map(quote).join(","))
      .join("\n") + "\n";
  }

  return { bibtexEntry, csvExport, publicCsvFields };
});
