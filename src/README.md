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
  "Success": true | false,
  "Timestamp": String,
  "Error": undefined | null | { /* single error object */ }
  "Errors": undefined | null | [{ /* single error object */ }, ...]
}
```
The `Success` property shows general status of the API call, whether is has succeeded or not. In most case it is enough to handle only cases with `Success == true` and ignore/throw errors when `Success == false`. 

The `Timestamp` property contains a response timestamp in ISO 8601 format.

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

#### List all API keys for your account
`GET /api/v1/auth/key`

##### Request format
```http request
GET /api/v1/auth/key?accessToken=string HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`accessToken`|No|This parameter is required only if you omit `Authorization` HTTP header as a fallback authentication method. Value of `accessToken` is a session access token from FlippingBook single sign-on service and could be obtained by visiting `https://logon.flippingbook.com/myaccesstoken` while logged in to [FlippingBook account](https://flippingbook.com/account).|
##### Response format
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

#### Create a new API key for your account
`POST /api/v1/auth/key`
##### Request format
```http request
POST /api/v1/auth/key HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "accessToken": String
}
```
|Parameter|Required|Description|
|-|:-:|-|
|`accessToken`|Yes|Value of `accessToken` is a session access token from FlippingBook single sign-on service and could be obtained by visiting `https://logon.flippingbook.com/myaccesstoken` while logged in to [FlippingBook account](https://flippingbook.com/account).|
##### Response format
```json
{
  "Success": true,
  "Key": String
}
```
|Property|Type|Description|
|-|-|-|
|`Key`|string|Your new API key.|
##### Errors
|HTTP Status Code|Error code|Meaning|
|:-:|:-:|-|
|200|KeyLimitExceeded|Your account already has ten API keys. You cannot create more.|
|200|InvalidAccessToken|The value of supplied `accessToken` is invalid.|
#### Revoke an existing API key
`DELETE /api/v1/auth/key`
##### Request format
```http request
DELETE /api/v1/auth/key HTTP/1.1
Host: api-tc.is.flippingbook.com
```

##### Response format
```json
{
  "Success": true
}
```
::: tip
By calling this method your current used API key is revoked.
:::
#### Get information about current account (testing)
`GET /api/v1/auth/me`
This method is primarily designed for API key testing and has no other meaningful purpose.
##### Request format
```http request
GET /api/v1/auth/me HTTP/1.1
Host: api-tc.is.flippingbook.com
```
##### Response format
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

Publications are represented as [Publication](#publication-entity-model) entities which are build of one or more [Source](#the-source-entity) entities. The source represents one publication version and usually corresponds to one source PDF file. Each publication may contain zero or many [Tracked/Individual Links](#the-tracked-link-entity) entities that represent a special type of links to a publication with independent tracking, statistics, and notifications.

To make the integration to external systems easier there is [Triggers/hooks system](#event-triggers).

To allow simpler API exploration most entities contain [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) links.

### The `Publication` Entity
Publications are the main entity of FlippingBok Online. They serve as an entry point for end-users (readers) and represent a document available online with defined behavior and looks. Yet it is not enough to just create a publication, your application has to supply its content by defining one or more [sources](#the-source-entity).

#### List filtered and/or paged publications in the account
`GET /api/v1/fbonline/publication`

##### Request format
```http request
GET /api/v1/fbonline/publication?<optional-parametes> HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`query`|No|Publication filter. To match publication name must exactly contain `query` value.|
|`hashid`|No|Publication filter. To match publication's identifier (the number in the publication URL) must exactly match `hashid` value.|
|`url`|No|Publication filter. To match publication URL must exactly match `url` value.|
|`count`|No|Number of publications to return. Defaults to 10.|
|`offset`|No|Starting a number of publication to return. Defaults to 0.|
##### Response format
```json
{
  "Success": true,
  "Total": Number,
  "Publications": [ { /* publication object */ }, ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Total`|Number|Total number of publications matching request (disregarding offset/count).|
|`Publications`|array of objects|Matching publications. See [publication model description](/#publication-entity-model).|

#### Retrieve information about one publication by its identifier.
`GET /api/v1/fbonline/publication/{id}`

##### Request format
```http request
GET /api/v1/fbonline/publication/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|The publication identifier. `Id` from the [publication model](#publication-entity-model).|
##### Response format
```json
{
  "Success": true,
  "Publication": { /* publication object */ }
}
```
|Property|Type|Description|
|-|-|-|
|`Publication`|object|The publication model. See [publication model description](#publication-entity-model).|

##### Errors
|HTTP Status Code|Error code|Meaning|
|:-:|:-:|-|
|200|ObjectNotFound|Publication with specified identifier was not found (or does not belong to your account).|

#### Update metadata of one publication or create a new publication possibly attaching new source file
`POST /api/v1/fbonline/publication/{id}`

##### Request format
```http request
POST /api/v1/fbonline/publication/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Name": String,
  "Description": String,
  "Url": String,
  "Data": String
}
```
|Parameter|Required|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|The publication identifier. `Id` from the [publication model](#publication-entity-model). When omitted, the new publication is created.|
|`Name`|No|Publication name. When omitted existing publication name is left unchanged.|
|`Description`|No|Publication description. When omitted existing publication description is left unchanged.|
|`Url`|No|The URL of PDF file to create a source for the publication from. URL must be publicly accessible at least for several minutes.|
|`Data`|No|Base64 encoded PDF file content to create the source for the publication from.|
##### Response format
```json
{
  "Success": true,
  "Id": String,
  "LastModified": String,
  "CreatedSource": undefined | {
    "Id": String,
    "LastModified": String 
  }
}
```
|Property|Type|Description|
|-|-|-|
|`Id`|string|Created/updated publication identifier.|
|`LastModified`|ISO 8601 date string|Last modification date of the publication.|
|`CreatedSource`|string|If `Data` or `Url` was specified in the request, this property will contain data regarding created source.|
|`CreatedSource.Id`|string|Created source identifier.|
|`CreatedSource.LastModified`|ISO 8601 date string|Last modification date of the created source.|
::: tip
In case when `Url` or `Data` is specified, the [Source](#the-source-entity) entity is created implicitly.
:::
::: warning 
If `Url` or `Data` contain invalid value (inaccessible URL, not a PDF file, PDF exceeding limitations), source is marked as erroneous and, if it was the only source, the publication itself gets deleted.
:::
#### Update publication's customization (the look and behavior)
`POST /api/v1/fbonline/publication/{id}/customize`

##### Request format
```http request
POST /api/v1/fbonline/publication/{id}/customize HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "HardCover": Boolean,
  "SetPasswordProtection": String,
  "ManualPassword": String,
  "GeneratePasswordLength": Number,
  "LogoUrl": String,
  "EnableRtl": Boolean,
  "Theme": String
}
```
|Parameter|Required|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|The publication identifier. `Id` from the [publication model](#publication-entity-model). When omitted, new publication is created.|
|`HardCover`|No|Should hard cover be enabled for the publication.|
|`SetPasswordProtection`|No|How publication password protection should be handled. `keep` to keep existing configuration; `disable` to remove password protection; `manual` - specify password in the `ManualPassword` parameter; `numeric` to generate random password containing only digits; `auto` to generate random password.|
|`ManualPassword`|No|Password to set for the publication.|
|`GeneratePasswordLength`|No|The length of the generated random password.|
|`LogoUrl`|No|New URL for the company logo.|
|`EnableRtl`|No|Set the publication RTL mode.|
|`Theme`|No|Set then publication theme.|
##### Response format
```json
{
  "Success": true,
  "Publication": { /* publication object */ }
}
```
|Property|Type|Description|
|-|-|-|
|`Publication`|object|The publication model. See [publication model description](#publication-entity-model).|
::: warning
Although you can set any customization data regardless of your account subscription plan, it will be filtered of not available features upon publication view. 
:::
#### Delete a publication
`DELETE /api/v1/fbonline/publication/{id}`

##### Request format
```http request
DELETE /api/v1/fbonline/publication/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|The publication identifier. `Id` from the [publication model](#publication-entity-model). When omitted, new publication is created.|
##### Response format
```json
{
  "Success": true
}
```

### `Publication` Entity Model

|Property|Type|Description|
|-|-|-|
|`Id`|string|Publication unique identifier. This one will never change whatever you do with the publication.|
|`HashId`|string|Publication identifier for URLs. Although it is automatically assigned to all publications it may change with the help of our support team, so you should not rely on this as a valid/unique publication identifier.|
|`Name`|string|Publication name.|
|`Description`|string|Publication description.|
|`links`|array of objects|HATEOAS links to related API resources.|
|`State`|string|Publication status. It may consist of any combination (comma separated) of the following values: `Trashed` - publication was moved to trash, restoration possible; `Deleted` - publication was irreversibly deleted; `CompletedAllStages` - publication has at least one source that converted successfully; `HasContent`, `Empty`, `Published` - internally used statuses, do not rely on them.|
|`SeoEnabled`|boolean|Is SEO optimization enabled for the publication. That means web search indexing engines will see text content of your publication and it will appear in our sitemap.|
|`OwnerHashId`|string|Publication owner identifier. You would probably never need it.|
|`ContentRoot`|string|Base URL for all publication assets. Files there are not public, so you cannot access them without viewing the actual publication (when it is allowed by publication's security policy).|
|`CanonicalLink`|string|Canonical URL of the publication.|
|`TotalPages`|string|Total number of pages in the publication. This will have valid value once the publication source has completely converted.|
|`LastPdfName`|string|The filename of the latest uploaded PDF source file.|
|`CustomizationOptions`|object|Publication looks & behavior settings.|
|`CustomizationOptions.Password`|string|Password for password-protected publications.|
|`CustomizationOptions.HardcoverEnabled`|boolean|Is hardcover enabled for the publication.|
|`CustomizationOptions.CompanyLogoEnabled`|boolean|Is company logo display enabled for the publications.|
|`CustomizationOptions.CompanyLogoUrl`|string|URL which is open on company logo clicks.|
|`CustomizationOptions.RtlEnabled`|boolean|Is publication in RTL mode (this is designed for Hebrew and Arabic publications, where the page-flipping direction and controls layout must be reversed).|
|`CustomizationOptions.Theme`|string|Selected skin for the publication.|

### The `Source` Entity
Publication sources represent the publication's content. More than one source may be added to each publication however only the last converted source will be displayed to end-users (readers). For now, the only supported format for the source is a single PDF file that must be not password-protected and does not contain XFA (forms). There's a limit on PDF file size (500Mb) and amount of pages (2000).

::: warning
Once created, sources cannot be updated and/or deleted. On creation they are put into conversion queue and activated (so the publication displays it) when conversion finished.
:::

#### List all sources for the given publication
`GET /api/v1/fbonline/publication/{id}/source`
##### Request format
```http request
GET /api/v1/fbonline/publication/{id}/source HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Publication identifier. Sources can only be listed for one publication at a time.|
##### Response format
```json
{
  "Success": true,
  "Sources": [ { /* source object */ } ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](#the-source-entity).|
 
#### Retrieve information about one single source
`GET /api/v1/fbonline/publication/{id}/source/{source-id}`
Retrieves information about one single source. 
##### Request format
```http request
GET /api/v1/fbonline/publication/{id}/source/{source-id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Publication identifier.|
|`source-id` <Badge>From path</Badge>|Yes|Source identifier.|
##### Response format
```json
{
  "Success": true,
  "Sources": { /* source object */ }
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](#the-source-entity) (one element).|

#### Create a new publication source 
`POST /api/v1/fbonline/publication/{id}/source`
##### Request format
```http request
POST /api/v1/fbonline/publication/{id}/source HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Url": String,
  "Data": String
}
```
|Parameter|Required|Description|
|-|:-:|-|
|`Url`|No|The URL of PDF file to create a source for the publication from. URL must be publicly accessible at least for several minutes.|
|`Data`|No|Base64 encoded PDF file content to create a source for the publication from.|
##### Response format
```json
{
  "Success": true,
  "Sources": [ { /* source object */ } ]
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](#the-source-entity) (one created element).|

### `Source` Entity Model

|Property|Type|Description|
|-|-|-|
|`Id`|string|Source unique identifier. Although these ids are unique across the system they cannot be used without publication identifier.|
|`PublicationId`|string|Parent publication identifier.|
|`links`|array of objects|HATEOAS links to related API resources.|
|`State`|string|Processing state of the source file. It can be one of the following values: `WaitAutoQueue` - source file upload has completed yet it is not queued for conversion yet; `Queued` - source file is in conversion queue; `Completed` - source file has been converted partially, publication preview is available; `CompletedAllStages` - source file has been converted completely and it was activated in publication; `CompletedWithErrors` - there was a permanent error during conversion, re-uploading the same file will be fruitless; `WaitManualQueue` - special status meaning that source file has been uploaded yet it will not be put in conversion queue, this status is never set automatically.|
|`Stage`|string|Current conversion state (if the source is still converting). At the moment there are two stages: `Preview` and `L1`. After the `Preview` is completed, the source is activated for the publication only if it does not have any previous successful sources. Publication in preview mode is customizable, several first pages are available for viewing and other pages are loaded as they complete. Preview publication content delivery to end-users is not optimized and thus these publications should not be shared until their conversion is complete.|
|`Progress`|string|Current conversion progress. During `Preview` stage it has range `[0..1]` which means stage completion percentage, and on `L1` stage it shows the number of completed pages.|

### The `Tracked Link` Entity
The tracked link is a special link (URL) for the publication with independent statistics and event handling. For example, you may have a link that sends you (author) an email when the tracked link is opened for the first time.

Each link has a separate object for handling its events called [trigger](#event-triggers). Link-bound triggers are altered with link's API calls [POST trigger](#create-or-update-an-account-wide-trigger) and [DELETE trigger](#delete-account-wide-trigger).

#### List tracked links
`GET /api/v1/fbonline/tracked_links`
##### Request format
```http request
GET /api/v1/fbonline/tracked_links HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`title`|No|Link filter. In order to match tracked link title must exactly contain `title` value.|
|`publication-hashid`|No|Link filter. In order to match parent publication must have its URL identifier matching `publication-hashid` value.|
|`publication-uid`|No|Link filter. In order to match parent publication must have its unique identifier matching `publication-uid` value.|
|`publication-url`|No|Link filter. In order to match parent publication URL must exactly match `publication url` value.|
|`count`|No|Number of links to return. Defaults to 10.|
|`offset`|No|Starting number of link to return. Defaults to 0.|
##### Response format
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
|`Links`|array of objects|Array of [link objects](#the-tracked-link-entity) matching your filter.|

#### Retrieve information about one tracked link
`GET /api/v1/fbonline/tracked_links/{id}`

##### Request format
```http request
GET /api/v1/fbonline/tracked_links/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`id <Badge>From path</Badge>`|Yes|Tracked link identifier.|
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
|`Links`|array of objects|Array of [link objects](#the-tracked-link-entity) (one element).|

#### Create a new tracked link
`POST /api/v1/fbonline/tracked_links`
##### Request format
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
|Parameter|Required|Description|
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
|`Links`|array of objects|Array of [link objects](#the-tracked-link-entity) (one element).|

#### Modify or delete specified tracked link 
`PUT /api/v1/fbonline/tracked_links/{id}`
##### Request format
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
|Parameter|Required|Description|
|-|:-:|-|
|`Title`|Yes|Tracked link title visible only to the owner.|
|`NewState`|No|New state of the link. Can be one of the following values: `Enable` - activate the link; `Disable` - deactivates the link (it cannot be viewed but still counted in the account and can be eventually re-enabled); `Delete` - deletes the link (it cannot be viewed or restored).|
|`NotificationType`|No|Method for delivering notification on link events. Can be one of the following values: `Email` - notify via email; `Zapier` - notify via [zapier](https://zapier.com/) integration.|
|`OnViewTriggerSingle`|No|Should notification be delivered when a link is opened for the first time?|
|`OnViewTrigger`|No|Should notification be delivered when a link is opened (first 10 times)?|
|`OnDownload`|No|Should notification be delivered when PDF download or printing is requested for linked publication?|
|`OnNotOpenedUntil`|No|Should notification be delivered when a link is not opened until specified date/time (ISO 8601 format)?|

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
|`Links`|array of objects|Array of [link objects](#the-tracked-link-entity) (one element).|

### `Tracked Link` Entity Model

|Property|Type|Description|
|-|-|-|
|`Id`|string|Link unique identifier.|
|`Title`|string|Link title (visible only to link owner, not end-user).|
|`State`|string|Link state. It may consist of any combination (comma separated) of the following values: `WithNewData` - there is some 'unseen' statistics collected for the link; `WithoutNewData` - there is no 'unseen' statistics for the link; `Active` - link is active and enabled; `Deleted` - link was deleted and unavailable to end-users (readers); `Expired` - link's lifetime ended - it was not clicked before set expiration time.|
|`CreatedAt`|string|Link creation timestamp. ISO 8601 date format.|
|`UrlName`|string|Unique URL part for the link. To get full URL you should prefix it with `https://online.flippingbook.com/link/` (for the default domain).|
|`TriggerId`|string|Trigger identifier for the link.|
|`ShortStats`|object|View statistics for the link.|
|`ShortStats.FullStats`|object|Totals for the link.|
|`ShortStats.FullStats.LastViewedAt`|string|Date/time of last view, ISO 8601 format.|
|`ShortStats.FullStats.ViewDuration`|number|Total viewing time (seconds).|
|`ShortStats.FullStats.Visits`|number|Total number of views.|
|`ShortStats.SinceLastUpdate`|object|Statistics accumulated from last 'seen' state.|
|`ShortStats.SinceLastUpdate.LastViewedAt`|string|Date/time of last view since last seen, ISO 8601 format.|
|`ShortStats.SinceLastUpdate.ViewDuration`|number|Viewing time (seconds) since last seen.|
|`ShortStats.SinceLastUpdate.Visits`|number|Number of views since last seen.|
|`Publication`|object|Parent publication excerpt.|
|`Publication.Id`|string|Parent publication identifier.|
|`Publication.Id.Id`|string|Parent publication unique identifier.|
|`Publication.Id.HashId`|string|Parent publication URL identifier.|
|`Publication.Title`|string|Parent publication name.|
|`Publication.Url`|string|Parent publication canonical URL.|
|`Triggers`|object|Triggers for the link.|
|`Triggers.OnView`|object|View trigger for the link.|
|`Triggers.OnView.Enabled`|boolean|Is this trigger enabled.|
|`Triggers.OnView.Amount`|number|How many times this trigger is allowed to fire.|
|`Triggers.OnDownload`|object|Download trigger for the link.|
|`Triggers.OnDownload.Enabled`|boolean|Is this trigger enabled.|
|`Triggers.OnDownload.Amount`|number|How many times this trigger is allowed to fire.|
|`Triggers.OnNotOpenedUntil`|object|Link not opened before trigger for the link.|
|`Triggers.OnNotOpenedUntil.Enabled`|boolean|Is this trigger enabled.|
|`Triggers.OnNotOpenedUntil.Until`|string|When this trigger should fire.|
|`Triggers.TriggerVia`|string|Trigger delivery method. Can be one of the following values: `Email` - notify via email; `Zapier` - notify via [zapier](https://zapier.com/) integration.|

### Event Triggers
::: danger
Triggers/hooks API is frequently updated in the current API version without prior notice.
:::

Triggers and hooks provide a way for your application to react to different FlippingBook Online generated events. They can be defined on multiple layers to handle events in different scopes:
- Account-wide triggers: notify about events on any account publication or tracked link.
- Publication level triggers: notify about events on one publication and all tracked links bound to it.
- Tracked link-level triggers: notify about events on one tracked link.

#### Account Level Triggers
##### List all account-wide triggers 
`GET /api/v1/fbonline/webhook`
###### Request format
```http request
GET /api/v1/fbonline/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
###### Response format
```json
{
  "Success": true,
  "Webhooks": [ /* trigger object */, ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Webhooks`|array of objects|Array of [trigger objects](#the-tracked-link-entity) defined for your account.|

##### Create or update an account-wide trigger 
`POST /api/v1/fbonline/webhook/{id}`
###### Request format
```http request
POST /api/v1/fbonline/webhook/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Name": String,
  "Endpoint": String,
  "Events": [ String, ... ]
}
```
|Parameter|Required|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|Trigger identifier.|
|`Name`|No|Description of a trigger. It is not seen anywhere but via API.|
|`Endpoint`|No|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|`Events`|Yes|Event names for which this trigger should fire.| 
###### Response format
```json
{
  "Success": true,
  "Id": String
}
```
|Property|Type|Description|
|-|-|-|
|`Id`|string|Unique identifier of created/updated trigger.|

##### Delete account-wide trigger 
`DELETE /api/v1/fbonline/webhook/{id}`
###### Request format
```http request
DELETE /api/v1/fbonline/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|Trigger identifier.|
###### Response format
```json
{
  "Success": true
}
```

#### Publication Level Triggers
##### List all triggers for the given publication
`GET /api/v1/fbonline/publication/{publication-id}/trigger`
###### Request format
```http request
GET /api/v1/fbonline/publication/{publication-id}/trigger HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`publication-id` <Badge>From path</Badge>|No|Publication identifier.|
###### Response format
```json
{
  "Success": true,
  "Triggers": [ /* trigger object */, ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Webhooks`|array of objects|Array of [trigger objects](#event-triggers) defined for your publication.|

##### Create or update a publication level trigger
`POST /api/v1/fbonline/publication/{publication-id}/trigger/{id}`
###### Request format
```http request
POST /api/v1/fbonline/publication/{publication-id}/trigger/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Name": String,
  "Endpoint": String,
  "Events": [ String, ... ]
}
```
|Parameter|Required|Description|
|-|:-:|-|
|`publication-id` <Badge>From path</Badge>|No|Publication identifier.|
|`id` <Badge>From path</Badge>|No|Trigger identifier.|
|`Name`|No|Description of a trigger. It is not seen anywhere but via API.|
|`Endpoint`|No|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|`Events`|Yes|Event names for which this trigger should fire.| 
###### Response format
```json
{
  "Success": true,
  "Id": String
}
```
|Property|Type|Description|
|-|-|-|
|`Id`|string|Unique identifier of created/updated trigger.|

##### Delete a publication level trigger 
`DELETE /api/v1/fbonline/publication/{publication-id}/trigger/{id}`
###### Request format
```http request
DELETE /api/v1/fbonline/publication/{publication-id}/trigger/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`publication-id` <Badge>From path</Badge>|No|Publication identifier.|
|`id` <Badge>From path</Badge>|Yes|Trigger identifier.|
###### Response format
```json
{
  "Success": true
}
```

#### Tracked Link Level Triggers
##### Update a tracked link notification trigger
`POST /api/v1/fbonline/tracked_links/hook/{id}`
Updates tracked link notification trigger. 
###### Request format
```http request
POST /api/v1/fbonline/tracked_links/hook/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "Name": String,
  "Endpoint": String,
  "Events": [ String, ... ]
}
```
|Parameter|Required|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|Link trigger identifier.|
|`Name`|No|Description of a trigger. It is not seen anywhere but via API.|
|`Endpoint`|No|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|`Events`|Yes|Event names for which this trigger should fire.| 
###### Response format
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
|`Links`|array of objects|Array of [link objects](#the-tracked-link-entity) (one element).|

##### Delete a tracked link notification trigger 
`DELETE /api/v1/fbonline/tracked_links/hook/{id}`
###### Request format
```http request
DELETE /api/v1/fbonline/tracked_links/hook/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Link trigger identifier.|
###### Response format
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
|`Links`|array of objects|Array of [link objects](#the-tracked-link-entity) (one element).|

### Trigger Entity Model

|Property|Type|Description|
|-|-|-|
|`Name`|string|Description of a trigger. It is not seen anywhere but in API calls.|
|`Endpoint`|string|Target URL for the trigger. When the trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|`Events`|array of strings|Event names for which this trigger should fire. See the following table for the defined event names.|

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
