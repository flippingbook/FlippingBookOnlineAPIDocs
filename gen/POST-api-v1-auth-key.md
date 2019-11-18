#### Create a new API key for your account
`POST /api/v1/auth/key`

This method creates a new API key for your account. You must be authorized either with HTTP Bearer authorization scheme with an existing
API key or with session access token from FlippingBook single sign-on service.
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|accessToken|string|This parameter is required only if you omit `Authorization` HTTP header as a fallback authentication method. Value of  `accessToken` is a session access token from FlippingBook single sign-on service and could be obtained by visiting  `https://logon.flippingbook.com/myaccesstoken` while logged in to [FlippingBook account](https://flippingbook.com/account).|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|key|string|Newly created key for accessing your account via API.|
