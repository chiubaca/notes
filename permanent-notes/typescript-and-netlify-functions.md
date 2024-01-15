---
title: TypeScript and Netlify Functions
publish_date: 2021-10-01
last_updated: 2024-01-15
description: How get betting typings with in netlify functions
status: live
tags:
  - typescript
  - serverless
  - netlify
---
**This blog out of date. Netlify has first class support for now TypeScript. Make sure to read  [Announcing native TypeScript support for Netlify Functions](https://www.netlify.com/blog/2021/04/19/announcing-native-typescript-support-for-netlify-functions/)**

Did you know that Netlify Functions are just using AWS Lambdas behind the scenes?

This means you can use the same type definitions available for aws-lambda for your Netlify functions too. Install the aws-lamda types by running the following.

```bash
npm install @types/aws-lambda --save-dev
```

You only need  to import the `APIGatewayProxyEvent`, `APIGatewayProxyCallback` types like so.

```ts
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";

export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  callback: APIGatewayProxyCallback
) {
  // Do some stuff here	
};
```

Note, there are no type declarations available for `context` as this includes properties and methods specific to Netlify such as [Netlify Identity](https://docs.netlify.com/functions/functions-and-identity/#access-identity-info-via-clientcontext) .  

However, having auto completion for `event` alone makes this hugely useful!

I'm putting together some TypeScript Netlify Functions examples over at this [repo](https://github.com/chiubaca/typescript-netlify-functions-starter). Feel free to give it a star if you find it helpful.