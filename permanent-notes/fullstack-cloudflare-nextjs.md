---
title: Full stack cloudflare with Next.js
publish_date: 2024-04-29
last_updated: 2024-04-29
description: Exploring the ergonomics of what a a fullstack app using only cloudflare infra with Next.js looks like
status: draft
tags:
  - cloudflare
  - nextjs
---

With the absolute failure of [fullstack-cloudflare-nextjs](permanent-notes/fullstack-cloudflare-nextjs.md). I've been exploring Astro.js as a full-stack web dev solution. Especially with the announcement of [Astro Actions](https://astro.build/blog/astro-480/), it feels like Astro can really stand its ground against the likes of Next.js

The goal is the get all these features working together:

- Cloudflare D1 for storage
- Cloudflare R2 for images
- Auth (Lucia/ Auth.js)


Code repo:
https://github.com/chiubaca/fullstack-astro-cloudflare

Demo site:


References:

- https://developers.cloudflare.com/d1/get-started/
- https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1
- https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://kevinkipp.com/blog/going-full-stack-on-astro-with-cloudflare-d1-and-drizzle/
- https://hrishikeshpathak.com/blog/typesafe-database-queries-with-drizzle-and-cloudflare-d1/