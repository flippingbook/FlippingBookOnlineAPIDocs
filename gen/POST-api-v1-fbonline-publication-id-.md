#### Update the metadata for one publication, possibly attaching a new source file.
`POST /api/v1/fbonline/publication/{id}`

With this method, your application may update the publication name and description, and possibly update 
the underlying PDF source file.
::: tip
When `url` or `data` are specified, the [Source](#the-source-entity) entity is created implicitly.
:::
::: warning 
If `url` or `data` contain invalid values (inaccessible URL, not a PDF file, PDF exceeding limitations),
the source is marked as erroneous and, if it was the only source, the publication itself gets deleted.
:::
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> Publication identifier.|
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|name|string|Publication name. When omitted, the current publication name is left unchanged.|
|description|string|Publication description. When omitted, the current publication description is left unchanged.|
|folder|string|Folder ID for the publication. When omitted, the current publication folder is left unchanged. When set to null, the publication is moved to the Home folder.|
|domain|string|Domain for the publication. When omitted, the current publication domain is left unchanged. Do not specify unless your account has custom domains.|
|filename|string|The name of your PDF file.|
|url|string|The URL of the PDF file that will be used to create the source for the publication. The URL must be publicly accessible for at least for several minutes.|
|data|string|Base64-encoded PDF file content that will be used to create the source for the publication.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|id|string|Unique publication identifier.|
|hashId|string|Publication identifier to use in URLs.|
|url|string|Canonical publication URL.|
|links|array|A set of HATEOAS links.|
|links.rel|string|The kind of relation with the linked resource.|
|links.type|string|The HTTP method to use with this link.|
|links.href|string|Link URL.|
|lastModified|string|Publication's last modification date.|
|createdSource|object||
|createdSource.success|boolean|Indicates whether your request was successful or not.|
|createdSource|object||
|createdSource.wellKnownError|string|Machine-readable error code.|
|createdSource.message|string|Human-readable error message.|
|createdSource.error|string|Detailed error code.|
|createdSource|object|Source creation result. Present only if `data` or `url` were specified in the request.|
|createdSource.id|string|Created source's identifier.|
