const { Notice, Plugin } = require("obsidian");
const { validateNote } = require("../../../scripts/note-frontmatter-validation.js");

module.exports = class NoteFrontmatterValidator extends Plugin {
  async onload() {
    this.lastErrors = new Map();
    this.statusBar = this.addStatusBarItem();

    this.registerEvent(this.app.vault.on("modify", (file) => this.validateFile(file)));
    this.app.workspace.onLayoutReady(() => this.validateFile(this.app.workspace.getActiveFile()));
  }

  async validateFile(file) {
    if (!file || file.extension !== "md") return;

    const isActiveFile = this.app.workspace.getActiveFile()?.path === file.path;
    const errors = validateNote(file.path, await this.app.vault.read(file));
    if (errors.length === 0) {
      if (this.lastErrors.delete(file.path)) new Notice(`${file.basename}: frontmatter is valid`, 3000);
      if (isActiveFile) this.statusBar.setText("");
      return;
    }

    const message = `${file.basename}: ${errors.join("; ")}`;
    if (isActiveFile) this.statusBar.setText(`Frontmatter: ${message}`);
    if (this.lastErrors.get(file.path) !== message) new Notice(message, 8000);
    this.lastErrors.set(file.path, message);
  }
};
