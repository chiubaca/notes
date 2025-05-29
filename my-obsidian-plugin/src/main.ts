import { Plugin } from 'obsidian';

export default class HelloWorldPlugin extends Plugin {
    onload() {
        this.addCommand({
            id: 'hello-world',
            name: 'Hello World',
            callback: () => {
                new Notice('Hello World');
            }
        });
    }

    onunload() {
        // Cleanup if necessary
    }
}