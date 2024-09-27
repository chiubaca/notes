---
title: Neovim for VSCode Users a cheat sheet
publish_date: 2024-09-25
last_updated: 2024-09-25
description: 
status: draft
tags:
  - neovim
---
## Prerequisites
- [LazyVim](https://www.lazyvim.org)

## Navigation 

### Finding Files
**vscode** - `cmd` + `p`
**neovim** - `/`

### Scrolling
**vscode** - mouse lol
**neovim**: 
  - `ctrl` + `u` / `d`
  - `j` / `k`

### Goto definition
**vscode** - `f12`
**neovim** - `gd`

### Back / Forward 
**vscode** -  ui back/ forward buttons
**neovim** - `ctrl` + `o` , `ctrl` + `o` 


## Close file
**vscode** -  `cmd` + `w`
**neovim** - `:bd` (buffer delete)

## Seach File
**vscode** -   double-tap word to select all ,   `cmd` + `f`
**neovim** -  `viw` (visual innner word) , `y` (yank) , `/` , `cmd` + `v`   (use `n` and `N` to navigate between matches)


## Seach Codebase
**vscode** -  `cmd` + `f`
**neovim** -  `viw` (visual innner word),  `space` , `/` , `cmd` + `v`


## Selecting blocks of text
vscode - mouse lol
neovim - 

## Refactoring

### Multicursor editing 

**vscode** - `cmd` + `opt` + `shift` +`up`/`down`

### Moving lines up and down

**vscode** - `opt` +`up`/`down`
**neovim** - 

### Commenting blocks of code

**vscode** - `cmd` + `/`
**neovim** - `gc` or `ctrl` + `.`
## Git

**vscode** - built in source control panel

**neovim**: lazgit?

## Nx

**vscode** - Nx extension

**neovim**: 
## Endpoint testing

**vscode** - Thunder client extension

**neovim**: 