#### List all API keys for your account
`GET /api/v1/auth/key`

This method lists all API keys for your account, including the one you are using to call it.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Query</Badge> accessToken|This parameter is required only if you omit the `Authorization` HTTP header as a fallback authentication method. The value of  `accessToken` is your session access token from FlippingBook-its single sign-on service. To obtain it, visit  `https://logon.flippingbook.com/myaccesstoken` while logged in to your [FlippingBook account](https://flippingbook.com/account).|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|keys|array|An array of active keys for your account.|
