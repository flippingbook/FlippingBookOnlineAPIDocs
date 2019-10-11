---
title: The Publication Entity
---
# The `Publication` Entity

## `GET /api/v1/fbonline/publication`
Lists filtered and/or paged publications in the account.
### Request format
```http request
GET /api/v1/fbonline/publication?<optional-parametes> HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`query`|No|Publication filter. In order to match publication name must exactly contain `query` value.|
|`hashid`|No|Publication filter. In order to match publication's identifier (the number in the publication URL) must exactly match `hashid` value.|
|`url`|No|Publication filter. In order to match publication URL must exactly match `url` value.|
|`count`|No|Number of publications to return. Defaults to 10.|
|`offset`|No|Starting number of publication to return. Defaults to 0.|
### Response format
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
|`Publications`|array of objects|Matching publications. See [publication model description](/fbonline/publication).|
## `GET /api/v1/fbonline/publication/{id}`
Retrieves information about one publication by its identifier.
### Request format
```http request
GET /api/v1/fbonline/publication/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|The publication identifier. `Id` from the [publication model](/fbonline/publication).|
### Response format
```json
{
  "Success": true,
  "Publication": { /* publication object */ }
}
```
|Property|Type|Description|
|-|-|-|
|`Publication`|object|The publication model. See [publication model description](/fbonline/publication).|
### Errors
|HTTP Status Code|Error code|Meaning|
|:-:|:-:|-|
|200|ObjectNotFound|Publication with specified identifier was not found (or does not belong to your account).|
## `POST /api/v1/fbonline/publication/{id}`
Updates metadata of one publication or creates a new publication possibly attaching new source file.
### Request format
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
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|The publication identifier. `Id` from the [publication model](/fbonline/publication). When omitted, new publication is created.|
|`Name`|No|Publication name. When omitted existing publication name is left unchanged.|
|`Description`|No|Publication description. When omitted existing publication description is left unchanged.|
|`Url`|No|The URL of PDF file to create source for the publication from. URL must be publicly accessible at least for several minutes.|
|`Data`|No|Base64 encoded PDF file content to create source for the publication from.|
### Response format
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
In case when `Url` or `Data` is specified, the [Source](/fbonline/sources) entity is created implicitly.
:::
::: warning 
If `Url` or `Data` contain invalid value (inaccessible URL, not a PDF file, PDF exceeding limitations), source is marked as erroneous and, if it was the only source, the publication itself gets deleted.
:::
## `POST /api/v1/fbonline/publication/{id}/customize`
Updates publication customization (looks and behavior).
### Request format
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
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|The publication identifier. `Id` from the [publication model](/fbonline/publication). When omitted, new publication is created.|
|`HardCover`|No|Should hard cover be enabled for the publication.|
|`SetPasswordProtection`|No|How publication password protection should be handled. `keep` to keep existing configuration; `disable` to remove password protection; `manual` - specify password in the `ManualPassword` parameter; `numeric` to generate random password containing only digits; `auto` to generate random password.|
|`ManualPassword`|No|Password to set for the publication.|
|`GeneratePasswordLength`|No|The length of the generated random password.|
|`LogoUrl`|No|New URL for the company logo.|
|`EnableRtl`|No|Set the publication RTL mode.|
|`Theme`|No|Set then publication theme.|
### Response format
```json
{
  "Success": true,
  "Publication": { /* publication object */ }
}
```
|Property|Type|Description|
|-|-|-|
|`Publication`|object|The publication model. See [publication model description](/fbonline/publication).|
::: warning
Although you can set any customization data regardless of your account subscription plan, it will be filtered of not available features upon publication view. 
:::
## `DELETE /api/v1/fbonline/publication/{id}`
Deletes publication.
### Request format
```http request
DELETE /api/v1/fbonline/publication/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|The publication identifier. `Id` from the [publication model](/fbonline/publication). When omitted, new publication is created.|
### Response format
```json
{
  "Success": true
}
```