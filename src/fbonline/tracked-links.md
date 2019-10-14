---
title: The Tracked Link Entity
---
# The `Tracked Link` Entity
The tracked link is a special link (URL) for the publication with separate statistics and event handling. For example you may have a link which sends you (author) an email when it is opened for the first time.

Each link has separate object for handling its events called [trigger](/fbonline/triggers). Link-bound triggers are altered with link's API calls [POST trigger](/fbonline/triggers#post-api-v1-fbonline-tracked-links-hook-id) and [DELETE trigger](/fbonline/triggers#delete-api-v1-fbonline-tracked-links-hook-id).


## `GET /api/v1/fbonline/tracked_links`
Lists tracked links.
### Request format
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
### Response format
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

## `GET /api/v1/fbonline/tracked_links/{id}`
Retrieves information about one tracked link. 
### Request format
```http request
GET /api/v1/fbonline/tracked_links/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id <Badge>From path</Badge>`|Yes|Tracked link identifier.|
### Response format
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

## `POST /api/v1/fbonline/tracked_links`
Creates a new tracked link. 
### Request format
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
### Response format
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

## `PUT /api/v1/fbonline/tracked_links/{id}`
Modifies or deleted specified tracked link. 
### Request format
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
### Response format
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
