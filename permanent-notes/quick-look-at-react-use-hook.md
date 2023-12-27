---
title: Easy React data fetching with `use()`
publish_date: 20230527
last_updated: 20230527
description: Quick looks at the new `use()` hook
status: draft
layout: ../../layouts/PermanentNoteLayout.astro
---

**NOTE: ** :  `React.use()` is still an unstable API. For more information check out the [support for promises React RFC](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md) . At the time of writing this, you can only test this API in Next.js 13.

OK with that disclaimer out the way, lets talk about how `use()` works . 

In short this new hook will you you run asynchronous code in your client side react components. You can think of it as the React version of `async` / `await`  .

To appreciate why it's going to be a game changer for client side data-fetching, lets compare the old-way of doing a client-side data fetch using `useEffect()` with `use()`.


```js
// returns an array of user objects e.g:
// [ {id:1 name: "Leanne Graham"}, {id:1 name: "Ervin Howell"}] 

export const fetchUsers = async () => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
	const json = await resp.json();
	return json; 
};

```

```jsx
'use client'

import { useState, useEffect } from "react";
import { fetchUsers } from "@/fetch-users";


export const OldDataFetchData = () => {

const [usersData, setUsersData] = useState(null);


useEffect(() => {
	if (!usersData) {
    const startFetchingData = async () => {
      const users = await fetchUsers();
      setUsersData(users);
    };
    
    startFetchingData();
  }

	}, [usersData]);

  

	if (!usersData) {
		return <>Loading...</>;
	}

	return (
		<>
			{usersData.map((u) => (
				<div key={u.id}>{u.name} </div>
			))}
		
		</>
	);

};

```

This is idiomatic code for most React developers. But for those less familiar with React and `useEffect` you may ask all sort of questions like:

 - Why cant the function you pass into `useEffect` be `async`?
 - Why cant whole React component be `async`?
 - Why do you need to check `userData` before calling `startFetchingData()`?

There are technical answers to all of these and this is not a `useEffect` tutorial so a quick response would just be - because, React. 😅

My point is, this is not intuitive code to read but most React developers, we have become accustomed to the rules and quirks of  `useEffect`. 

Now lets see how can re-write this with `use()` .

```jsx
'use client'

import { use } from "react";
import { fetchUsers } from "@/fetchUsers";

export const NewDataFetchData = () => {

const usersData = use(fetchUsers());

return (
	<>
		{usersData.map((u) => (
			<div key={u.id}>{u.name} </div>
		))}
	</>
);

};
```

Thats's it! 

Ok I lied.

A little bit more code is required If you want to handle a loading state.  In the parent server component that uses this client component, you can wrap it in `Suspense` which can accept a React component in its `fallback` prop.


```jsx
// ./app/page.jsx

import { Suspense } from "react";
import { NewDataFetchData } from "@/components/NewDataFetch";  

export default function Home() {
	return (
		<main>
		    <Suspense fallback={<>Loading...</>}>
				<NewDataFetchData />
			</Suspense>
		</main>
	);
}
```


Overall, much more elegant to read and write. 

An interesting property of the `use` hook is that it can be called conditionally 🤯. 

This is a big deal because we've traditionally never been able to use[ hooks conditionally](https://react.dev/warnings/invalid-hook-call-warning#breaking-rules-of-hooks). 

Here is the example of how this could look taken from the [rfc](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#example-use-in-client-components-and-hooks)

```jsx
function Note({id, shouldIncludeAuthor}) {
  const note = use(fetchNote(id));

  let byline = null;
  if (shouldIncludeAuthor) {
    const author = use(fetchNoteAuthor(note.authorId));
    byline = <h2>{author.displayName}</h2>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      {byline}
      <section>{note.body}</section>
    </div>
  );
}
```


---

I'm excited for this hook to become stable but I have mixed emotions. On one hand, the ergonomics of data fetching will be _so much_ better and we may no longer need to rely of a third party libaries like [TanStack query](https://tanstack.com/query/latest) . On the other hand, our mental model of hooks needs to adjust when using `use()` , maybe this is not a big deal but I can see being a point of confusion for beginner React devs.


