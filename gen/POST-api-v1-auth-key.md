#### Create a new API key for your account
`POST /api/v1/auth/key`

This method creates a new API key for your account. You must be authorized either with the HTTP Bearer authorization scheme with an existing
API key or with your session access token from FlippingBook-its single sign-on service.
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|accessToken|string|This parameter is required only if you omit the `Authorization` HTTP header as a fallback authentication method. The value of  `accessToken` is a session access token from FlippingBook-its single sign-on service. To obtain it, visit  `https://logon.flippingbook.com/myaccesstoken` while logged in to your [FlippingBook account](https://flippingbook.com/account).|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|key|string|The new key for accessing your account via API.|
