---
title: Everything I've built with AI this year
publish_date: 2026-07-18
last_updated: 2026-07-18
description: Everything I've built with AI this year
status: live
tags:
---
I already talked about my AI anxiety in [leaning-into-the-vibes](permanent-notes/leaning-into-the-vibes.md), but despite all these mixed feelings i've double down on using AI at work and on side projects. It's been game-changing, addictive and mind-blowing.

My current AI setup is Ghosty, Herdr OpenCode powered by whatever latest kimi model is out.

Watching everything play our on X, its easy to feel like your falling behind and be overwhelmed with every new development. I've found some solace in just moving at my own pace and incrementally adopting new skills and MCPs as when i need them. I've not built anything mind-blowing like the demos you seen online, but i've been incredibly productive with building personal software _I_ need, and scratching that side project itch in between the chaos of parenting. 

We're half-way through this year so I want to just take a look back at everything weird and wonderful things i've been able to build with AI.

## Chonk Poker

For jokes at work we started planning our tickets with using the [chonk scale](https://duckduckgo.com/?q=chonk+scale&ia=images&iax=images) . We were doing it via google meet and counting to three. It wasnt sophisticated and we kept forgetting which chonk size was refered to what. So made a proper app for us to use during our refinment sessions that mapped the chonks to fibinacii sequence.

Built with xstate, tanstack start, cloudflare d1 /do / workers. This was my Opus 4.6 moment.

![](attachments/rec_1.gif)

[demo](https://chonk-poker.chiubaca.com/) | [github](https://github.com/chiubaca/chonk-poker)

# Mecha Portfolio

![](attachments/mecha-screenshot.png)

Pretty silly project trying to get an LLM to create gundam wing with just three.js shapes and not actually using a 3d model. Opus did the best job, but it still looks pretty goofy.

[demo](https://mecha.chiubaca.com/) | [github](https://github.com/chiubaca/mecha-portofolio)


## Quick Peer Cam

I needed a baby cam and I didnt want to download a dodgy app. I vibe coded one in pinch. Its uses WebRTC so its peer-to-peer connection between the broadcaster and viewers. One of the weirdest part of this was the LLM calls an undocumented TURN server by google that is completely open to use (`stun:stun.l.google.com:19302`).

[demo](https://quick-peer-cam.chiubaca.workers.dev/) | [github](https://github.com/chiubaca/quick-peer-cam)


## Lets Play Big Two 

For no real good reason, I decided to port my  Astro [big-two-app](https://github.com/chiubaca/big-two-app) and [big-two-utils](https://github.com/chiubaca/big-two-utils) into mono repo and rebuild it all again with tanstack-start and Cloudflare durable objects. I works exactly the same. I dont really know what I was trying to achieve with this. However one great thing about it all being in a mono repo now is that its going be much simplier to steer to AI to make some big sweeping refactors. I want to incorporate a rules configurations system and new AI single player.

[demo](https://big-two.chiubaca.com/) | [github](https://github.com/chiubaca/lets-play-big-two)

## Obsidian Plugins

My Obsidian vault is tightly coupled to my personal blog [chiubaca.com](https://chiubaca.com). I had this idea for a [/memories](https://chiubaca.com/memories/) path where I would curate my absolute favourite pictures from terrabytes of photoes in onedrive. Leaning into exif data seemed like an elegant way to introduce a sidecar object for metadata. I vibed a new Obsidian plugin that let me tweak exif data inside my vault. I got a bit a carried away and also added map view for when photos have geolocation too.

[obsidian plugin](https://community.obsidian.md/plugins/exif-editor) | [github](https://github.com/chiubaca/obsidian-exif-editor)

## Clawed Club & Tangent  Newsletter

 I got very carried away with OpenClaw and Hermes. As a experiment I thought it would be interesting to see if I could grow an audience in two months using OpenClaw as a marketing assistance and newsletter curator. Spoiler alert, I failed miserably.

i vibed both of these newsletter websites clawed.club was built with openclaw which was an openclaw centric website, with latest AI headlines written by OpenClaw but curated by myself. I simply give it a link and it would add it to newsletter with some copy. I eventually jumped ships from OpenClaw to Hermes and decided an OpenClaw centric website was not what I wanted to do. So I build Tangent which was going to be tech newsletter around stuff _i_ liked. 

The big problem is, Nobody likes AI written content. So I've now binned both of these project. The foundations of Tangent is still there for me to pick up, but I will never write the content with AI.
 
[clawed.club](https://clawed.club/) | [tangent](https://newsletter.chiubaca.com/) | [github](https://github.com/chiubaca/clawed-club)


## shibes.lol data migration 

[shibes.lol](https://shibes.lol/) was built pre-ai. The homepage has a gallery that showed the 50 latest community shibas, but the database holds over 10,000 shiba images. For ages I wanted to build an infinite scroll to see "endless" shibas.  I used AI to build this for me with Tanstack infinite scroll, it worked perfectly, except I wasnt happy. I wanted pintrest style masonary infinite scrolling but this had a tough technical challenge to solve. an infinite scrolls load images faster than they can load so you either need a skelton or a blurred image, but this placeholder needs to know the dimensions of the image upfront. I used Claude to write a script to scan every image in cloudflare R2 and write this dimesion back to its image ref stored in D1. This mean when i was calling the image ref I had the dimensions in the same request which let me map placeholder image perfectly to real image.


[website](https://shibes.lol/) | [github](https://github.com/chiubaca/shibes.lol)


## Chiubaca Aura (vs code theme)

Using Hermes. I got it to read every retrospective, and note in my Obsidian vault. This is over 8 years of content. I asked to explain what kind of person I am to me, then synthanise what colours these map too. I was quite profound.

```
- **Amber** — the warmth of a new dad writing poetry at 4am
- **Midnight blue** — the late nights, the depth, the "tinker until 2am" energy
- **Electric thread** — that curiosity that runs through everything you build
```


I asked it to build a VS Code theme from this, and naturally, I love it. Its been by daily driver for most of this year.

 [vscode marketplace](https://marketplace.visualstudio.com/items?itemName=chiubaca.chiubaca-aura ) | [github](https://github.com/chiubaca/chiubaca-aura)


