#### Create a new publication possibly attaching new source file.
`POST /api/v1/fbonline/publication`

Using this method your application may create publication and initial source file in one request. As an
alternative, source file might be ommitted and created later with corresponding call.
::: tip
In case when `url` or `data` is specified, the [Source](#the-source-entity) entity is created implicitly.
:::
::: warning
If `url` or `data` contain invalid value (inaccessible URL, not a PDF file, PDF exceeding limitations),
source is marked as erroneous and, if it was the only source, the publication itself gets deleted.
:::
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|name|string|Publication name. When omitted existing publication name is left unchanged.|
|description|string|Publication description. When omitted existing publication description is left unchanged.|
|folder|string|Folder id for the publication. When folder id is omitted, then the publication's folder is left unchanged. When it is set to null, the publication is moved to the Home folder.|
|domain|string|Domain for the publication. When domain is omitted, then the publication's domain is left unchanged. When your account does not have custom domains then the domain should be omitted.|
|filename|string|The name of your PDF file.|
|url|string|The URL of PDF file to create source for the publication from. URL must be publicly accessible at least for several minutes.|
|data|string|Base64 encoded PDF file content to create source for the publication from.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates if your request has been successful or not.|
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
|createdSource.success|boolean|Indicates if your request has been successful or not.|
|createdSource|object||
|createdSource.wellKnownError|string|Machine-readable error code.|
|createdSource.message|string|Human-readable error message.|
|createdSource.error|string|Detailed error code.|
|createdSource|object|Source creation result. Present only if `data` or `url` was specified in the request.|
|createdSource.id|string|Created source's identifier.|
