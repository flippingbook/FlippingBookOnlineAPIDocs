#### Create a new trigger
`POST /api/v1/fbonline/triggers`

With this method, your application may create new triggers. In order for the trigger to work properly, you should
set the trigger scope (`limitTo`), events, and an endpoint.
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|trigger|object||
|trigger.triggerOn|array|Trigger scope (`publication` or `trackedlink`). All triggers should be bound to a publication or a tracked link.|
|trigger.events|array|A list of events that should cause the trigger to fire.|
|trigger.endpoint|string|The endpoint of a webhook to call upon firing the trigger. When it is called, trigger data  and fire context are POSTed to your hook.|
|trigger.limitTo|object|Trigger scope. Can be `null` - in this case, the trigger should fire for specified events for all publications/tracked links in your account.|
|trigger.limitTo.parentObject|string|The scope of the trigger.|
|trigger.limitTo.parentObjectId|string||
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|id|string|Created trigger's identifier.|
