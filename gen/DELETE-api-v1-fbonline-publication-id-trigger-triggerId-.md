#### Delete account-wide trigger
`DELETE /api/v1/fbonline/publication/{id}/trigger/{triggerId}`

##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> The publication identifier.|
|<Badge>Path</Badge> triggerId|<Badge>REQUIRED</Badge> The trigger identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
