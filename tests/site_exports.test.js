"use strict";

const assert = require("node:assert/strict");
const { bibtexEntry, csvExport, publicCsvFields } = require("../assets/exports.js");

const paper = Object.fromEntries(publicCsvFields.map((field) => [field, ""]));
Object.assign(paper, {
  paper_id: "doi:10.1000/example",
  title: 'A "quoted" paper & test',
  categories: "mathematical",
  venue: "ExampleConf",
  venue_type: "conference",
  year: "2026",
  authors: "Ada Lovelace; Alan Turing",
  paper_url: "https://doi.org/10.1000/example",
});

const csv = csvExport([paper]);
assert.equal(csv.split("\n").length, 3);
assert.ok(csv.startsWith('"paper_id","title"'));
assert.ok(csv.includes('"A ""quoted"" paper & test"'));
assert.equal(csv.split("\n")[1].split('","').length, publicCsvFields.length);

const bibtex = bibtexEntry(paper);
assert.ok(bibtex.startsWith("@inproceedings{"));
assert.ok(bibtex.includes("Ada Lovelace and Alan Turing"));
assert.ok(bibtex.includes("doi = {10.1000/example}"));
assert.ok(bibtex.includes('title = {A "quoted" paper \\& test}'));

console.log("site export tests passed");
