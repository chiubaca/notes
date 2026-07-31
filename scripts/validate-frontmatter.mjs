#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import validation from "./note-frontmatter-validation.js";

const { validateNote } = validation;
const noteDirectories = ["fleeting-notes", "permanent-notes"];

function getStagedFiles() {
  return execFileSync(
    "git",
    ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "--", "fleeting-notes", "permanent-notes"],
    { encoding: "utf8" },
  )
    .split("\n")
    .filter((file) => file.endsWith(".md"));
}

function getNoteFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return getNoteFiles(path);
    return entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
  });
}

function getFileContents(file, staged) {
  if (!staged) return readFileSync(file, "utf8");
  return execFileSync("git", ["show", `:${file}`], { encoding: "utf8" });
}

const staged = process.argv.includes("--staged");
const files = staged
  ? getStagedFiles()
  : noteDirectories.flatMap((directory) => getNoteFiles(directory).map((file) => relative(".", file)));

const failures = files.flatMap((file) =>
  validateNote(file, getFileContents(file, staged)).map((error) => `${file}: ${error}`),
);

if (failures.length > 0) {
  console.error("Note frontmatter validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
}
