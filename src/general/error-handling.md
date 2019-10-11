---
title: Error Handling
---

# Handling Errors
## General Rules
All API calls may return errors for your requests. We have standardized error format for all responses unless stated explicitly in the API call description.
All responses should follow this structure:

```json
{
  "Success": true | false,
  "Timestamp": String,
  "Error": undefined | null | { /* single error object */ }
  "Errors": undefined | null | [{ /* single error object */ }, ...]
}
```
The `Success` property shows general status of the API call, whether is has succeeded or not. In most case it is enough to handle only cases with
`Success == true` and ignore/throw errors when `Success == false`. 

The `Timestamp` property contains response timestamp in ISO 8601 format.

The `Error` and `Errors` properties are mutually exclusive and contain one or many error objects (description follows).
 Although `Errors` may contain zero or one error object.

Every single error object has the following structure:
```json
{
  "WellKnownError": Number | String,
  "ErrorCode": undefined | String,
  "Message": undefined | null | String
}
```
Here the `WellKnownError` and `ErrorCode` are machine-readable error codes, and the `Message` is for human use.

## HTTP Status Mapping
Although error/success state may be easily read from response body the HTTP status is used to indicate success too.
Successful calls should end with 200 OK status, and unsuccessful ones would have 4xx or 5xx errors.

## Universal Errors Codes
Most error codes are application/call specific, however some universally returnable codes exist:
| HTTP Status Code | Error code | Meaning |
|:-:|:-:|-|
|400|InvalidData|The request body cannot be parsed as JSON.|
|401|NoAuthorizationHeader|Your request does not include `Authorization` HTTP header.|
|401|BadAuthorizationType|HTTP Authorization scheme is not `Bearer`.|
|403|InvalidApiKey|The API key supplied in the `Authorization` header is invalid.|
|404|NotFound|The endpoint specified in your request (combination of HTTP method and path) does not exist.|
|429|RateLimitExceeded|Your application calls our API too fast and has exceeded [rate limit](/general/limitations).|
