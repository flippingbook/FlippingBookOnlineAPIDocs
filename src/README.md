---
actionText: FlippingBook Public API Documentation
actionLink: /
title: FlippingBook Public APIs Documentation
description: Welcome to the FlippingBook Public APIs Documentation
---
Welcome to the FlippingBook Public APIs documentation
=====================================================

FlippingBook public APIs allow you to use FlippingBook's online services from your applications.

Start with reading [General Information](/general/) section to learn about how our APIs are organized and some common concepts.

Continue with product-specific APIs:
- [Key Management API](/auth/)
- [FlippingBook Online API](/fbonline/)

# FlippingBook Public APIs General Information

There are several Public APIs available to your applications. They are all available via our single-host API gateway `https://api-tc.is.flippingbook.com/`. All APIs require proper [authentication/authorization](/general/authentication) in order to be used. Almost all APIs share the same [error reporting convention](/general/error-handling).

While using APIs you should keep in mind that there are certain [limitations](/general/limitations) and it may be [changed in the future](/general/change-policy).

API requests and responses must be in UTF-8 encoded JSON format regardless of request's `Content-Type`, `Accept-Charset` and `Accept` HTTP headers. Requests may be in 'relaxed' JSON format, so single quotes may be used and property names are not required to be quoted. On the response side there would always be `Content-Type: application/json` header and JSON format will strictly follow the standard.

