---
title: Total Typescript notes
publish_date: 2023-05-18
last_updated: 2023-05-18
description: Notes from https://www.totaltypescript.com
tags:
  - typescript
---


## React with Typescript

### Intro notes
- JSX TS errors probably solved by tsconfig. `"jsx": "preserve"`
- React types come from `@types/react`


### Component notes

- The React lib comes with `ComponentProps` which are type helpers that let you quickly define the type of a component have all existing props of native elements like a `<button>` . 

```jsx
import React , { ComponentProps } from "react";

export const Button ({...rest}): ComponentProps<"button"> = ()=> {
	return (
		<button {...rest}/>
	)
}

```

- this example we've  spread all props from available for a button element into our own custom Button component, we could extend this component further with custom props if we wished to.

- Sometimes you may want to update the the interface of ComponentProps. To do this, you firstly need to `Omit<>` the key and then extend the type using the  TS `&` operator.

- `React.ComponentProps` can return back the props a component expects as a interface . 

```ts
type AnyCompProps = React.ComponentProps<typeof AnyComp>
```
https://stackoverflow.com/a/55220191

### Hooks notes

TIL:  useState can also take a callback function that contains the current state
```jsx
<div onClick={() => {

setState((currentState) => ({
	...currentState,
	newKey: 123,
}))/>;
```
