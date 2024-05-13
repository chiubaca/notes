---
title: Full stack cloudflare with Astro.js
publish_date: 2024-04-29
last_updated: 2024-04-29
description: Exploring the ergonomics of what a a fullstack app using only cloudflare infra with Next.js looks like
status: draft
tags:
  - cloudflare
  - astro
---


[Full-stack deployment · Cloudflare Pages docs](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-nextjs-site/)

[Typesafe Database Queries With Drizzle and Cloudflare D1 (hrishikeshpathak.com)](https://hrishikeshpathak.com/blog/typesafe-database-queries-with-drizzle-and-cloudflare-d1/)


Setting up D1 with Drizzle

via CLI:
```bash
npx wrangler d1 create <DATABASE_NAME>
```

returns toml config which is placed in your `wrangler.toml` file. 

```
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "test-db"
database_id = "d61ce790-55fd-4ec1-8b43-7d3617742a82"
```


Alternative its via the Cloudflare workers dashbord`https://dash.cloudflare.com`


setup drizzle schema then setup script to generate

```json
{
    "scripts":{
        //...
        "generate": "drizzle-kit generate:sqlite --schema=./src/schema.ts",
        //...
    }
}
```

This creates SQL scripts to create the relevant tables. It does not execute it on the table. to do that we run:

```shell
npx wrangler d1 execute email-worker --local --file=./drizzle/<DRIZZLE-GENERATED-FILE>>.sql
```

We not have a fully setup D1 database running locally which we can access in next.js like so:

```tsx
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";

const DB = getRequestContext().env.APP_DB;
const db = drizzle(DB);


export default async function Page(){

  const todos = await db.select().from(todo);

  return(
    <>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </>
  )
}

```






my demos:
[fullstack-next-cloudflare.pages.dev](https://fullstack-next-cloudflare.pages.dev/)

[chiubaca/fullstack-next-cloudflare (github.com)](https://github.com/chiubaca/fullstack-next-cloudflare)




Problems 

cant seem instantiate cloudflare with `getRequestContext` in a way that doesnt make it crash with:
```
[Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.
```


example project here uses a third party lib to bind
[next-on-cloudflare-example/src/bindings.ts at main · Rei-x/next-on-cloudflare-example (github.com)](https://github.com/Rei-x/next-on-cloudflare-example/blob/main/src/bindings.ts)

Found this document hidden away [next-on-pages/packages/next-on-pages/docs/supported.md at main · cloudflare/next-on-pages (github.com)](https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/docs/supported.md). 
There are just too many gotchas to make next.js viable on on cloudlflare for now ... sad.....