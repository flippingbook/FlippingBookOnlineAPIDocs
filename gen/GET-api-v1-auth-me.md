#### Get information about current account (testing)
`GET /api/v1/auth/me`

By using it you may tell that your API key works and your application may authorize itself in the API.
::: warning
This method is primarily designed for API key testing and has no other meaningful purpose. Thus, it's response format is not standardized and subject to change without notice and/or proper versioning.
:::
##### Response format
|Name|Type|Description|
|-|-|-|
|id|integer|User identifier.|
|email|string|User email address.|
