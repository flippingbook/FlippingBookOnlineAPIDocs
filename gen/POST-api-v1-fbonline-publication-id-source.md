#### Create a new publication source
`POST /api/v1/fbonline/publication/{id}/source`

With this method, your application may create a new source for a given publication. Source's PDF must be 
either Base64-encoded and passed within the request, or, preferably, made publicly available on the internet for
several minutes and passed as a URL.
::: warning 
If `url` or `data` contain invalid values (inaccessible URL, not a PDF file, PDF exceeding limitations), the source
is marked as erroneous and, if it was the only source, the publication itself gets deleted.
:::
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> Publication identifier.|
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|filename|string|The name of your PDF file.|
|url|string|The URL of the PDF file that will be used to create the source for the publication. The URL must be publicly  accessible for at least for several minutes. The server will follow HTTP redirects, however, when it encounters any kind of HTTP 200 response, it will download the file and and use it as PDF content disregarding the Content-Type headers.|
|data|string|Base64-encoded PDF file content that will be used to create the source for the publication.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|id|string|The created source's identifier.|
