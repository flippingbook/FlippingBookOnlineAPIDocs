#### 
`DELETE /api/v1/fbonline/tracked_links/hook/{triggerId}`

##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> triggerId|<Badge>REQUIRED</Badge> Trigger identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
