const noteTypes = {
  "fleeting-notes": {
    required: ["publish_date"],
  },
  "permanent-notes": {
    required: ["title", "publish_date", "last_updated", "status"],
  },
};

function parseFrontmatter(contents) {
  const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;

  const fields = new Map();
  const lines = match[1].split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    const field = lines[index].match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/);
    if (!field) continue;

    const [, key, value = ""] = field;
    while (/^\s+-\s+/.test(lines[index + 1] ?? "")) index++;
    fields.set(key, { value });
  }
  return fields;
}

function validateNote(file, contents) {
  const noteType = Object.keys(noteTypes).find((type) => file.startsWith(`${type}/`));
  if (!noteType) return [];

  const fields = parseFrontmatter(contents);
  if (!fields) return ["missing YAML frontmatter"];

  const errors = [];
  for (const key of noteTypes[noteType].required) {
    const field = fields.get(key);
    if (!field || !field.value) errors.push(`missing required '${key}'`);
  }

  const status = fields.get("status");
  if (noteType === "permanent-notes" && status && !["draft", "live"].includes(status.value)) {
    errors.push("'status' must be 'draft' or 'live'");
  }

  const tags = fields.get("tags");
  if (tags && tags.value && !/^\[.*\]$/.test(tags.value)) {
    errors.push("'tags' must be a YAML array");
  }

  return errors;
}

module.exports = { validateNote };
