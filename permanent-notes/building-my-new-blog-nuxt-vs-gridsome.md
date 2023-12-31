---
title: Building My New Blog | Nuxt Vs Gridsome
publish_date: 2021-01-17
last_updated: 2021-01-17
description: a comparison of building a blog with nuxt vs gridsome
status: live
tags:
  - vue
  - nuxt
  - gridsome
---
# 🥅 The Goal

I had three criteria's for my new blog :

1. I wanted to use [DEV.to](http://dev.to) as a CMS for my blog. 

2. I wanted my blog to be statically rendered for performance, SEO and to keep the cost of hosting free by hosting it on Netlify.

3. I had legacy blogs in markdown files which I wanted to host along with the rest of the blog. 

To achieve this, I experimented with both Nuxt and Gridsome. This is my experience with both frameworks.

# 🎬 Take 1 - Nuxt

First, addressing my old markdown blogs. Nuxt recently released the [content module](https://content.nuxtjs.org/) which was perfect for rendering my old markdown files into individual pages. 

To build the rest of the blog, Nuxt has a new [Full Static mode](https://nuxtjs.org/blog/going-full-static) which was released in version 2.14.0.

This mode used in conjunction with Nuxt's `asyncData` hook means it is possible to fetch all [DEV.to](http://dev.to) blogs post via the [DEV.to](http://dev.to) API at build time. When we run `npm run generate` to build the blog, Nuxt auto-magically pre-renders each page of your Nuxt site into static HTML pages. 

How this works at high level. In my [`.src/pages/index.vue`](https://github.com/chiubaca/chiubaca.com/blob/nuxt/pages/index.vue) file, the home page of the blog, I fetch a list of all published posts from the DEV.to API using the [`/articles/me`](https://docs.dev.to/api/index.html#operation/getUserArticles) endpoint. This data fetching is done within the `asyncData` hook and this endpoint returns an array of your published posts. With the data retrieved, I list each of the posts, and link to a new page by making use of the `<nuxt-link>` router component. I re-use the DEV.to post slug for the sub-paths of each of the blogs, like so:

```html
<div v-for="(post, index) in posts" :key="index">
	<nuxt-link :to="`/${post.slug}`">{{ post.title}}</nuxt-link>
</div>
```

Nuxt handles routing based on the file structure of your `pages` directory, so by creating a `_slug.vue` file relative to where the `index.vue` file is. Nuxt knows that this will be the template for any sub paths off that page. 

Within `_slug.vue`,  we make use of `asyncData` lifecycle hook again to make another call to the DEV.to API, which will retrieve the specific blog based on the slug using the [`/articles/{username}/{slug}`](https://dev.to/api/articles/%7Busername%7D/%7Bslug%7D) endpoint. This returns an object of the specific post and one of the properties is `body_markdown`. This is the raw markdown of your Dev.to post. Converting this to HTML and making it look nice is another challenge within itself, but once done you can render this directly in the Vue template using Vue's `v-html` directive. You can see how I did it [here](https://github.com/chiubaca/chiubaca.com/blob/nuxt/pages/wip/_slug.vue) (warning very messy code!!).

> What's key here is that when building this application in static mode, Nuxt will perform all the actions in the `asyncData` hook at *build* time!

Although I was happy with the end result. I realised there is a lot of logic in the `asyncData` lifecycle hook. Data fetching, markdown parsing and potentially extra data cleaning logic which I would need to implement later. I also had plans to extend the data fetching to alternative sources such as other Forem sites, Medium and GitHub. I felt like this could get pretty unwieldy if I didn't adopt a nice pattern. This is what lead me to Gridsome.

# 🎬 Take 2 - Gridsome

The main selling point of Gridsome is the GraphQL data layer. Gridsome provides a simple API to import data from any external source into a data layer. This normalises all your content into a user-friendly GraphQL API. 

Also, Gridsome has a growing number of source plug-ins which are helpers to pull data from an external source and import it into the GraphQL data layer. 

To read in my old markdown blogs I was able to make use of the [filesystem source plug-in](https://gridsome.org/plugins/@gridsome/source-filesystem). This allows me to create pages for each of my old markdown blog with minimal effort.

Next was to connect Gridsome to DEV.to. There were already plug-ins for this but I decided to [hand roll my own](https://github.com/chiubaca/gridsome-source-devto) as a learning exercise 🤓.

I was able to copy most of my data fetching logic from the Nuxt version of my blog, but I had to write some additional code to import the DEV.to posts into GraphQL using Gridsome's [Data Store API](https://gridsome.org/docs/data-store-api/). You can see how I did this [here](https://github.com/chiubaca/gridsome-source-devto/blob/83efc3cc4e3347ce8af82ea89ec442ae76a88589/index.js#L97).

Once all my [DEV.to](http://dev.to) blogs are loaded in the data layer we can work with this data in any `.vue` file in the Gridsome project via the `<page-query>` or `<static-query>` blocks. Within this block, you can write a GraphQL query and the result is exposed in your `<template>` via the `$page` object.  The [Gridsome docs explain this a lot better!](https://gridsome.org/docs/querying-data/)

Similar to Nuxt, Gridsome also has a `./src/pages/` directory and also it's own router component, `g-link`. This is how you list the titles of all your [DEV.to](http://dev.to) posts and link to them:

```html
<template>
    <div v-for="blog in $page.articles.edges":key="blog.node.id">
	 <g-link :to="blog.node.slug">{{ blog.node.title }}</g-link>
    </div>
</template>

<page-query>
  query {
    articles: allDevToArticles{
      edges {
        node{
          title
          slug
        }
      }
    }
  }
</page-query>
```

Whereas Nuxt crawls your entire application to figure which pages it needs to generate. Gridsome is smart enough to generate a page for each node in for all your GraphQL collections*.

> *The aggregation of all Dev.to blogs in the Gridsome data layer,  is referred to as a "collection" each blog is referred to as a "node".

To work with these pages we create a `.vue` file in the `./templates` directory in the Gridsome project. This is the equivalent of the `_slug.vue` file in the Nuxt version of the blog. 

The name of this template file should be the same as the collection name. Though this can be configured to your liking in `gridsome.config.js`. 

With that setup, I now had parity between both Nuxt and Gridsome implementations of my blog.  

---
# Closing Thoughts

## Why I Chose Gridsome Over Nuxt

Overall I felt like the architecture for Gridsome was much better suited for my blog. I liked that there is a separation of concerns with data fetching. All of this logic was contained in my Dev.to source plug-in. This meant I only needed to focus on the organisation of pages and design in the Gridsome codebase.

## Nuxt Is Still Great

- I think Nuxt is perfect for more complex Vue applications.
- There was nothing wrong with having too much logic in the `asyncData` hook. This was just a personal opinion.
- If you are only working with markdown files for your blog, the content module is perfect!

# Cons of Gridsome

- It's still not at a 1.0 release.
- Development doesn't seem to be as active as Nuxt.
- Developer experience improvements on the `<page-query>` and `<static-query>` blocks. Is it possible to have GraphQL autocompletion somehow?
- More documentation for plug-ins. Creating a source plug-in was a good experience, but I had difficulty understanding how to use transformer plug-ins

---
This was a quick comparison between two great Vue.js meta frameworks. Are you planning to work with Nuxt or Gridsome any time soon? Let me know.

If you're reading this on DEV.to, you check out my new blog site here 👇

✨ [chiubaca.com](http://chiubaca.com) ✨