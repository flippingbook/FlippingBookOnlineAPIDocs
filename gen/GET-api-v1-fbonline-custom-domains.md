#### List available custom domains.
`GET /api/v1/fbonline/custom-domains`

With this method your application can list custom domains available to the current user.
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates if your request has been successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|customDomainsEnabled|boolean|Custom domains available to the current user|
|customDomains|array|List of custom domain names.|
