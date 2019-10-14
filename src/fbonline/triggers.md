---
title: Event Triggers/Hooks
sidebarDepth: 2
---
# Event Triggers
::: danger
Triggers/hooks API is not stabilized yet. It may change in the current API version without prior notice.
:::

Triggers and hooks provide a way for your application to react to different FlippingBook Online generated events. They can be defined on multiple layers to handle events in different scopes:
- Account-wide triggers: notify about events on any account publication or tracked link.
- Publication level triggers: notify about events on one publication and all tracked links bound to it.
- Tracked link level triggers: notify about events on one tracked link.

## Account Level Triggers
### `GET /api/v1/fbonline/webhook`
Lists all account-wide triggers. 
#### Request format
```http request
GET /api/v1/fbonline/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
#### Response format
```json
{
  "Success": true,
  "Webhooks": [ /* trigger object */, ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Webhooks`|array of objects|Array of [trigger objects](/fbonline/trigger) defined for your account.|

### `POST /api/v1/fbonline/webhook/{id}`
Creates/updates account-wide trigger. 
#### Request format
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
#### Response format
```json
{
  "Success": true,
  "Id": String
}
```
|Property|Type|Description|
|-|-|-|
|`Id`|string|Unique identifier of created/updated trigger.|

### `DELETE /api/v1/fbonline/webhook/{id}`
Deletes account-wide trigger. 
#### Request format
```http request
DELETE /api/v1/fbonline/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|No|Trigger identifier.|
#### Response format
```json
{
  "Success": true
}
```

## Publication Level Triggers
### `GET /api/v1/fbonline/publication/{publication-id}/trigger`
Lists all triggers for the given publication. 
#### Request format
```http request
GET /api/v1/fbonline/publication/{publication-id}/trigger HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`publication-id` <Badge>From path</Badge>|No|Publication identifier.|
#### Response format
```json
{
  "Success": true,
  "Triggers": [ /* trigger object */, ... ]
}
```
|Property|Type|Description|
|-|-|-|
|`Webhooks`|array of objects|Array of [trigger objects](/fbonline/trigger) defined for your publication.|

### `POST /api/v1/fbonline/publication/{publication-id}/trigger/{id}`
Creates/updates publication level trigger. 
#### Request format
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
#### Response format
```json
{
  "Success": true,
  "Id": String
}
```
|Property|Type|Description|
|-|-|-|
|`Id`|string|Unique identifier of created/updated trigger.|

### `DELETE /api/v1/fbonline/publication/{publication-id}/trigger/{id}`
Deletes publication level trigger. 
#### Request format
```http request
DELETE /api/v1/fbonline/publication/{publication-id}/trigger/webhook HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`publication-id` <Badge>From path</Badge>|No|Publication identifier.|
|`id` <Badge>From path</Badge>|Yes|Trigger identifier.|
#### Response format
```json
{
  "Success": true
}
```

## Tracked Link Level Triggers
### `POST /api/v1/fbonline/tracked_links/hook/{id}`
Updates tracked link notification trigger. 
#### Request format
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

### `DELETE /api/v1/fbonline/tracked_links/hook/{id}`
Deletes tracked link notification trigger. 
#### Request format
```http request
DELETE /api/v1/fbonline/tracked_links/hook/{id} HTTP/1.1
Host: api-tc.is.flippingbook.com
```
|Parameter|Required?|Description|
|-|:-:|-|
|`id` <Badge>From path</Badge>|Yes|Link trigger identifier.|
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
