---
title: The `Key` Entity
---
# The `Key` Entity
The `Key` entity represent an API key used to access all other APIs.

## `GET /api/v1/auth/key`
Lists all API keys for your account. In order to call that method you must know 
### Request format
```http request
GET /api/v1/auth/key?accessToken=string
```
|Parameter|Required?|Description|
|-|:-:|-|
|`accessToken`|No|This parameter is required only if you omit `Authorization` HTTP header as a fallback authentication method. Value of `accessToken` is a session access token from FlippingBook single sign-on service and could be obtained by visiting `https://logon.flippingbook.com/myaccesstoken` while logged in to [FlippingBook account](https://flippingbook.com/account).|
### Response format
```json
{
  "Success": true,
  "Keys": [
    String,
    String,
    ...
  ]
}
```
|Property|Type|Description|
|-|-|-|
|`Keys`|array of strings|The list of API keys active for your account.|
::: tip
This call might be made without `Authorization` header yet you must supply `accessToken` parameter as a fallback. If `Authorization` header is present, it takes precedence even if its value is invalid.
:::
### Errors


## `POST /api/v1/auth/key`
## `DELETE /api/v1/auth/key`  
## `GET /api/v1/auth/me`
