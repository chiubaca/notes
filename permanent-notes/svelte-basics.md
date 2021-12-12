---
title: Svelte Basics
publish_date: 20211212
last_updated: 20211212
description: Svelte Basics
status: draft
layout: ../../layouts/PermanentNoteLayout.astro
---

## Reactivity

Variables are automatically reactive in `.svelte` files. 

```svelte
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

```
function addNumber() {
	numbers = [...numbers, numbers.length + 1];
}
```

### Reactive Declarations
 aka computed values can be created with the `$` syntax .e.g
 
 ```svelte
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

```
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

```
$: if (count >= 10) {
	alert(`count is dangerously high!`);
	count = 9;
}
```

---

### Props

props for components are exposed using the `export keyword` e.g
```
// Nested.svelete

<script>
	export let answer;
</script>

<p>The answer is {answer}</p>
```

```
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