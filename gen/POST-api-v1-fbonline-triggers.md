#### Create a new trigger
`POST /api/v1/fbonline/triggers`

With this method your application may create new triggers. In order for trigger to work properly you should
set trigger scope (`limitTo`), events and endpoint.
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|trigger|object||
|trigger.triggerOn|string|Scope type of the trigger.|
|trigger.events|array|List of events for which the trigger shoud fire.|
|trigger.endpoint|string|Endpoint of webhook to call upon firing the trigger. When it is called, trigger data  and fire context are POSTed to your hook.|
|trigger.limitTo|object|Trigger scope. Can be `null` - in this case trigger should fire for specified events for all books/tracked links in your account.|
|trigger.limitTo.parentObject|string|Scope type of the trigger.|
|trigger.limitTo.parentObjectId|string||
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|id|string|Created trigger identifier.|
