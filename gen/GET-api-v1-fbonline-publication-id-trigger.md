#### List all triggers for the given publication
`GET /api/v1/fbonline/publication/{id}/trigger`

##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> |
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|webhooks|array|List of publication triggers|
|webhooks.name|string|Description of a trigger. It is not seen anywhere but via API.|
|webhooks.endpoint|string|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|webhooks.events|array|Event names for which this trigger should fire.|
