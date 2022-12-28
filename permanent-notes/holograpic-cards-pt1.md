---
title: Holograpic cards pt1
publish_date: 20221229
last_updated: 20221229
description: Creating holograpics cards with css and sprinkle of js
status: draft
layout: ../../layouts/PermanentNoteLayout.astro
---

## Intro

inspired by [3d pokemon cards with css](https://deck-24abcd.netlify.app/) &  [tutorial for the same effect](https://twitter.com/akella/status/1584473504975446016?s=20&t=2l6I8nucAA3OYEAPHUHTPg)



## The spotlight effect

The effect is extremely subtle when you interact with these 3D cards. it mimics the reflection of a light source shining down on the card. This effect adds that extra level of realism to your 3D card. 


Here's the effect that w're going to produce:
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWBwQLe" data-user="chiubaca" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chiubaca/pen/MWBwQLe">
  Holographic cards | Spot light effect</a> by Alex Chiu (<a href="https://codepen.io/chiubaca">@chiubaca</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Let's break this down, line by line.

### The HTML
```html
<div class='card'>
  <div class="card__softlight"></div>
</div>
```

The  `.card`  is our container element which defines the element dimension and houses the inner element.

The spotlight effect is all achieved with the `.card__softlight` class.


### The CSS


```css
.card {
  position: relative;
  height: 500px;
  width: 900px;
  background: grey;
}

.card__softlight {
  position: absolute;
  inset:0;
  mix-blend-mode: soft-light;
  background: radial-gradient(farthest-corner circle at var(--x, 10%) var(--y, 10%),
    rgba(255, 255, 255, 0.8) 10%,
    rgba(255, 255, 255, 0.65) 20%,
    rgba(255, 255, 255, 0) 90%);
  }
}

```


Some basic stuff in the `card` class. As the children element will be `absolute` positioned we need to remember to add `position: relative`  so all children elements are contained relative to this element.


Moving into `.card__softlight`. we use `inset: 0` make this inner div "fill up" to the parent container. it's the equivalent to :
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


The final bit of magic is   `mix-blend-mode: soft-light`  we will make heavy use of `mix-blend-mode` through this tutorial series. This property will literally blend the radial background into the other elements. it is key to making the spotlight effect feel "softer"

> try removing this property and experimenting with other blend values e.g `multiply`, `hard-light` or `difference`.


## the javascript

With our css variables in place, we can programmatically update the x and y positions of the radial gradient.

Firstly, we need to tap into the mouse move events to get the position of the mouse when we hover over our `card`.  We can do so like this: 
```js

const card = document.querySelector(".card");

card.addEventListener("mousemove", (e) => {
	console.log(e.clientX , e.clientY) //130 30  
});

```


We have a problem though, the values returned from `e.`clientX and `e.clientY` are pixel positions of where the cursor is on the screen.

![](Pasted%20image%2020221228123653.png)


We want relative units within the card element itself like so:
![](Pasted%20image%2020221228124058.png)


To achieve this we need the following things:

1. the size of the card element
2. the position of the element relative to the viewport.


fortunately, the browser DOM API provides everything we need within [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) . This metod which exist on any HTML element returns an object that looks something like:

```js
{
    "x": 8,
    "y": 8,
    "width": 900,
    "height": 500,
    "top": 8,
    "right": 908,
    "bottom": 508,
    "left": 8
}
```

We can now work out the relative unit of the cursor position within the `.card`  element with some [maths](https://byjus.com/maths/percentage/#:~:text=To%20determine%20the%20percentage%2C%20we,multiply%20the%20resultant%20by%20100.)!:

here's the logic we'll need to write:

- Minus the  card `left` position with the cursor `x` position (this gives us a corrected position value of 0 to the width of the card)
	-  Divide this value with the `cardWidth` (this converts the value into decimals between 0.0 - 1.0)
	- multiply by 100 (convert this figure into a percentage value)
	- 
- Minus the card `top` position with the cursor `y` position (this gives us a corrected position value of 0 to the height of the card)
	- then divide with the `cardHeight` (this converts the value into decimals between 0.0 - 1.0)
	- multiply by 100 (convert this figure into a percentage value)


Let's convert that pseudo logic into javascript:

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
 .document.documentElement.style.setProperty("--x", cardXPercentage);
  document.documentElement.style.setProperty("--y", cardYPercentage);
  
});

```


Note the last two lines is where the fun happens:

```js
 .document.documentElement.style.setProperty("--x", cardXPercentage);
  document.documentElement.style.setProperty("--y", cardYPercentage);
```

We set our percentage values to our CSS variable with [`CSSStyleDeclaration.setProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty).  

This how as we move our mouse, the radial gradient follows along 🙌.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWBwQLe" data-user="chiubaca" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chiubaca/pen/MWBwQLe">
  Holographic cards | Spot light effect</a> by Alex Chiu (<a href="https://codepen.io/chiubaca">@chiubaca</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>




References
-[20221227](../fleeting-notes/20221227.md)