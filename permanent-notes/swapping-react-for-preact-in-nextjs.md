---
title: Swapping React for Preact in Next.js
publish_date: 2021-12-10
last_updated: 20211210
description: Some notes from swapping React for Preact in Next.js
status: live
tags:
  - react
  - preact
  - nextjs
---

This a slight follow up to by blog about [eco-friendly websites](https://chiubaca.com/making-eco-friendly-websites/). 

At work, React is our framework of choice, however it comes at a [cost of ~120kb](https://bundlephobia.com/package/react-dom@17.0.2). Preact is a 3kb alternative to React. When used in conjunction with `[preact-compat](<https://github.com/preactjs/preact-compat>)` we can do a straight swap of React for Preact without any breaking API changes. ****The official docs claim that this thin layer over Preact achieves [100% compatibility with React](https://preactjs.com/guide/v10/differences-to-react).

# Quick Guide

Starting from a fresh Next.js project we can swap React for Preact by running the following:

```bash
npm install --save next next-plugin-preact preact react@npm:@preact/compat react-dom@npm:@preact/compat react-ssr-prepass@npm:preact-ssr-prepass preact-render-to-string
```

or with yarn:

```bash
yarn add next next-plugin-preact preact react@npm:@preact/compat react-dom@npm:@preact/compat react-ssr-prepass@npm:preact-ssr-prepass preact-render-to-string
```

Next, we need to configure the `next.config.js` file. I think `[next-compose-plugins](<https://www.npmjs.com/package/next-compose-plugins>)` is a must for managing multiple next.js plugins.

To install run:

```bash
npm i next-compose-plugins
```

or with yarn:

```bash
yarn add next-compose-plugins
```

_note it is installed as a regular `dependencies` and not a `devDependencies` . Next.js is very particular about this._

Now we can configure the `next.config.js` like so:

```jsx
const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact')

/**
* @type {import('next').NextConfig}
*/
const nextConfig = {
	// Next.js configuration goes here - <https://nextjs.org/docs/api-reference/next.config.js/introduction>
};

module.exports = withPlugins(
	[
		[withPreact],
		// Additional plugins are installed here - <https://github.com/cyrilwanner/next-compose-plugins#usage>
	],
	nextConfig
);
```

That's it! We can carry on writing React/Preact as normal.

There is a Next.js - Preact - TS - Styled Components template at [](https://github.com/Neverbland/skeleton/tree/nextjs-preact)[https://github.com/Neverbland/skeleton/tree/nextjs-preact](https://github.com/Neverbland/skeleton/tree/nextjs-preact) if you want to get started straight away.

# References

-   [https://css-tricks.com/reduce-your-websites-environmental-impact-with-a-carbon-budget/](https://css-tricks.com/reduce-your-websites-environmental-impact-with-a-carbon-budget/)
-   [https://preactjs.com/guide/v10/differences-to-react](https://preactjs.com/guide/v10/differences-to-react)
-   [https://github.com/vercel/next.js/tree/canary/examples/using-preact](https://github.com/vercel/next.js/tree/canary/examples/using-preact)
-   [https://javascript.plainenglish.io/next-js-preact-f993c95a3f93](https://javascript.plainenglish.io/next-js-preact-f993c95a3f93)
