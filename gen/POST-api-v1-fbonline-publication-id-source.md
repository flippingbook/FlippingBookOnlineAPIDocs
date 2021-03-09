#### Create a new publication source
`POST /api/v1/fbonline/publication/{id}/source`

With this method your application may create source for the given publication. Source's PDF must be 
either base64 encoded and passed within request or (preferrably) made publicly available on the internet for
several minutes and passed as URL.
::: warning 
If `url` or `data` contain invalid value (inaccessible URL, not a PDF file, PDF exceeding limitations), source
is marked as erroneous and, if it was the only source, the publication itself gets deleted.
:::
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> The publication identifier.|
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|filename|string|The name of your PDF file.|
|url|string|The URL of PDF file to create source for the publication from. URL must be publicly  accessible at least for several minutes. The server would follow HTTP redirects however when it encounter any HTTP 200 response it will download it and use as PDF content disregarding Content-Type headers.|
|data|string|Base64 encoded PDF file content to create source for the publication from.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates if your request has been successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|id|string|Created source's identifier.|
