---
title: The `Key` Entity
---
# The `Key` Entity
The `Key` entity represent an API key used to access all other APIs.

## `GET /api/v1/auth/key`
Lists all API keys for your account. 
### Request format
```http request
GET /api/v1/auth/key?accessToken=string HTTP/1.1
Host: api-tc.is.flippingbook.com
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

## `POST /api/v1/auth/key`
Creates a new API key for your account.
### Request format
```http request
POST /api/v1/auth/key HTTP/1.1
Host: api-tc.is.flippingbook.com

{
  "accessToken": String
}
```
|Parameter|Required?|Description|
|-|:-:|-|
|`accessToken`|Yes|Value of `accessToken` is a session access token from FlippingBook single sign-on service and could be obtained by visiting `https://logon.flippingbook.com/myaccesstoken` while logged in to [FlippingBook account](https://flippingbook.com/account).|
### Response format
```json
{
  "Success": true,
  "Key": String
}
```
|Property|Type|Description|
|-|-|-|
|`Key`|string|Your new API key.|
### Errors
|HTTP Status Code|Error code|Meaning|
|:-:|:-:|-|
|200|KeyLimitExceeded|Your account already has ten API keys. You cannot create more.|
|200|InvalidAccessToken|The value of supplied `accessToken` is invalid.|
## `DELETE /api/v1/auth/key`
Revokes existing API key.
### Request format
```http request
DELETE /api/v1/auth/key HTTP/1.1
Host: api-tc.is.flippingbook.com
```

### Response format
```json
{
  "Success": true
}
```
::: tip
By calling this method your current used API key is revoked.
:::
## `GET /api/v1/auth/me`
Gets information about current account. This method is primarily designed for API key testing and has no other meaningful purpose.
### Request format
```http request
GET /api/v1/auth/me HTTP/1.1
Host: api-tc.is.flippingbook.com
```
### Response format
```json
{
  "Success": true,
  ...
}
```
::: warning
This method is primarily designed for API key testing and has no other meaningful purpose. Thus, it's response format is not standardized and subject to change without notice and/or proper versioning.
:::