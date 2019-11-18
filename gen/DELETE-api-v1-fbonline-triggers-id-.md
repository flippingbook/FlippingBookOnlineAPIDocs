#### Delete the trigger
`DELETE /api/v1/fbonline/triggers/{id}`

With this method your application may delete trigger by its identifier. After deletion the trigger 
will be fired no more neither it will be accounted towards account limit.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> The trigger identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|id|string|Deleted trigger identifier.|
