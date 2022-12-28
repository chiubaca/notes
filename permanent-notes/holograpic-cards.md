---
title: Holograpic cards
publish_date: 20221229
last_updated: 20221229
description: Creating holograpics cards with css and sprinkle of js
status: draft
layout: ../../layouts/PermanentNoteLayout.astro
---

## Intro

inspired by [3d pokemon cards with css](https://deck-24abcd.netlify.app/) &  [tutorial for the same effect](https://twitter.com/akella/status/1584473504975446016?s=20&t=2l6I8nucAA3OYEAPHUHTPg)



## Spot light effect


```html
<div class='card'>
  <div class="card__softlight"></div>
</div>
```


```css
.card {
  position:relative;
  height: 500px;
  width: 900px;
  background: grey;
}

.card__softlight {
  position: absolute;
  inset:0;
  background: radial-gradient(farthest-corner circle at var(--x, 10%) var(--y, 10%),
    rgba(255, 255, 255, 0.8) 10%,
    rgba(255, 255, 255, 0.65) 20%,
    rgba(255, 255, 255, 0) 90%);
  }
}

```

line by line break down. The  `.card`  is our container element which houses the inner elements with size.

the spotlight effect is all achieved with the `.card__softlight` class.

`inset: 0` make this inner div "fill up" to the parent containers. it's the equivalent to :
```css
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

```


There are a few things happening in the `background` property. We're using the `radial-gradient` function to create a circular pattern with a subtle white glow effect. 
if you want to see the radial gradient effect a bit clearer you can try swapping it for

```css
  background: radial-gradient( circle farthest-side at var(--x, 0%) var(--y, 10%), red 10%, green 20%, blue 80%);
```

Lets take a deep dive into the `radial-gradient` function. If you want to skip the next section is *NEXT-SECTION* .

MDN documents the `radial-gradient` function like so:
```

radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )  

```

`<ending-shape>` - can either be `circle` or `elipse`, `elipse` is basically just a stretched circle to match the aspect ratio of the element it's in. For our spotlight effect, we want to ensure the radial gradient is always a `circle`. 

> try swapping `circle` for `elipse` to see how the radial gradient skews.


`<size>` - has four options [documented here](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient#values) 
   - `closest-side`
   - `closest-corner`
   - `farthest-side`
   - `farthest-corner` - default

This means we can omit `farthest-corner` and it would still function the same. i've kept it for explicitness. 

> try swapping `farthest-corner` for one of the other options. Maybe you think a different one looks better. it's completely subjective!

[`<position>`](https://developer.mozilla.org/en-US/docs/Web/CSS/position_value) - defaults to `center` but supports an `x` and `y` positions.  Note, for this arguiment we'e using  `var(--x, 10%)`  and  `var(--y, 10%)`. We're using CSS variables, the second argument in a CSS variable is the fallback value if either `--x` or `--y` has not been set yet. In a mo we will set `--x` and `--y` dynamically using javascript!



## the javascript

With our css variables in place, we can programmatically update the x and y positions of the radial gradient with javascript. To do this we need to do some basic maths 

Firstly we want to figure out 

1. We can get the width and height of the card element like so:
```js

const card = document.querySelector(".card");

card.addEventListener("mousemove", (e) => {
	console.log(e.clientX , e.clientY)  
});

```


We have a problem though, the values returned from `e.`clientX and `e.clientY` are pixel positions of where the cursor is on the screen.

![](Pasted%20image%2020221228123653.png)


We want relative unit within the card element itself like so:
![](Pasted%20image%2020221228124058.png)


To acheive this we need a the following things:

1. the size of the card element
2. the position of the element relative to the viewport.


fortunately, the browser DOM API provides everything we need within [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

We can now work out the relative unit of the cursor position within the `.card`  element with some [maths](https://byjus.com/maths/percentage/#:~:text=To%20determine%20the%20percentage%2C%20we,multiply%20the%20resultant%20by%20100.)!:

```js

const card = document.querySelector(".card");

const {
  width: cardWidth,
  height: cardHeight,
  left: cardLeft,
  top: cardTop
} = card.getBoundingClientRect();

console.log(cardWidth, cardHeight, cardLeft, cardTop);

card.addEventListener("mousemove", (e) => {
  let X = (e.clientX - cardLeft) / cardWidth;
  let Y = (e.clientY - cardTop) / cardHeight;

  let cardXPercentage = `${X * 100}%`;
  let cardYPercentage = `${Y * 100}%`;

  console.log(cardXPercentage, cardYPercentage); // e.g "50%" "50%"
});

```


Rather than logging this out we can now, now set this value to our CSS variable with [`CSSStyleDeclaration.setProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty). This is where the fun begins. the final JS looks like this:


<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWBwQLe" data-user="chiubaca" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chiubaca/pen/MWBwQLe">
  Holographic cards | Spot light effect</a> by Alex Chiu (<a href="https://codepen.io/chiubaca">@chiubaca</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


we also need to know where the `.card` element is positioned on the screen so we can




```js
const card = document.querySelector(".card");

const cardWidth = card.clientWidth;
const cardHeight = card.clientHeight;
const cardBounds = card.getBoundingClientRect();

card.addEventListener("mousemove", (e) => {
  let X = (e.clientX - cardBounds.left) / cardWidth;
  let Y = (e.clientY - cardBounds.top) / cardHeight ;

  let cardXPercentage = `${X* 100}%`
  let cardYPercentage = `${Y* 100}%`
  
  console.log(cardXPercentage, cardYPercentage)
  
  
});


```

To understand this code we need to understand what we're trying to do. 

We want to update the spoti

References
-[20221227](../fleeting-notes/20221227.md)