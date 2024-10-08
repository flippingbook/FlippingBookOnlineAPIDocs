---
actionText: FlippingBook APIs documentation
actionLink: /
title: FlippingBook APIs documentation
description: FlippingBook APIs documentation
---
# FlippingBook APIs documentation

Welcome to the FlippingBook API's specification. 

This page lists the reference documentation for [FlippingBook](https://flippingbook.com/) APIs. The first section, [General Information](#flippingbook-public-apis-general-information), is about the common concepts of our APIs and their structure. The other two sections, [Key Management API](#key-management-api) and [FlippingBook Online API](#flippingbook-online-api), provide product-specific information.

FlippingBook Online is a service that converts PDFs into interactive digital documents.

## FlippingBook Public APIs: General Information

There are several Public APIs available for your applications. They can all be accessed via our single-host API gateway `https://api-tc.is.flippingbook.com/`. All APIs require proper [authentication/authorization](#authentication) to be used. Almost all APIs share the same [error reporting convention](#handling-errors).

While using APIs, you should keep in mind that there are certain [limitations](#api-usage-limits), and there may be changes to the version you have now in line with the [Changes Policy](#api-changes-policy).

API requests and responses must be in a UTF-8 encoded JSON format, regardless of the request's `Content-Type`, `Accept-Charset`, and `Accept` HTTP headers. Requests may also be in a 'relaxed' JSON format: you can use single quotes for strings, and you don’t need to quote property names. On the response side, there will always be `Content-Type: application/json` header, and the JSON format will strictly follow the standard.

### Authentication

#### Authentication Scheme
All publicly available APIs require your application to be authenticated and authorized to make API calls. Authentication is done with the HTTP bearer scheme, so all your requests (unless specified explicitly in the request description) should come with an `Authorization` HTTP header with the proper value:

```http request
GET /api/v1/auth/me HTTP/1.1
Host: api-tc.is.flippingbook.com
Authorization: Bearer <your API key>
```

### API Keys
To receive your first API key, please [contact our support team](https://flippingbook.com/contacts?contact-form=support). After that, you can create new keys yourself, following the instructions in [Key Management API](#create-a-new-api-key-for-your-account). You’ll also need the value of `AccessToken` property for it: to get it, log into your account and go to `https://logon.flippingbook.com/myaccesstoken`.

API keys are linked to your FlippingBook account, and all actions are recorded and audited. You can’t have more than 10 API keys per account.

### Handling Errors
#### General Rules
All API calls may return errors for your requests. We have a standardized error format for all responses unless stated explicitly in the API call description. All responses should follow this structure:

```json
{
  "success": true | false,
  "error": undefined | null | { /* single error object */ }
  "errors": undefined | null | [{ /* single error object */ }, ...]
}
```
The `success` property shows the general status of your API call: whether is has succeeded or not. In most cases, it is enough to only handle issues with `success == true` and ignore/throw errors when `success == false`.

The `error` and `errors` properties are mutually exclusive and contain one or several error objects (description follows), although it is possible for `errors` to contain zero or one error object items.

Every single error object has the following structure:
```json
{
  "wellKnownError": Number | String,
  "errorCode": undefined | String,
  "message": undefined | null | String
}
```
Here, `wellKnownError` and `errorCode` are machine-readable error codes, and `message` is human-readable and provides more details on the error for your interpretation.

#### HTTP Status Mapping
Although the error/success state may be easily read from the response body, the HTTP status can also indicate success. Successful calls end with 200 OK status, and unsuccessful ones will have 4xx or 5xx errors.

#### Universal Errors Codes
Most error codes are application/call specific, however, there are some common ones:
| HTTP Status Code | Error code | Meaning |
|:-:|:-:|-|
|400|InvalidData|The request body cannot be parsed as JSON.|
|401|NoAuthorizationHeader|Your request does not include an `Authorization` HTTP header.|
|401|BadAuthorizationType|The HTTP Authorization scheme is not `Bearer`.|
|403|InvalidApiKey|The API key supplied in the `Authorization` header is invalid.|
|404|NotFound|The endpoint specified in your request (a combination of HTTP method and path) does not exist.|
|429|RateLimitExceeded|Your application has exceeded the [rate limit](#api-usage-limits) by making too many API calls within a short period of time.|
|500|InternalError|Your request does not meet the required format, or an internal error has occurred.|

### API Usage Limits
To maintain optimum performance and ensure that the service is available to all our customers, API usage is limited in several ways:
- Request Rate limiting
- General API limitations
- Specific API limitations

#### Request Rate Limiting
Each API key is allowed to make up to ten consequent requests without any delay. After that, you can continue making one request per second. If you call our API more often than that, you might have to wait for the requests to be completed, but no longer than 1 extra second for each additional request.

#### General API Limitations
API keys are associated with your FlippingBook account. For each account, there may be no more than ten keys.
Total request size is limited to 1MB. This limit mainly affect uploads and in case you need to upload bigger file consider using download from URL instead.

#### Specific API Limitations
Your purchased plan or edition may limit your access to API features or the entities you’re allowed to use.

### API Changes Policy
We are constantly improving our APIs to support new product features. Still, we do our best to maintain backward compatibility with existing integrations. All APIs are versioned (by the HTTP path, `/api/v1/...`), and and all breaking changes will only be released in a new API version. Non-breaking changes (like adding new calls, extending responses with new properties, adding properties to requests while keeping the default behavior) may be added to the current version.

## Key Management API

This API is used to control your API keys. Call it to issue new keys or review and revoke existing ones.

### The `Key` Entity
The `Key` entity represents an API key used to access all other APIs.

!!!include(gen/GET-api-v1-auth-key.md)!!!
!!!include(gen/POST-api-v1-auth-key.md)!!!
!!!include(gen/DELETE-api-v1-auth-key.md)!!!

## FlippingBook Online API

FlippingBook Online is a service for converting PDFs into interactive digital documents. Its API allows you to programmatically create publications and customize their look and behavior.

Publications are represented as [Publication](#the-publication-entity) entities which are made up of one or more [Source](#the-source-entity) entities. A source represents a publication version and usually corresponds to one source PDF file. Each publication may also contain zero to many [Tracked/Individual Links](#the-tracked-link-entity) entities that represent a special type of links for that publication with independent tracking, statistics, and notifications.

If your plan gives you the option to add a custom domain, and you have at least one domain set up, then all your publications must be assigned to [Custom Domain](#the-custom-domain-entity) entities.

To monitor specific events and their status, and to make the integration to external systems easier, use [Event triggers](#event-triggers).

For simpler API exploration, most entities contain [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) links.

### The `Publication` Entity
Publications are the main entity of FlippingBook Online. They serve as an entry point for end-users (readers) and represent a document available online with defined behavior and looks. Yet, you can't only create a publication: your application also has to supply its content by defining one or more [sources](#the-source-entity).

!!!include(gen/GET-api-v1-fbonline-publication.md)!!!
!!!include(gen/GET-api-v1-fbonline-publication-id-.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication-id-.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication-id-customize.md)!!!
!!!include(gen/DELETE-api-v1-fbonline-publication-id-.md)!!!

### The `Source` Entity
Sources represent the publication's content. Each publication can have more than one source, however, only the last converted source will be displayed to end-users (readers). For now, the only supported format for the source is a single PDF file that is not password-protected and does not contain XFA (forms). There's a limit on PDF file size (500Mb) and the number of pages (2000). Total request size should not exceed 1MB, it mainly affects base64-encoded PDF uploads (in the `data` field).

::: warning
Once created, sources cannot be updated and/or deleted. On creation, they are put into a conversion queue and are activated (visible in the publication) when the conversion is finished.
:::

!!!include(gen/GET-api-v1-fbonline-publication-id-source.md)!!!
!!!include(gen/GET-api-v1-fbonline-publication-id-source-sourceId-.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication-id-source.md)!!!

### The `Tracked Link` Entity
A tracked link is a special link (URL) for the publication that offers independent statistics and event handling. For example, you may create a link that sends you, the author, an email when the publication under the tracked link is opened for the first time.

Each link has a separate object for handling its events called a [trigger](#event-triggers). Link-bound triggers are altered with link's API calls [POST trigger](#create-a-new-trigger) and [DELETE trigger](#delete-the-trigger).

!!!include(gen/GET-api-v1-fbonline-tracked-links.md)!!!
!!!include(gen/GET-api-v1-fbonline-tracked-links-linkId-.md)!!!
!!!include(gen/POST-api-v1-fbonline-tracked-links.md)!!!
!!!include(gen/PUT-api-v1-fbonline-tracked-links-linkId-.md)!!!

### The `Custom Domain` Entity
A custom domain is a great way to use your own (sub)domain name in your publications' URL. If you have at least one custom domain in your account, all your publications must be assigned to one.

You can't manage domains via API—only retrieve a list of all available custom domains in your account.

!!!include(gen/GET-api-v1-fbonline-custom-domains.md)!!!

### Event Triggers

Triggers provide a way for your application to react to different FlippingBook Online generated events. They can be defined on multiple layers to handle events in different scopes:
- Account-wide triggers: notify about events on any account publication or tracked link.
- Publication level triggers: notify about events on one publication and all tracked links bound to it.
- Tracked link-level triggers: notify about events on one tracked link.

Most of the triggers are created implicitly upon tracked link creation/modification, however, you can manage custom triggers with the event trigger API.

!!!include(gen/POST-api-v1-fbonline-triggers.md)!!!
!!!include(gen/POST-api-v1-fbonline-triggers-id-.md)!!!
!!!include(gen/DELETE-api-v1-fbonline-triggers-id-.md)!!!

## Event Names

|Event Name|Scope|Description|
|-|-|-|        
|lead|Account, Publication|A reader filled out the lead form in a publication.|
|session|Account, Publication, Link|A publication/tracked link view session has started. Note that for tracked links, the session event will only fire for the first ten opens.|
|notViewedUntil|Account, Publication, Link|A tracked link was not viewed in the specified time window.|
|print|Account, Publication|The print button in a publication has been clicked.|
|created|Account|A publication was created successfully (its first [source](#the-source-entity) has converted).|
|updated|Account|A publication was updated successfully (its subsequent [source](#the-source-entity) has converted).|
|deleted|Account|A publication was deleted.|
|convertationFailed|Account|A publication's conversion failed.|
|link|Account, Publication|A link in a publication was clicked.|
