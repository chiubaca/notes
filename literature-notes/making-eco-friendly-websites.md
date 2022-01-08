---
title: consuming-less-javascript-in-our-frontends
publish_date: 20211226
last_updated: 20220107
description: Consuming less JavaScript in our frontend applications
layout: ../../layouts/LiteratureNoteLayout.astro
---


# The problem

>The internet currently produces approximately 3.8% of global carbon emissions, which are rising in line with our hunger to consume more data. Increasingly, web technologies are also being used to sow discontent, erode privacy, prompt unethical decisions, and, in some countries, undermine personal freedoms and the well-being of society. - https://sustainablewebdesign.org/
 
 *_facebook ahem_*

The average web page size now stands at [around 2MB](https://httparchive.org/reports/page-weight). 

Large bloated websites will generally lead to poor performance for users on slower connections and use more CPU and energy which is bad for the environment. Therefore anything we can do to try and reduce our website size will be beneficial for the environment.

> According to online carbon calculator Website Carbon, the average website produces 1.76g of CO2 for every page view; so a site with 100,000 page views per month emits 2,112kg of CO2 every year. - https://www.wired.co.uk/article/internet-carbon-footprint

The more complex a website is, the more energy it requires to load – and the greater its climate impact.


# Strategies for making more environmentally friendly sites

These are ordered in highest impact

## Use a green host

> According to Greenwood, one of the most effective ways to reduce a website’s carbon footprint is to switch to a green web host - https://www.wired.co.uk/article/internet-carbon-footprint

Green hosts are hosting company whose operations are powered by renewable energy

A couple which I have found:
- https://www.greengeeks.com/
- https://www.greenwebhost.net/
- https://www.a2hosting.com/
- https://www.hostpapa.com/green-web-hosting/

Unfortunately green hosting still seems like it quite a niche. We also would lose the ergonomics of hosting on AWS, something we would have to weight up.

Though AWS have made pretty bold claims they are working to towards powering all their operations to 100% renewable energy by 2025. 
> - https://sustainability.aboutamazon.com/environment/the-cloud?energyType=true

This may or may not be  a marketing ploy, I guess we just have to watch this space .

## Be smarter with images

Byte-for-byte , images are the single largest contributors to page weight. Here are a list of sub strategies for optimizing our sites images.

### 1. SVGs over Raster images 

For simple illustrations, SVGs should be favored over raster images e.g JPEG, PNG and GIF . 1. SVGs just scale better and look sharper on all resolutions due to fact their vector based. 
 
 Bonus: optimise your SVGs with https://jakearchibald.github.io/svgomg/ 
 
 ### 2.Optimise your images
 
 Sometimes we _have_ to use raster image such as when it's a photo.
 
 https://squoosh.app/ is a amazing tool built by the same person as SVGOMG.
 
 There is also a CLI, so in theory we could automate it's process https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli
 
 New picture formats such as `avif` and `webp` can be dramatically smaller than `jpegs` and `pngs` but they're not supported on browsers.
 
 This is how you can progressively enhance out sites for new formats, if the clients browser does not support it :
 
 ```html
<picture>
 <source srcset="img/photo.avif" type="image/avif">
 <source srcset="img/photo.webp" type="image/webp">
 <img src="img/photo.jpg" alt="Description" width="360" height="240">
</picture>
```
 - https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#progressive-enhancement
 
 
  ### 3.Lazy load images
 
 i.e only download the image when it comes into view https://web.dev/lazy-loading-images/.  The `loading` attribute is supported out the box on all modern browsers and even works on `iframes` . 
 
```html
<img src="image.jpg" alt="..." loading="lazy">
<iframe src="video-player.html" title="..." loading="lazy"></iframe>
```
> https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading
> https://caniuse.com/?search=lazy

Worth noting, we could also achieve a similar effect using JS using the browsers [`IntersectionObserver`](https://developers.google.com/web/updates/2016/04/intersectionobserver) API.

 
 ### 4. `next/image`
 All the above is actually quite a lot of work. So big shout out to  `next/image` which does all the above auto-magically for you! we're using this for Penso.  With great results
 ![](Pasted%20image%2020220106182550.png)

## Less JavaScript

This is slightly controversial as we are hired as Javascript developers. I guess what I really mean by this is to be smarter with Javascript.

The rise in website sizes is directly correlated to when client side rendering library like Angular, React  Vue started becoming very popular, roughly between 2010 until now. 

Fortunately this trend seems to be swinging back the other way and SSR techniques which PHP popularized  is starting to become more and more favorable. 

I really like this article titled  ' The Third Age of JavaScript'


- tree shaking

- server side rendering
	- server side components

- using smaller frameworks
	- preact
	- solid js

- new tech
	- Svelte
	- Astro

#  References

- [20211226](../fleeting-notes/20211226.md)
- https://sustainablewebdesign.org/
- https://css-tricks.com/reduce-your-websites-environmental-impact-with-a-carbon-budget/