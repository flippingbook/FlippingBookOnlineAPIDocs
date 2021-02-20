#### List available folders.
`GET /api/v1/fbonline/folders`

With this method your application can list folders available to the current user.
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|folders|array|List of folders.|
|folders.id|number|Folder id.|
|folders.name|string|Folder name.|
