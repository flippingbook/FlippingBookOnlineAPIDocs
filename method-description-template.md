## `VERB /api/v1/path`
Краткое описание в "It-" виде, т.е. "It creates some foo." без "It". Не забудь поставить в конце точку. 
### Request format
```http request
VERB /api/v1/path HTTP/1.1
Host: api-tc.is.flippingbook.com

Тело запроса....
```
|Parameter|Required?|Description|
|-|:-:|-|
|`название параметра`|Yes/No/Sometimes|Описание параметра.|
### Response format
```json
{
  "Success": true,
  "Key": String
}
```
|Property|Type|Description|
|-|-|-|
|`название поля`|string|Описание поля.|
### Errors
|HTTP Status Code|Error code|Meaning|
|:-:|:-:|-|
|200|KeyLimitExceeded|Описание ошибки.|
::: tip
Какие-то примечания
:::