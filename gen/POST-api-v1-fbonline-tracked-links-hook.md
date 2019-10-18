#### 
`POST /api/v1/fbonline/tracked_links/hook`

##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|name|string|Description of a trigger. It is not seen anywhere but via API.|
|endpoint|string|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|events|array|Event names for which this trigger should fire.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|uid|string|Created trigger identifier.|
