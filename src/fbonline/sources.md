---
title: The Source Entity
---
# The `Source` Entity
Publication sources represent publication's content. More than one source may be added to each publication however only last converted source will be displayed to end-users (readers). For now the only supported format for the source is single PDF file which must be not password-protected and does not contain XFA (forms). There's a limit on PDF file size (500Mb) and number of pages (2000).

::: warning
Once created, sources cannot be updated and/or deleted. On creation they are put into conversion queue and activated (so the publication displays it) when conversion finished.
:::

## `GET /api/v1/fbonline/publication/{id}/source`
Lists all sources for the given publication.
### Request format
```http request
GET /api/v1/fbonline/publication/{id}/source HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Publication identifier. Sources can only be listed for one publication at a time.|
### Response format
```json
{
  "Success": true,
  "Sources": [ { /* source object */ } ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](/fbonline/source).|
 
## `GET /api/v1/fbonline/publication/{id}/source/{source-id}`
Retrieves information about one single source. 
### Request format
```http request
GET /api/v1/fbonline/publication/{id}/source/{source-id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Publication identifier.|
|`source-id` <Badge>From path</Badge>|Yes|Source identifier.|
### Response format
```json
{
  "Success": true,
  "Sources": { /* source object */ }
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](/fbonline/source) (one element).|

## `POST /api/v1/fbonline/publication/{id}/source`
Creates a new publication source. 
### Request format
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
### Response format
```json
{
  "Success": true,
  "Sources": [ { /* source object */ } ]
}
```
|Property|Type|Description|
|-|-|-|
|`Sources`|array of objects|Array of [source objects](/fbonline/source) (one created element).|
