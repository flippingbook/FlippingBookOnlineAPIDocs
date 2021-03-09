#### Delete publication
`DELETE /api/v1/fbonline/publication/{id}`

With this method your application can mark publication for deletion.
::: tip
Publications are not deleted immediately, instead they are put into 'deleted' state and deleted irreversibly after a period of time.
:::
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> The publication identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates if your request has been successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
