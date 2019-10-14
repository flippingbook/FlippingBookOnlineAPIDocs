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

### Authentication

#### Authentication Scheme
All publicly available APIs require your application to be authenticated and authorized to make API calls. Authentication is done with HTTP bearer scheme, so all your requests (unless specified explicitly in request description) should come with the `Authorization` HTTP header with proper value:

```http request
GET /api/v1/auth/me HTTP/1.1
Host: api-tc.is.flippingbook.com
Authorization: Bearer <your API key>
```

### API Keys
You may receive your API key (linked to your FlippingBook account) by contacting our support team. Or, if you want to save the hassle just log into your account, go to the `https://logon.flippingbook.com/myaccesstoken`, save value of the `AccessToken` property and then call [Key Management API new key method](/auth/keys#post-api-v1-auth-key).

API keys are linked to your FlippingBook account and all actions are recorded/audited. No account may have more than 10 API keys.

## Handling Errors
### General Rules
All API calls may return errors for your requests. We have standardized error format for all responses unless stated explicitly in the API call description. All responses should follow this structure:

```json
{
  "Success": true | false,
  "Timestamp": String,
  "Error": undefined | null | { /* single error object */ }
  "Errors": undefined | null | [{ /* single error object */ }, ...]
}
```
The `Success` property shows general status of the API call, whether is has succeeded or not. In most case it is enough to handle only cases with `Success == true` and ignore/throw errors when `Success == false`. 

The `Timestamp` property contains response timestamp in ISO 8601 format.

The `Error` and `Errors` properties are mutually exclusive and contain one or many error objects (description follows). Although `Errors` may contain zero or one error object.

Every single error object has the following structure:
```json
{
  "WellKnownError": Number | String,
  "ErrorCode": undefined | String,
  "Message": undefined | null | String
}
```
Here the `WellKnownError` and `ErrorCode` are machine-readable error codes, and the `Message` is for human use.

### HTTP Status Mapping
Although error/success state may be easily read from response body the HTTP status is used to indicate success too. Successful calls should end with 200 OK status, and unsuccessful ones would have 4xx or 5xx errors.

### Universal Errors Codes
Most error codes are application/call specific, however some universally returnable codes exist:
| HTTP Status Code | Error code | Meaning |
|:-:|:-:|-|
|400|InvalidData|The request body cannot be parsed as JSON.|
|401|NoAuthorizationHeader|Your request does not include `Authorization` HTTP header.|
|401|BadAuthorizationType|HTTP Authorization scheme is not `Bearer`.|
|403|InvalidApiKey|The API key supplied in the `Authorization` header is invalid.|
|404|NotFound|The endpoint specified in your request (combination of HTTP method and path) does not exist.|
|429|RateLimitExceeded|Your application calls our API too fast and has exceeded [rate limit](/general/limitations).|
|500|InternalError|Your request does not meet required format, or some internal error has occured.|

## API Usage Limits
To prevent abuse API usage is limited in several ways:
- Request Rate Limiting
- General API limitations
- Domain-specific API limitations

### Request Rate Limiting
Each API key is allowed to make one request per second with bursts (consequent requests without any delay) up to ten requests. After the burst next one is available after ten seconds of inactivity (or even more if you keep your request rate under one per second).

### General API Limitations
API keys are linked to your FlippingBook account. For each account there may be no more than ten keys.

### Domain-specific API Limitations
For every application domain (e.g. FlippingBook Online) there may be additionally enforced limits. Access to API features may be limited by your purchased edition/plan and various limits on entities is enforced. Consult each application API documentation for the details. 

## API Changes Policy
We are constantly improving our APIs to support new product features. However, we do our best to keep backward compatibility with existing integrations. All APIs are versioned (by HTTP path, `/api/v1/...`) and all breaking changes will happen only with new API versions, non-breaking changes (like adding new calls, extending responses with new properties, adding properties to requests while keeping default behavior) may be added to the current version.

## Key Management API

This API is used to control your API keys. Using it you may issue new keys, review and revoke existing ones.

Read about entities supported by this API:
- [Key](/auth/keys)

## The `Key` Entity
The `Key` entity represent an API key used to access all other APIs.

### `GET /api/v1/auth/key`
Lists all API keys for your account. 
#### Request format
```http request
GET /api/v1/auth/key?accessToken=string HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`accessToken`|No|This parameter is required only if you omit `Authorization` HTTP header as a fallback authentication method. Value of `accessToken` is a session access token from FlippingBook single sign-on service and could be obtained by visiting `https://logon.flippingbook.com/myaccesstoken` while logged in to [FlippingBook account](https://flippingbook.com/account).|
#### Response format
```json
{
  "Success": true,
  "Keys": [
    String,
    String,
    ...
  ]
}
```
|Property|Type|Description|
|-|-|-|
|`Keys`|array of strings|The list of API keys active for your account.|
::: tip
This call might be made without `Authorization` header yet you must supply `accessToken` parameter as a fallback. If `Authorization` header is present, it takes precedence even if its value is invalid.
:::

### `POST /api/v1/auth/key`
Creates a new API key for your account.
#### Request format
```http request
POST /api/v1/auth/key HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "accessToken": String
}
```
|Parameter|Required?|Description|
|-|:-:|-|
|`accessToken`|Yes|Value of `accessToken` is a session access token from FlippingBook single sign-on service and could be obtained by visiting `https://logon.flippingbook.com/myaccesstoken` while logged in to [FlippingBook account](https://flippingbook.com/account).|
#### Response format
```json
{
  "Success": true,
  "Key": String
}
```
|Property|Type|Description|
|-|-|-|
|`Key`|string|Your new API key.|
#### Errors
|HTTP Status Code|Error code|Meaning|
|:-:|:-:|-|
|200|KeyLimitExceeded|Your account already has ten API keys. You cannot create more.|
|200|InvalidAccessToken|The value of supplied `accessToken` is invalid.|
### `DELETE /api/v1/auth/key`
Revokes existing API key.
#### Request format
```http request
DELETE /api/v1/auth/key HTTP/1.1
Host: api-tc.is.flippingbook.com
```

#### Response format
```json
{
  "Success": true
}
```
::: tip
By calling this method your current used API key is revoked.
:::
### `GET /api/v1/auth/me`
Gets information about current account. This method is primarily designed for API key testing and has no other meaningful purpose.
#### Request format
```http request
GET /api/v1/auth/me HTTP/1.1
Host: api-tc.is.flippingbook.com
```
#### Response format
```json
{
  "Success": true,
  ...
}
```
::: warning
This method is primarily designed for API key testing and has no other meaningful purpose. Thus, it's response format is not standardized and subject to change without notice and/or proper versioning.
:::

## FlippingBook Online API

FlippingBook Online is a service for converting PDFs into interactive digital documents. Its API allows you to programmatically create publications and customize their look and behavior.

Publications are represented as [Publication](/fbonline/publications) entities which are build of one or more [Source](/fbonline/sources) entities. Source represents one publication version and usually corresponds to one source PDF file. Each publication may contain zero or many [Tracked/Individual Links](/fbonline/tracked-links) entities which represent special type of links to a publication with independant  tracking, statistics and notifications.

To make the integration to external systems easier there is [Triggers/hooks system](/fbonline/triggers).

To allow simpler API exploration most entities contain [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) links.

Read about entities supported by this API:
- [Publication](/fbonline/publications)
- [Publication Sources](/fbonline/sources)
- [Tracked/Individual Links](/fbonline/tracked-links)
- [Triggers/Hooks](/fbonline/triggers)

## `Publication` Entity Model

|Property|Type|Description|
|-|-|-|
|`Id`|string|Publication unique identifier. This one will never change whatever you do with the publication.|
|`HashId`|string|Publication identifier for URLs. Although it is automatically assigned to all publications it may change with the help of our support team, so you should not rely on this as a valid/unique publication identifier.|
|`Name`|string|Publication name.|
|`Description`|string|Publication description.|
|`links`|array of objects|HATEOAS links to related API resources.|
|`State`|string|Publication status. It may consist of any combination (comma separated) of the following values: `Trashed` - publication was moved to trash, restoration possible; `Deleted` - publication was irreversibly deleted; `CompletedAllStages` - publication has at least one source that converted successfully; `HasContent`, `Empty`, `Published` - internally used statuses, do not rely on them.|
|`SeoEnabled`|boolean|Is SEO optimization enabled for the publication. That means web search indexing engines will see text content of your publication and is will appear in our sitemap.|
|`OwnerHashId`|string|Publication owner identifier. You would probably never need it.|
|`ContentRoot`|string|Base URL for all publication assets. Files there are not public, so you cannot access them without viewing actual publication (when it is allowed by publication's security policy).|
|`CanonicalLink`|string|Canonical URL of the publication.|
|`TotalPages`|string|Total number of pages in the publication. This will have valid value once the publication source has completely converted.|
|`LastPdfName`|string|The filename of the latest uploaded PDF source file.|
|`CustomizationOptions`|object|Publication looks & behavior settings.|
|`CustomizationOptions.Password`|string|Password for password-protected publications.|
|`CustomizationOptions.HardcoverEnabled`|boolean|Is hardcover enabled for the publication.|
|`CustomizationOptions.CompanyLogoEnabled`|boolean|Is company logo display enabled for the publications.|
|`CustomizationOptions.CompanyLogoUrl`|string|URL which is open on company logo clicks.|
|`CustomizationOptions.RtlEnabled`|boolean|Is publication in RTL mode (this is designed for Hebrew and Arabic publications, where page flipping direction and controls layout must be reversed).|
|`CustomizationOptions.Theme`|string|Selected skin for the publication.|

## The `Source` Entity
Publication sources represent publication's content. More than one source may be added to each publication however only last converted source will be displayed to end-users (readers). For now the only supported format for the source is single PDF file which must be not password-protected and does not contain XFA (forms). There's a limit on PDF file size (500Mb) and number of pages (2000).

::: warning
Once created, sources cannot be updated and/or deleted. On creation they are put into conversion queue and activated (so the publication displays it) when conversion finished.
:::

### `GET /api/v1/fbonline/publication/{id}/source`
Lists all sources for the given publication.
#### Request format
```http request
GET /api/v1/fbonline/publication/{id}/source HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Publication identifier. Sources can only be listed for one publication at a time.|
#### Response format
```json
{
  "Success": true,
  "Sources": [ { /* source object */ } ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](/fbonline/source).|
 
### `GET /api/v1/fbonline/publication/{id}/source/{source-id}`
Retrieves information about one single source. 
#### Request format
```http request
GET /api/v1/fbonline/publication/{id}/source/{source-id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Publication identifier.|
|`source-id` <Badge>From path</Badge>|Yes|Source identifier.|
#### Response format
```json
{
  "Success": true,
  "Sources": { /* source object */ }
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](/fbonline/source) (one element).|

### `POST /api/v1/fbonline/publication/{id}/source`
Creates a new publication source. 
#### Request format
```http request
POST /api/v1/fbonline/publication/{id}/source HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Url": String,
  "Data": String
}
```
|Parameter|Required?|Description|
|-|:-:|-|
|`Url`|No|The URL of PDF file to create source for the publication from. URL must be publicly accessible at least for several minutes.|
|`Data`|No|Base64 encoded PDF file content to create source for the publication from.|
#### Response format
```json
{
  "Success": true,
  "Sources": [ { /* source object */ } ]
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](/fbonline/source) (one created element).|

## The `Tracked Link` Entity
The tracked link is a special link (URL) for the publication with independant statistics and event handling. For example you may have a link which sends you (author) an email when the tracked link is opened for the first time.

Each link has a separate object for handling its events called [trigger](/fbonline/triggers). Link-bound triggers are altered with link's API calls [POST trigger](/fbonline/triggers#post-api-v1-fbonline-tracked-links-hook-id) and [DELETE trigger](/fbonline/triggers#delete-api-v1-fbonline-tracked-links-hook-id).


### `GET /api/v1/fbonline/tracked_links`
Lists tracked links.
#### Request format
```http request
GET /api/v1/fbonline/tracked_links HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`title`|No|Link filter. In order to match tracked link title must exactly contain `title` value.|
|`publication-hashid`|No|Link filter. In order to match parent publication must have its URL identifier matching `publication-hashid` value.|
|`publication-uid`|No|Link filter. In order to match parent publication must have its unique identifier matching `publication-uid` value.|
|`publication-url`|No|Link filter. In order to match parent publication URL must exactly match `publication url` value.|
|`count`|No|Number of links to return. Defaults to 10.|
|`offset`|No|Starting number of link to return. Defaults to 0.|
#### Response format
```json
{
  "Success": true,
  "Total": Number,
  "UserTotal": Number,
  "Links": [ { /* link object */ }, ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Total`|number|Total number of links matching request (disregarding offset/count).|
|`UserTotal`|number|Total number of links in your account (disregarding filters/offset/count).|
|`Links`|array of objects|Array of [link objects](/fbonline/tracked-link) matching your filter.|

### `GET /api/v1/fbonline/tracked_links/{id}`
Retrieves information about one tracked link. 

#### Request format
```http request
GET /api/v1/fbonline/tracked_links/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id <Badge>From path</Badge>`|Yes|Tracked link identifier.|
#### Response format
```json
{
  "Success": true,
  "Total": 1,
  "UserTotal": Number,
  "Links": [ { /* link object */ } ]
}
```
|Property|Type|Description|
|-|-|-|
|`UserTotal`|number|Total number of links in your account (disregarding filters/offset/count).|
|`Links`|array of objects|Array of [link objects](/fbonline/tracked-link) (one element).|

### `POST /api/v1/fbonline/tracked_links`
Creates a new tracked link. 

#### Request format
```http request
VERB /api/v1/path HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Title": String,
  "PublicationUid": String,
  "PublicationHashid": String,
  "PublicationUrl": String,
  "NotificationType": String,
  "OnViewTriggerSingle": Boolean,
  "OnViewTrigger": Boolean,
  "OnDonwload": Boolean,
  "OnNotOpenedUntil": String
}
```
|Parameter|Required?|Description|
|-|:-:|-|
|`Title`|Yes|Tracked link title visible only to owner.|
|`PublicationUid`|Yes|Publication unique identifier for the created link.|
|`PublicationHashid`|Yes|Publication URL identifier for the created link.|
|`PublicationUrl`|Yes|Publication URL for the created link.|
|`NotificationType`|No|Method for delivering notification on link events. Can be one of the following values: `Email` - notify via email; `Zapier` - notify via [zapier](https://zapier.com/) integration.|
|`OnViewTriggerSingle`|No|Should notification be delivered when link is opened for the first time?|
|`OnViewTrigger`|No|Should notification be delivered when link is opened (first 10 times)?|
|`OnDownload`|No|Should notification be delivered when PDF download or printing is requested for linked publication?|
|`OnNotOpenedUntil`|No|Should notification be delivered when link is not opened until specified date/time (ISO 8601 format)?|

#### Response format
```json
{
  "Success": true,
  "Total": 1,
  "UserTotal": Number,
  "Links": [ { /* link object */ } ]
}
```
|Property|Type|Description|
|-|-|-|
|`UserTotal`|number|Total number of links in your account (disregarding filters/offset/count).|
|`Links`|array of objects|Array of [link objects](/fbonline/tracked-link) (one element).|

### `PUT /api/v1/fbonline/tracked_links/{id}`
Modifies or delete specified tracked link. 

#### Request format
```http request
PUT /api/v1/fbonline/tracked_links/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Title": String,
  "NewState": String,
  "NotificationType": String,
  "OnViewTriggerSingle": Boolean,
  "OnViewTrigger": Boolean,
  "OnDonwload": Boolean,
  "OnNotOpenedUntil": String
}
```
|Parameter|Required?|Description|
|-|:-:|-|
|`Title`|Yes|Tracked link title visible only to owner.|
|`NewState`|No|New state of the link. Can be one of the following values: `Enable` - activate the link; `Disable` - deactivates the link (it cannot be viewed but still counted in the account and can be eventually re-enabled); `Delete` - deletes the link (it cannot be viewed or restored).|
|`NotificationType`|No|Method for delivering notification on link events. Can be one of the following values: `Email` - notify via email; `Zapier` - notify via [zapier](https://zapier.com/) integration.|
|`OnViewTriggerSingle`|No|Should notification be delivered when link is opened for the first time?|
|`OnViewTrigger`|No|Should notification be delivered when link is opened (first 10 times)?|
|`OnDownload`|No|Should notification be delivered when PDF download or printing is requested for linked publication?|
|`OnNotOpenedUntil`|No|Should notification be delivered when link is not opened until specified date/time (ISO 8601 format)?|

#### Response format
```json
{
  "Success": true,
  "Total": 1,
  "UserTotal": Number,
  "Links": [ { /* link object */ } ]
}
```
|Property|Type|Description|
|-|-|-|
|`UserTotal`|number|Total number of links in your account (disregarding filters/offset/count).|
|`Links`|array of objects|Array of [link objects](/fbonline/tracked-link) (one element).|

## Event Triggers
::: danger
Triggers/hooks API is frequently updated in the current API version without prior notice.
:::

Triggers and hooks provide a way for your application to react to different FlippingBook Online generated events. They can be defined on multiple layers to handle events in different scopes:
- Account-wide triggers: notify about events on any account publication or tracked link.
- Publication level triggers: notify about events on one publication and all tracked links bound to it.
- Tracked link-level triggers: notify about events on one tracked link.

### Account Level Triggers
#### `GET /api/v1/fbonline/webhook`
Lists all account-wide triggers. 
##### Request format
```http request
GET /api/v1/fbonline/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
##### Response format
```json
{
  "Success": true,
  "Webhooks": [ /* trigger object */, ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Webhooks`|array of objects|Array of [trigger objects](/fbonline/trigger) defined for your account.|

#### `POST /api/v1/fbonline/webhook/{id}`
Creates/updates account-wide trigger. 
##### Request format
```http request
POST /api/v1/fbonline/webhook/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Name": String,
  "Endpoint": String,
  "Events": [ String, ... ]
}
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|Trigger identifier.|
|`Name`|No|Description of a trigger. It is not seen anywhere but via API.|
|`Endpoint`|No|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|`Events`|Yes|Event names for which this trigger should fire.| 
##### Response format
```json
{
  "Success": true,
  "Id": String
}
```
|Property|Type|Description|
|-|-|-|
|`Id`|string|Unique identifier of created/updated trigger.|

#### `DELETE /api/v1/fbonline/webhook/{id}`
Deletes account-wide trigger. 
##### Request format
```http request
DELETE /api/v1/fbonline/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|Trigger identifier.|
##### Response format
```json
{
  "Success": true
}
```

### Publication Level Triggers
#### `GET /api/v1/fbonline/publication/{publication-id}/trigger`
Lists all triggers for the given publication. 
##### Request format
```http request
GET /api/v1/fbonline/publication/{publication-id}/trigger HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`publication-id` <Badge>From path</Badge>|No|Publication identifier.|
##### Response format
```json
{
  "Success": true,
  "Triggers": [ /* trigger object */, ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Webhooks`|array of objects|Array of [trigger objects](/fbonline/trigger) defined for your publication.|

#### `POST /api/v1/fbonline/publication/{publication-id}/trigger/{id}`
Creates/updates publication level trigger. 
##### Request format
```http request
POST /api/v1/fbonline/publication/{publication-id}/trigger/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Name": String,
  "Endpoint": String,
  "Events": [ String, ... ]
}
```
|Parameter|Required?|Description|
|-|:-:|-|
|`publication-id` <Badge>From path</Badge>|No|Publication identifier.|
|`id` <Badge>From path</Badge>|No|Trigger identifier.|
|`Name`|No|Description of a trigger. It is not seen anywhere but via API.|
|`Endpoint`|No|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|`Events`|Yes|Event names for which this trigger should fire.| 
##### Response format
```json
{
  "Success": true,
  "Id": String
}
```
|Property|Type|Description|
|-|-|-|
|`Id`|string|Unique identifier of created/updated trigger.|

#### `DELETE /api/v1/fbonline/publication/{publication-id}/trigger/{id}`
Deletes publication level trigger. 
##### Request format
```http request
DELETE /api/v1/fbonline/publication/{publication-id}/trigger/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`publication-id` <Badge>From path</Badge>|No|Publication identifier.|
|`id` <Badge>From path</Badge>|Yes|Trigger identifier.|
##### Response format
```json
{
  "Success": true
}
```

### Tracked Link Level Triggers
#### `POST /api/v1/fbonline/tracked_links/hook/{id}`
Updates tracked link notification trigger. 
##### Request format
```http request
POST /api/v1/fbonline/tracked_links/hook/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Name": String,
  "Endpoint": String,
  "Events": [ String, ... ]
}
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|Link trigger identifier.|
|`Name`|No|Description of a trigger. It is not seen anywhere but via API.|
|`Endpoint`|No|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|`Events`|Yes|Event names for which this trigger should fire.| 
##### Response format
```json
{
  "Success": true,
  "Total": 1,
  "UserTotal": Number,
  "Links": [ { /* link object */ } ]
}
```
|Property|Type|Description|
|-|-|-|
|`UserTotal`|number|Total number of links in your account (disregarding filters/offset/count).|
|`Links`|array of objects|Array of [link objects](/fbonline/tracked-link) (one element).|

#### `DELETE /api/v1/fbonline/tracked_links/hook/{id}`
Deletes tracked link notification trigger. 
##### Request format
```http request
DELETE /api/v1/fbonline/tracked_links/hook/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Link trigger identifier.|
##### Response format
```json
{
  "Success": true,
  "Total": 1,
  "UserTotal": Number,
  "Links": [ { /* link object */ } ]
}
```
|Property|Type|Description|
|-|-|-|
|`UserTotal`|number|Total number of links in your account (disregarding filters/offset/count).|
|`Links`|array of objects|Array of [link objects](/fbonline/tracked-link) (one element).|

