---
title: Remix Basics
publish_date: '2022-06-18'
last_updated: 20220618
description: Remix Basics
status: draft
---

# Notes on Remix


- Every `.tsx` can export a `loader` function
	- It's good practice to move the logic in this function to a `[file].server.ts`  in a `models` directory.

- Every `.tsx` can also support an `actio`


- File based routing works different to Next.js. You can the name of the file will correspond the route its on and will only render if it matches. This _must_ be using in conjuction with the `Outlet` component

- Remix projects will have `.server` and `.client` file extension names . These are not just naming conventions but also are hints to the Remix compiler to prevent server code leaking into client side code and vice versa. It can help with tree shaking.


References
- [20220717](../fleeting-notes/20220717.md)
