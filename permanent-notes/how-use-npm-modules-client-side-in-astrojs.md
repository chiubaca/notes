---
title: How to use npm modules client-side in Astro.js `.astro` files
publish_date: 2021-10-21
last_updated: 2024-01-15
description: 
status: live
tags:
  - javascript
  - astro
---

 **This blog is out of date. Check out the Astro docs: [Scripts and Event Handling | Docs (astro.build)](https://docs.astro.build/en/guides/client-side-scripts/). It now works exactly how you would expect. 🥳**

I've been playing with Astro some more and finally got my head around how to use npm modules client side in a `.astro` file. It's not that obvious...

First thing I tried was something like this:

```html
<!-- Test.astro -->
<canvas class="webgl"></canvas>
  
<script type="module"> 
 import * as THREE from 'three'

 console.log(THREE) //undefined :(
</script>
```

This returns `Uncaught TypeError: Failed to resolve module specifier "three". Relative references must start with either "/", "./", or "../".` in the console.

Astro doesn't let you import npm modules in inline script tags within `.astro` unfortunately. However we can import in an external `.js`/`.ts` file, then make use of [`Astro.resolve`](https://docs.astro.build/es/reference/api-reference/#astroresolve) like so:

```html
<!-- Test.astro -->
<canvas class="webgl"></canvas>

<script src={Astro.resolve('./myScript.js')} type="module"/>
```

Inside `myScript.js` we can import things as expected.


```js
// myScript.js
import * as THREE from 'three';

console.log(THREE) // Three.js module!
```

Working demo [here](https://stackblitz.com/edit/astro-qp2xde?file=src%2Fcomponents%2FTest.astro).
