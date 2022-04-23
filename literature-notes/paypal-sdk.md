---
title: paypal-sdk
publish_date: 20220423
last_updated: 20220423
description: Notes on using the PayPal SDK
layout: ../../layouts/LiteratureNoteLayout.astro
---

- There are quite a few different layers to the PayPal SDK

	- The core interface is the [PayPal REST API](https://developer.paypal.com/api/rest/)

	 - PayPal have a [JavaScript SDK](https://developer.paypal.com/sdk/js/) which provides a wrapper over the REST API.
		 - This wrapper also provides UI for PayPal checkout buttons and, hosted fields for users to supply their debit/credit card details
		 
	> 	The core PayPal JS SDK package can not be downloaded from NPM, it has to be included as a `script` tag in your web app. This is mainly for [security purposes](https://developer.paypal.com/sdk/js/performance/#load-the-javascript-sdk-from-the-paypal-server)
	 
	- There are some performance challenges to loading the PayPal JavaScript SDK in a non-blocking way for websites. Though the docs, do provide some [strategies to optimise the loading of the script](https://developer.paypal.com/sdk/js/performance/#link-delayedrender) . These implementations can be error prone. Therefore PayPal also provide [paypal-js](https://www.npmjs.com/package/@paypal/paypal-js) . This is a PayPal helper utility which helps load the PayPal JS SDK in an optimal way and provides, namespace to render the PayPal UI elements.

		This utility simply needs a [config object](https://developer.paypal.com/sdk/js/configuration/) and it handles the hard work of injecting the PayPal JS SDK script effciently.
	
	> Note:  use `client-id=sb` to use the PayPal sandbox mode
		
	- [react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js) is a wrapper for `payPal-js` , which provides a react `PayPalScriptProvider` and react components for PayPal UI and also some hooks for tapping into the script state. This provides a much more idiomatic react interface to work with. 
