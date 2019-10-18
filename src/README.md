---
actionText: FlippingBook APIs documentation
actionLink: /
title: FlippingBook APIs documentation
description: FlippingBook APIs documentation
---
# FlippingBook APIs documentation

Welcome to the FlippingBook API's specification. 

This page lists the reference documentation for [FlippingBook](https://flippingbook.com/) APIs. Section [General Information](#flippingbook-public-apis-general-information) is about common concepts and how our APIs are organized. Sections about [Key Management API](#key-management-api) and [FlippingBook Online API](#flippingbook-online-api) provide product-specific information.

A FlippingBook app is a service that converts the client's PDFs into interactive digital documents.

## FlippingBook Public APIs General Information

There are several Public APIs available to your applications. They are all available via our single-host API gateway `https://api-tc.is.flippingbook.com/`. All APIs require proper [authentication/authorization](#authentication) in order to be used. Almost all APIs share the same [error reporting convention](#handling-errors).

While using APIs you should keep in mind that there are certain [limitations](#api-usage-limits) and it may be [changed in the future](#api-changes-policy).

API requests and responses must be in UTF-8 encoded JSON format regardless of request's `Content-Type`, `Accept-Charset` and `Accept` HTTP headers. Requests may be in 'relaxed' JSON format, so single quotes may be used and property names are not required to be quoted. On the response side, there would always be `Content-Type: application/json` header and JSON format will strictly follow the standard.

### Authentication

#### Authentication Scheme
All publicly available APIs require your application to be authenticated and authorized to make API calls. Authentication is done with HTTP bearer scheme, so all your requests (unless specified explicitly in request description) should come with the `Authorization` HTTP header with proper value:

```http request
GET /api/v1/auth/me HTTP/1.1
Host: api-tc.is.flippingbook.com
Authorization: Bearer <your API key>
```

### API Keys
You may receive your API key (linked to your FlippingBook account) by contacting our support team. Or, if you want to save the hassle just log into your account, go to the `https://logon.flippingbook.com/myaccesstoken`, save the value of the `AccessToken` property and then call [Key Management API new key method](#post-api-v1-auth-key).

API keys are linked to your FlippingBook account and all actions are recorded/audited. No account may have more than 10 API keys.

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
The `success` property shows general status of the API call, whether is has succeeded or not. In most case it is enough to handle only cases with `success == true` and ignore/throw errors when `success == false`. 

The `error` and `errors` properties are mutually exclusive and contain one or many error objects (description follows). Although `errors` may contain zero or one error object.

Every single error object has the following structure:
```json
{
  "wellKnownError": Number | String,
  "errorCode": undefined | String,
  "message": undefined | null | String
}
```
Here the `wellKnownError` and `errorCode` are machine-readable error codes, and the `message` is for human use.

#### HTTP Status Mapping
Although error/success state may be easily read from the response body the HTTP status is used to indicate success too. Successful calls should end with 200 OK status, and unsuccessful ones would have 4xx or 5xx errors.

#### Universal Errors Codes
Most error codes are application/call specific, however, some universally returnable codes exist:
| HTTP Status Code | Error code | Meaning |
|:-:|:-:|-|
|400|InvalidData|The request body cannot be parsed as JSON.|
|401|NoAuthorizationHeader|Your request does not include `Authorization` HTTP header.|
|401|BadAuthorizationType|HTTP Authorization scheme is not `Bearer`.|
|403|InvalidApiKey|The API key supplied in the `Authorization` header is invalid.|
|404|NotFound|The endpoint specified in your request (a combination of HTTP method and path) does not exist.|
|429|RateLimitExceeded|Your application calls our API too fast and has exceeded [rate limit](/general/limitations).|
|500|InternalError|Your request does not meet required format or some internal error has occurred.|

### API Usage Limits
To prevent abuse API usage is limited in several ways:
- Request Rate Limiting
- General API limitations
- Domain-specific API limitations

#### Request Rate Limiting
Each API key is allowed to make one request per second with bursts (consequent requests without any delay) up to ten requests. After the burst, the next one is available after ten seconds of inactivity (or even more if you keep your request rate under one per second).

#### General API Limitations
API keys are linked to your FlippingBook account. For each account, there may be no more than ten keys.

#### Domain-specific API Limitations
For every application domain (e.g. FlippingBook Online) there may be additionally enforced limits. Access to API features may be limited by your purchased edition/plan and various limits on entities are enforced. Consult each application API documentation for the details. 

### API Changes Policy
We are constantly improving our APIs to support new product features. However, we do our best to keep backward compatibility with existing integrations. All APIs are versioned (by HTTP path, `/api/v1/...`) and all breaking changes will happen only with new API versions, non-breaking changes (like adding new calls, extending responses with new properties, adding properties to requests while keeping default behavior) may be added to the current version.

## Key Management API

This API is used to control your API keys. Using it you may issue new keys, review and revoke existing ones.

### The `Key` Entity
The `Key` entity represents an API key used to access all other APIs.

!!!include(gen/GET-api-v1-auth-key.md)!!!
!!!include(gen/POST-api-v1-auth-key.md)!!!
!!!include(gen/DELETE-api-v1-auth-key.md)!!!

## FlippingBook Online API

FlippingBook Online is a service for converting PDFs into interactive digital documents. Its API allows you to programmatically create publications and customize their look and behavior.

Publications are represented as [Publication](#the-publication-entity) entities which are build of one or more [Source](#the-source-entity) entities. The source represents one publication version and usually corresponds to one source PDF file. Each publication may contain zero or many [Tracked/Individual Links](#the-tracked-link-entity) entities that represent a special type of links to a publication with independent tracking, statistics, and notifications.

To make the integration to external systems easier there is [Triggers/hooks system](#event-triggers).

To allow simpler API exploration most entities contain [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) links.

### The `Publication` Entity
Publications are the main entity of FlippingBok Online. They serve as an entry point for end-users (readers) and represent a document available online with defined behavior and looks. Yet it is not enough to just create a publication, your application has to supply its content by defining one or more [sources](#the-source-entity).

!!!include(gen/GET-api-v1-fbonline-publication.md)!!!
!!!include(gen/GET-api-v1-fbonline-publication-id-.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication-id-.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication-id-customize.md)!!!
!!!include(gen/DELETE-api-v1-fbonline-publication-id-.md)!!!

### The `Source` Entity
Publication sources represent the publication's content. More than one source may be added to each publication however only the last converted source will be displayed to end-users (readers). For now, the only supported format for the source is a single PDF file that must be not password-protected and does not contain XFA (forms). There's a limit on PDF file size (500Mb) and amount of pages (2000).

::: warning
Once created, sources cannot be updated and/or deleted. On creation they are put into conversion queue and activated (so the publication displays it) when conversion finished.
:::

!!!include(gen/GET-api-v1-fbonline-publication-id-source.md)!!!
!!!include(gen/GET-api-v1-fbonline-publication-id-source-sourceId-.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication-id-source.md)!!!

### The `Tracked Link` Entity
The tracked link is a special link (URL) for the publication with independent statistics and event handling. For example, you may have a link that sends you (author) an email when the tracked link is opened for the first time.

Each link has a separate object for handling its events called [trigger](#event-triggers). Link-bound triggers are altered with link's API calls [POST trigger](#create-or-update-an-account-wide-trigger) and [DELETE trigger](#delete-account-wide-trigger).

!!!include(gen/GET-api-v1-fbonline-tracked-links.md)!!!
!!!include(gen/GET-api-v1-fbonline-tracked-links-linkId-.md)!!!
!!!include(gen/POST-api-v1-fbonline-tracked-links.md)!!!
!!!include(gen/PUT-api-v1-fbonline-tracked-links-linkId-.md)!!!

### Event Triggers
::: danger
Triggers/hooks API is frequently updated in the current API version without prior notice.
:::

Triggers and hooks provide a way for your application to react to different FlippingBook Online generated events. They can be defined on multiple layers to handle events in different scopes:
- Account-wide triggers: notify about events on any account publication or tracked link.
- Publication level triggers: notify about events on one publication and all tracked links bound to it.
- Tracked link-level triggers: notify about events on one tracked link.

#### Account Level Triggers

!!!include(gen/GET-api-v1-fbonline-webhook.md)!!!
!!!include(gen/POST-api-v1-fbonline-webhook.md)!!!
!!!include(gen/POST-api-v1-fbonline-webhook-id-.md)!!!
!!!include(gen/DELETE-api-v1-fbonline-webhook-id-.md)!!!

#### Publication Level Triggers

!!!include(gen/GET-api-v1-fbonline-publication-id-trigger.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication-id-trigger.md)!!!
!!!include(gen/POST-api-v1-fbonline-publication-id-trigger-triggerId-.md)!!!
!!!include(gen/DELETE-api-v1-fbonline-publication-id-trigger-triggerId-.md)!!!

#### Tracked Link Level Triggers

!!!include(gen/POST-api-v1-fbonline-tracked-links-hook.md)!!!
!!!include(gen/POST-api-v1-fbonline-tracked-links-hook-triggerId-.md)!!!
!!!include(gen/DELETE-api-v1-fbonline-tracked-links-hook-triggerId-.md)!!!

## Event Names

|Event Name|Scope|Description|
|-|-|-|
|PublicationCreatedCompleted|Account|Publication has been created successfully (first [source](/fbonline/sources) converted).|
|PublicationUpdatedCompleted|Account|Publication has been updated successfully (non-first [source](/fbonline/sources) converted).|
|PublicationCompleted|Account|Publication has been created/updated successfully (any [source](/fbonline/sources) converted)|
|PublicationFailed|Account|Publication conversion failed.|
|PublicationDeleted|Account|Publication has been deleted.|
|lead|Account, Publication|Lead form in the publication has been passed.|
|page|Account, Publication|Publication page shown to end-user.|
|link|Account, Publication|Link in the publication has been clicked.|
|download|Account, Publication|Download button in the publication has been clicked.|
|print|Account, Publication|Print button in the publication has been clicked.|
|TrackedPublicationLink-session|Account, Publication, Link|Tracked link view session started.|
|TrackedPublicationLink-notViewedUntil|Account, Publication, Link|Tracked link was not viewed in the specified time window.|
|TrackedPublicationLink-download|Account, Publication, Link|Download or print button has been clicked in the publication referenced by the tracked link.|

All events should have `trigger` and `eventData` properties in their data.
