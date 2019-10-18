#### List all API keys for your account
`GET /api/v1/auth/key`

This method lists all API keys in your account, including the one you're using to call it.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Query</Badge> accessToken|This parameter is required only if you omit `Authorization` HTTP header as a fallback authentication method. Value of  `accessToken` is a session access token from FlippingBook single sign-on service and could be obtained by visiting  `https://logon.flippingbook.com/myaccesstoken` while logged in to [FlippingBook account](https://flippingbook.com/account).|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|keys|array||
