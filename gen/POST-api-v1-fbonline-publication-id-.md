#### Update metadata of one publication possibly attaching new source file.
`POST /api/v1/fbonline/publication/{id}`

With this method your application may update publication name and description and possibly update 
underlaying PDF source file.
::: tip
In case when `url` or `data` is specified, the [Source](#the-source-entity) entity is created implicitly.
:::
::: warning 
If `url` or `data` contain invalid value (inaccessible URL, not a PDF file, PDF exceeding limitations),
source is marked as erroneous and, if it was the only source, the publication itself gets deleted.
:::
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> The publication identifier.|
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|name|string|Publication name. When omitted existing publication name is left unchanged.|
|description|string|Publication description. When omitted existing publication description is left unchanged.|
|filename|string|The name of your PDF file.|
|url|string|The URL of PDF file to create source for the publication from. URL must be publicly accessible at least for several minutes.|
|data|string|Base64 encoded PDF file content to create source for the publication from.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|id|string|Unque publication identifier.|
|hashId|string|Publication identifier for use in URLs.|
|url|string|Canonical publication URL.|
|links|array|A set of HATEOAS links.|
|links.rel|string|Kind of relation with linked resource.|
|links.type|string|HTTP method to use with this link.|
|links.href|string|Link URL.|
|lastModified|string|Publication last modification date.|
|createdSource|object||
|createdSource.success|boolean|Indicates wheter your request was succesful or not.|
|createdSource|object||
|createdSource.wellKnownError|string|Machine-readable error code.|
|createdSource.message|string|Human-readable error message.|
|createdSource.error|string|Detailed error code.|
|createdSource|object|Source creation result. Present only if `data` or `url` was specified in the request.|
|createdSource.id|string|Created source's identifier.|
