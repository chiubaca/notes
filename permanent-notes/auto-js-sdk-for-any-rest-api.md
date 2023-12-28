---
title: Create an auto-generated JS client for any REST api
publish_date: '2022-06-12'
last_updated: 20220612
description: Quick walk through of how to use openapi-client-axios
status: draft
---


 [openapi-client-axios](https://github.com/anttiviljami/openapi-client-axios/blob/master/packages/openapi-client-axios/README.md) is an NPM package which can create a JS client for open OpenAPI enabled APIs. 

This is extremely useful for interacting with services which do not provide an out of the box JS SDK. For example I'm working with Printful which is  doesn't provide any language specific SDKs out-the-box. However their REST API complies with the OpenAPI standard which means it will work perfectly with open `openapi-client-axios` .  Here's how I was able to use it.



Firstly we need to install `openapi-client-axios`  into our project using :

```bash
npm install --save axios openapi-client-axios
```

Or with Yarn:

```bash
yarn add axios openapi-client-axios
```

Now we can create a utility which configures the client use printfuls rest api. To do this I like to organise my files like so `src/lib/printful/printfulClient.ts`  . Yes I'm using TypeScript, however this will work with plain `.js` too.

inside `printfulClient.ts` we can configure out client like so:

```ts
import OpenAPIClientAxios from "openapi-client-axios";

export const printfulClient = () => {

	const api = new OpenAPIClientAxios({
		definition: "src/lib/printful/open-api.json",
	});
	  
	const client = api.initSync();
	
	return client;
};

```

The `OpenAPIClientAxios` class requires parameter object, the minium it needs is for the `definition` property to be populated with a valid path to a valid open-api schema object. The  documentation for all valid parameter can be found [here](https://github.com/anttiviljami/openapi-client-axios/blob/master/DOCS.md#parameter-opts).

Note i've configured the `definition` parameter to point to a `open-api.json`  which is co-located with my `printfulClient.ts` file. I have pre-downloaded Printfuls open api spec [here](blob:https://developers.printful.com/102d71b9-2e81-41f7-adb5-1cb12b4533b9).


Related Note: 
- [20220612](../fleeting-notes/20220612.md)

