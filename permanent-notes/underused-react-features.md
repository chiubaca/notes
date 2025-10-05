---
title: Underused React features
publish_date: 2025-09-26
last_updated: 2025-09-26
description: Notes for my React Adavanced lightning talk
status: draft
tags:
---
React 19 was released on **December 5, 2024** . It in my opinion was one of the most exciting release React have done since React 16 whem they released hooks.

- https://react.dev/blog/2024/12/05/react-19

A lot of new hooks were released and I realised not many people are that aware of them or reach for them day-to-day.

Here a unexhaustive look at some of the features I think you should use more.

## `useTransition`

a hook to mark some state setting as a low priority, this allows react to update state in CPU cycle that doesnt block UI interation. really useful if some interaction is computationally expensive or take a some time to complete.

Classic example is submitting a form which take a while to complete, without `useTransition` you often have to track an extra peice of state for the pending state:

```jsx
"use client";

import { useState } from "react";

function Page() {
  const [apiData, setApiData] = useState("");
  const [isPending, setIsPending] = useState(false);

  const getDataFromApi = async () => {
    setIsPending(true);
    const data = await yourApi();
    setApiData(data);
    setIsPending(false);
  };

  return (
    <>
      <button onClick={getDataFromApi}> Submit </button>

      {isPending ? "ispending.." : apiData}
    </>
  );
}

```


using `useTransition` the pending state will be managed for you.

```jsx
function Page() {
  const [apiData, setApiData] = useState("");
  const [isPending, startTransition] = useTransition();

  const getDataFromApi = async () => {
    startTransition(async () => {
      const data = await yourApi();
      setApiData(data);
    });
  };

  return (
    <>
      <button onClick={getDataFromApi}> Submit </button>

      {isPending ? "ispending.." : apiData}
    </>
  );
}
```

>  Functions called in `startTransition` are called “Actions”.[](https://react.dev/reference/react/useTransition#functions-called-in-starttransition-are-called-actions "Link for this heading") The function passed to `startTransition` is called an “Action”. By convention, any callback called inside `startTransition` (such as a callback prop) should be named `action` or include the “Action” suffix:


- https://react.dev/reference/react/useTransition
  
  

## `useActionState` & form actions
 - https://react.dev/reference/react/useActionState

Many react devs have gotten used to write form submissions like so:

```jsx
"use client";

import { useState } from "react";

export default function Page() {
  const [state, setState] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");

    // Update state with new message
    setState((previousState) => [...previousState, message]);

    // Reset form
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="message" placeholder="Hello!" />
      <button type="submit">Send</button>
      {state.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </form>
  );
}

```

with `useStateAction` this logic becomes a lot cleaner

```jsx
"use client";

import { useActionState } from "react";

async function action(previousState: string[], formData: FormData) {
  const message = formData.get("message") as string;

  return [...previousState, message];
}

export default function Page() {
  const [state, formAction] = useActionState(action, []);

  return (
    <form action={formAction}>
      <input type="text" name="message" placeholder="Hello!" />

      <button type="submit">Send</button>

      {state.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </form>
  );
}

```


Whats more, if your form need to handle an async operation, react has already wrapped this call in `startTransition` and exposed an `isPending` value in the hook for you

```jsx
"use client";

import { api } from "@/api";
import { useActionState } from "react";

async function action(previousState: string[], formData: FormData) {
  const message = formData.get("message") as string;

  const data = await api.submitMessage(message);

  return [...previousState, data];
}

export default function Page() {
  const [state, formAction, isPending] = useActionState(action, []);

  return (
    <form action={formAction}>
      <input type="text" name="message" placeholder="Hello!" />

      <button type="submit" disabled={isPending}>
        {isPending ? "submitting..." : "submit"}
      </button>

      {state.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </form>
  );
}

```

If you're using Next.js another neat thing about this is you can add a `use server` directive and the function will be run server-side


heres what the equivalent code might looks like when wrangling it together with `useState`

```jsx
"use client";

import { api } from "@/api";
import { useState } from "react";

export default function Page() {
  const [state, setState] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    try {
      const data = await api.submitMessage(message);
      setState((prev) => [...prev, data]);
      event.currentTarget.reset();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="message" placeholder="Hello!" />

      <button type="submit" disabled={isPending}>
        {isPending ? "submitting..." : "submit"}
      </button>

      {state.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </form>
  );
}

```


# `useOptimistic`

- https://react.dev/reference/react/useOptimistic
Building on the last three hooks, React lets you show state whilst an action is underway. a.k.a optimisitic UI

this is what the hook looks like:
```jsx
const [optimisticState, addOptimistic] = useOptimistic(    
    state,    // updateFn    
    (currentState, optimisticValue) => {      
        // write your own cutom logic to 
        // merge and return new state with optimistic value
    }
);
```

the provides a getter and setter very similar to `useState`. The main difference is that the optimisticState getter handles the removal of any state if an action was not successful. 

it simply just need you to provide the state it needs to track, and custom callback which handles merge the current state with an optimistic value. for example for an array of string you would need to spread the current state into and an array and append the the optimistic state, this logic depends on your data structures.

The optimistic state will only show this version of the optisitc state when it is in a transitioning state. when an action is complete it will fallback to current state provided to it in the first argument.


an example:
```tsx
"use client";

import { useOptimistic, useState, useRef, startTransition } from "react";
import { api } from "@/api";

type Message = {
  text: string;
  sending: boolean;
  key?: number;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isError, setIsError] = useState(false);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages: Message[], newMessage: string) => [
      ...currentMessages,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  async function formAction(formData: FormData) {
    try {
      const message = formData.get("message") as string;
      addOptimisticMessage(message);
      const submittedMessage = await api.submitMessage(message);
      setMessages([
        ...messages,
        { text: submittedMessage, sending: false, key: Date.now() },
      ]);
    } catch (error) {
      setIsError(true);
    }
  }

  return (
    <div>
      <form className="flex" action={formAction}>
        <input
          className="input"
          type="text"
          name="message"
          placeholder="Add a message"
        />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      {isError && <Toast />}
    </div>
  );
}

const Toast = () => {
  return (
    <div className="toast toast-bottom toast-end">
      <div className="alert alert-error">
        <span>failed to send</span>
      </div>
    </div>
  );
};


```


To this type of logic without `useOptimistic` it would be quite a bit more complicated you would have track a temporary peice and remove that item from state upon an error condition remove the state was added.

## `use`

`use` is a React API that lets you read the value of a resource .

But what is a resource? Current `use` supports reading either a  [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or a React [context](https://react.dev/learn/passing-data-deeply-with-context). Maybe more coming soon? Just a prediction.





### `useSyncExternalStore`
 - https://swizec.com/blog/you-may-be-looking-for-a-useSyncExternalStore/?utm_source=cassidoo&utm_medium=email&utm_campaign=i-recommend-the-freedom-that-comes-from-asking