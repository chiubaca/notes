---
title: How I self-host my media server for a free Netflix experience
publish_date: 2025-08-17
last_updated: 2025-08-17
description: How I self-host my home media server
status: live
tags:
  - home-hacking
---

Few notes on how I've setup my media server and achieve that Netflix experience.

## Server

Repurposed my old MakeBook D laptop and installed ubuntu Desktop 24. Thought it might be useful to have a GUI desktop for RDP or Desktop streaming. Turns out this is an absolute nightmare. I got it working, sort of, but I learnt using using RDP on Linux is nothing like on Windows. It has to create a completely new user session and its very cumbersome to set up a GUI desktop, Ubuntu GNOME desktop does not play nicely so you have to use xRDP instead. Its long, its not worth it. SSH is the main means of remote configurations

## Tailscale

VPN which that-just-works™️.

I have my MacBook Air , Matebook D and phone all the same tailnet, which acts my secure VPN.

## Jellyfin

I went down some wrong turns trying to install jellyfin on Ubuntu. All you need to do its run:

```bash
curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash
```

Don't use `apt` , don't use the the Ubuntu store. It will give you a messed up installation and I lost many hours to this.

## Torrenting

installed [`qbittorrent-nox`](<https://github.com/qbittorrent/qBittorrent/wiki/Running-qBittorrent-without-X-server-(WebUI-only,-systemd-service-set-up,-Ubuntu-15.04-or-newer)>) which lets you run qbittorent in a headless mode, then connect to via web gui instead which means via tailscale I can remotely add magnet links and download my shows.

## Amazon Firestick

These lil things can run a Jellyfin client out-the-box. It's able to detect the instance of Jellyfin running on my local network without the need for Tailscale.
