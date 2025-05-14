---
title: Tech I'm Interested in 2025
publish_date: 2025-05-07
last_updated: 2025-05-07
description: Technologies that I want to explore deeper in 2025
status: live
tags:
  - dev-journal
---
There is an overwhelming amount of technologies I would at least like to try and dabble in 2025, maybe _too_ many. In no particular order, these are things I want to try to understand a bit better.


## AT Protocol

I've been on Bluesky more than Twitter/X recently, the tech and web dev community is thriving there. As I explore the site more, I've learnt that the whole backend is underpinned by a technology called ATProtocol

> an open, decentralized network for building social applications. 

My understanding so far is its a completely extendable protocol, where you can extend its schema (lexicon) to support pretty much any data you want. This means you can build off ATProtocol to build any social media you want. Users within ATProtocol, which includes the whole Bluesky userbase are automatically "registered" as it is the same thing.

My idea was to create a Strava clone that was backed by AT Protocol, your routes could be persisted into the network which would be fully owned by you.

- https://atproto.com/

## MCP

Everybody is talking about Model Context Protocol. A standardised way to connect APIs and any sort of data to an LLM. My understanding so far is that you can write connections to pretty much any sort of data or APIs and connect it to an MCP client. An MCP client lets you consume an LLM with the additional context you provided with your MCP. Because the data source can literally be anything e.g markdown files, a REST endpoint, or a database. the possibilities seem endless...

Some ideas I had --  MCP server for notes.chiubaca.com, an MCP server for my works design system, MCP server about me.

- https://modelcontextprotocol.io/introduction


## React 19

Maybe a weird one to put on the list as I already know React. However, React 19 has had a big glow-up so many new APIs in React which I'm not fully leveraging. e.g `useAction()`  , `use()`  and new components like `<ViewTransitions/>` and `<Activity/>` . I will try to make use of these new building blocks in upcoming side projects.  

- https://react.dev/blog/2024/12/05/react-19

## Home Assistant

After a pub chat about Home Assistant, I got excited about it, but I don't really know anything about this at all. But, as I'm soon to be a homeowner, I love the idea of automating my house. Heck, when combined with a local AI and some MCP functionality I could create my own [JARVIS](https://en.wikipedia.org/wiki/J.A.R.V.I.S.).

https://www.home-assistant.io/ 


## Full stack Cloudflare

Full stack Cloudflare is a concept that I've been thinking about for a while now, but is starting to gain more traction IRL.

It's clear Cloudflare is starting to go _hard_ on developer tooling aside from being a really good WAF, DNS provider and caching service. I'm already using Cloudflare Pages for this blog, I got a good feel for D1 and R2 for shibes.lol. I want to explore other aspects of the Cloudflare stack such as Durable Objects, AI.

https://blog.cloudflare.com/tag/full-stack/