---
title: Svelte Basics
publish_date: 20211212
last_updated: 20211212
description: Svelte Basics
status: draft
layout: ../../layouts/PermanentNoteLayout.astro
---

# Svelte Basics
Notes on using Svelte.js

## Reactivity

Variables are automatically reactive in `.svelte` files. 

```js
<script>
	let count = 0;

	function incrementCount() {
		// event handler code goes here
		count += 1
	}
</script>

<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

```


Note that  sveltes reactivity only happens on re-assignments to variables. so methods like `push()` `pop()`  do not cause any reactivity. The way around this is to clone and reassign arrays making use of the spread operator:

```js
function addNumber() {
	numbers = [...numbers, numbers.length + 1];
}
```

### Reactive Declarations
 aka computed values can be created with the `$` syntax .e.g
 
 ```js
<script>
	let count = 0;
	
	$: doubled = count * 2

	function handleClick() {
		count += 1;
}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

{doubled}
 
 ```
 
 Note: you could alternatively write `{count * 2}` .
 
 ---
We're not limited to declaring reactive _values_ — we can also run arbitrary _statements_ reactively. For example, we can log the value of `count` whenever it changes:

```js
$: console.log(`the count is ${count}`);
```

You can easily group statements together with a block:

```
$: {
	console.log(`the count is ${count}`);
	alert(`I SAID THE COUNT IS ${count}`);
}
```

You can even put the `$:` in front of things like `if` blocks:

```js
$: if (count >= 10) {
	alert(`count is dangerously high!`);
	count = 9;
}
```

---

## Props

props for components are exposed using the `export keyword` e.g
```js
// Nested.svelete

<script>
	export let answer;
</script>

<p>The answer is {answer}</p>
```

```js
//App.svelte

<script>
	import Nested from './Nested.svelte';
</script>

<Nested answer={42}/>
```

> this renders `The answer is 42`

Default props can e applied by defining it at the export
```
// Nested.svelete

<script>
	export let answer =42;
</script>

<p>The answer is {answer}</p>
```

## Svelte Syntax

### Loops
```js
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}

```

### Suspense
a.k.a, async rendering

```
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```


## Two-way Data Binding

Two way data binding works very similar to Vue.js. element values can be binded both ways to read and edit data 

```html
<script>
	let name = 'world';
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```


`bind` works across pretty much everything you expect it to including `textarea` `input` `select` and even `contenteditable` on divs

Svelte provides reactive bindings to `audio` and `video` elements 
The complete set of bindings for `<audio>` and `<video>` is as follows — six _readonly_ bindings...

-   `duration` (readonly) — the total duration of the video, in seconds
-   `buffered` (readonly) — an array of `{start, end}` objects
-   `seekable` (readonly) — ditto
-   `played` (readonly) — ditto
-   `seeking` (readonly) — boolean
-   `ended` (readonly) — boolean

...and five _two-way_ bindings:

-   `currentTime` — the current point in the video, in seconds
-   `playbackRate` — how fast to play the video, where `1` is 'normal'
-   `paused` — this one should be self-explanatory
-   `volume` — a value between 0 and 1
-   `muted` — a boolean value where true is muted

Videos additionally have readonly `videoWidth` and `videoHeight` bindings.

----

Svelte also handle converting values from numbers to strings, this is helpful when you're dealing with numeric inputs — `type="number"` and `type="range"` — as it means you have to remember to coerce `input.value` before using it.

```html
<script>
	let a = 1;
</script>


<input type=number bind:value={a} min=0 max=10>
<input type=range bind:value={a} min=0 max=10>
```

[20211212](../fleeting-notes/20211212.md)

## Stores

[20211212](../fleeting-notes/20211212.md)
