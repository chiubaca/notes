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

---

## Images
- enable public access to your r2 bucket ( maybe work around this with signed urls?)
- enable transformation on your cloudflare domain name a.k.a zone
- forward your r2 images url into your transfomration zone via the [transform via url API](https://developers.cloudflare.com/images/transform-images/transform-via-url/)
- use this url with https://unpic.pics/img/react/ and we have extremlely optimised images on your website

