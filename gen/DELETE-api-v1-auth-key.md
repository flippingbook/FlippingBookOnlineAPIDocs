#### Revoke an existing API key
`DELETE /api/v1/auth/key`

This method irreversibly deletes the currently used API key.      
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
