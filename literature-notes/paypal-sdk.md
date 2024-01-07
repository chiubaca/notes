---
title: paypal-sdk
publish_date: 2022-04-23
last_updated: 2022-04-23
description: Notes on using the PayPal SDK
tags:
  - paypal
  - javascript
---

- There are quite a few different layers to the PayPal SDK

	- The core interface is the [PayPal REST API](https://developer.paypal.com/api/rest/)

	 - PayPal have a [JavaScript SDK](https://developer.paypal.com/sdk/js/) which provides a wrapper over the REST API.
		 - This wrapper also provides UI for PayPal checkout buttons and, hosted fields for users to supply their debit/credit card details
		 
	> 	The core PayPal JS SDK package can not be downloaded from NPM, it has to be included as a `script` tag in your web app. This is mainly for [security purposes](https://developer.paypal.com/sdk/js/performance/#load-the-javascript-sdk-from-the-paypal-server)
	 
	- There are some performance challenges to loading the PayPal JavaScript SDK in a non-blocking way for websites. Though the docs, do provide some [strategies to optimise the loading of the script](https://developer.paypal.com/sdk/js/performance/#link-delayedrender) . These implementations can be error prone. Therefore PayPal also provide [paypal-js](https://www.npmjs.com/package/@paypal/paypal-js) . This is a PayPal helper utility which helps load the PayPal JS SDK in an optimal way and provides, namespace to render the PayPal UI elements.

		This utility simply needs a [config object](https://developer.paypal.com/sdk/js/configuration/) and it handles the hard work of injecting the PayPal JS SDK script efficiently.
	
	> Note:  use `client-id=sb` to use the PayPal sandbox mode
		
	- [react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js) is a wrapper for `payPal-js` , which provides a react `PayPalScriptProvider` and react components for PayPal UI and also some hooks for tapping into the script state. This provides a much more idiomatic react interface to work with. 



## Sandbox environment
- if you have signed up to developers.paypal.com using your **personal** account, this will only let you use the PayPal SDK in **sandbox** mode.
- You need a PayPal business account to use the the **live** mode of the SDK. In theory, all you need to do is swap your `client-id` to a production id everything should work as expected.

 ### Using Sandbox users

- Sandbox users are found under https://developer.paypal.com/developer/applications , after you have created an app.

	- By default PayPal creates a fake personal and business account at https://developer.paypal.com/developer/accounts.
		-  The personal account is the fake buyer
		- the business account is the your fake merchant account receiving the fake money

	- The password can found by clicking the `...` next to the user account, `View/edit account` , `System Generated Password:` .

- Login with your fake PayPal user at https://www.sandbox.paypal.com/
