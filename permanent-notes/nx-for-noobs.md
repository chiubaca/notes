---
title: nx for noobs
publish_date: 2023-01-11
last_updated: 2023-01-11
description: nx mono repos for noobs
status: draft
tags:
  - nx
---


We're using NX more at work; I initially didnt really _get it_ . I had the following pre-conceptions of nx before taking a deeper dive into it

- nx is only mean for really big teams 
- nx is only for complicated codebases
- nx shouldnt be used for smaller projects


I've come out the other end of my learnings to find all of the preconceptions to be false


--- Seting up a nx mono repo for chiubaca.com

npx create-nx-workspace

> `chiubaca-monorepo`


setting up chiubaca.com app 
```
npx nx generate @nx/js:library --name=chiubaca.com --unitTestRunner=none --directory=apps/chiubaca.com --projectNameAndRootFormat=as-provided --no-interactive 
```

key thing is to setup the `project.json` correctly which replaces command in package.json
```

{

  "name": "chiubaca.com",

  "$schema": "../../node_modules/nx/schemas/project-schema.json",

  "sourceRoot": "apps/chiubaca.com/src",

  "projectType": "application",

  "targets": {

    "build": {

      "executor": "nx:run-commands",

      "options": {

        "command": "npx astro --root apps/chiubaca.com build"

      }

    },

    "lint": {

      "executor": "nx:run-commands",

      "options": {

        "command": "npx astro --root apps/chiubaca.com check"

      }

    },

    "format": {

      "executor": "nx:run-commands",

      "options": {

        "command": "prettier --write ./apps/chiubaca.com check"

      }

    },

    "serve": {

      "executor": "nx:run-commands",

      "options": {

        "command": "npx astro --root apps/chiubaca.com dev"

      }

    }

  },

  "tags": []

}
```

setup eslint in the app [eslint-plugin-astro (ota-meshi.github.io)](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/)
still WIP...

I'm referring a lot to the [NX Mental Model | Nx](https://nx.dev/concepts/mental-model)

Nx has a clear structure that it  recommends [Applications and Libraries](https://nx.dev/concepts/more-concepts/applications-and-libraries) . This takes the overhead of think about  code organisation a lot easier. it also recommends an 80, 20 rule.  80 % of your logic should be in a lib and Apps should just be [containers for your lib](https://nx.dev/concepts/more-concepts/applications-and-libraries#mental-model)
