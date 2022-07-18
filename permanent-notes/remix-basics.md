---
title: Remix Basics
publish_date: 20220618
last_updated: 20220618
description: Remix Basics
status: draft
layout: ../../layouts/PermanentNoteLayout.astro
---

# Notes on Remix


- Every `.tsx` can export a `loader` function
	- It's good practice to move the logic in this function to a `[file].server.ts`  in a `models` directory.

- Every `.tsx` can also support an `actio`


- File based routing works different to Next.js. You can the name of the file will correspond the route its on and will only render if it matches. This _must_ be using in conjuction with the `Outlet` component


References
- [20220717](../fleeting-notes/20220717.md)