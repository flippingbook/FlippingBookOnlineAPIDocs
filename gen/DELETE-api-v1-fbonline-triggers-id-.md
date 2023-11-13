#### Delete a trigger
`DELETE /api/v1/fbonline/triggers/{id}`

With this method, your application may delete a trigger by its identifier. After a trigger is deleted, it won't
fire anymore and won't be accounted towards your account limit.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> Trigger identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|id|string|Deleted trigger's identifier.|
