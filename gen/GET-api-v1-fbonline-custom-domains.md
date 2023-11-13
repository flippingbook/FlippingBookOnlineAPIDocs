#### List all available custom domains.
`GET /api/v1/fbonline/custom-domains`

With this method, your application can list custom domains available to the current user.
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|customDomainsEnabled|boolean|Whether custom domains are available to the current user.|
|customDomains|array|List of custom domain names.|
