#### Retrieve information about a publication by its identifier.
`GET /api/v1/fbonline/publication/{id}`

With this method, your application can retrieve information on one publication known by its identifier.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> Publication identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|publication|object||
|publication.id|string|Publication's unique identifier. It's permanent, none of your actions will change it.|
|publication.hashId|string|Publication identifier for URLs. Although it is automatically assigned to all publications,  it may be changed with the help of our support team, so you should not rely on this as a valid/unique publication identifier.|
|publication.name|string|Publication name.|
|publication.description|string|Publication description.|
|publication.links|array|A set of HATEOAS links.|
|publication.links.rel|string|The kind of relation with the linked resource.|
|publication.links.type|string|The HTTP method to use with this link.|
|publication.links.href|string|Link URL.|
|publication.state|string|Publication status. It may consist of any combination (comma separated) of the following values:  `Trashed` - the publication was moved to trash, but can still be restored;  `Deleted` - the publication was irreversibly deleted;  `CompletedAllStages` - the publication has at least one source that converted successfully;  `HasContent`, `Empty`, `Published` - internal statuses, do not rely on them.|
|publication.seoEnabled|boolean|Indicates whether SEO optimization is enabled for the publication. If true, that means web search indexing engines will see the text  content of your publication, and it will appear in our sitemap.|
|publication.ownerHashId|string|Publication owner identifier. Typically not used.|
|publication.contentRoot|string|Base URL for all publication assets. Files there are not public, so you cannot access them without viewing the actual publication (when allowed by its security policy).|
|publication.cover|string|Publication cover URL.|
|publication.canonicalLink|string|Canonical URL of the publication.|
|publication.totalPages|integer|The total number of pages in the publication. This will have a valid value once the publication source has completely converted.|
|publication.lastPdfName|string|The filename of the latest uploaded PDF source file.|
|publication.domain|string|The domain where the publication is located.|
|publication.folder|string|ID of the folder containing the publication.|
|publication.customizationOptions|object|Publication looks & behavior settings.|
|publication.customizationOptions.password|string|Password for password-protected publications.|
|publication.customizationOptions.hardcoverEnabled|boolean|Indicates whether a hardcover is enabled for the publication.|
|publication.customizationOptions.companyLogoEnabled|boolean|Indicates whether a company logo display is enabled for the publication.|
|publication.customizationOptions.companyLogoUrl|string|The URL that opens when people click on the company logo inside the publication.|
|publication.customizationOptions.rtlEnabled|boolean|Indicates whether the publication is in RTL mode (this is designed for Hebrew and Arabic publications, where the page flipping direction and controls layout are reversed).|
|publication.customizationOptions.theme|string|The selected skin for the publication.|
