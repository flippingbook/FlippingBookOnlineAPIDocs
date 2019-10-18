#### Retrieve information about one publication by its identifier.
`GET /api/v1/fbonline/publication/{id}`

With this method your application can retrieve information on one publication known by its identifier.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> The publication identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|publication|object||
|publication.id|string|Publication unique identifier. This one will never change whatever you do with the publication.|
|publication.hashId|string|Publication identifier for URLs. Although it is automatically assigned to all publications  it may change with the help of our support team, so you should not rely on this as a valid/unique publication identifier.|
|publication.name|string|Publication name.|
|publication.description|string|Publication description.|
|publication.links|array|A set of HATEOAS links.|
|publication.links.rel|string|Kind of relation with linked resource.|
|publication.links.type|string|HTTP method to use with this link.|
|publication.links.href|string|Link URL.|
|publication.state|string|Publication status. It may consist of any combination (comma separated) of the following values:  `Trashed` - publication was moved to trash, restoration possible;  `Deleted` - publication was irreversibly deleted;  `CompletedAllStages` - publication has at least one source that converted successfully;  `HasContent`, `Empty`, `Published` - internally used statuses, do not rely on them.|
|publication.seoEnabled|boolean|Is SEO optimization enabled for the publication. That means web search indexing engines will see text  content of your publication and is will appear in our sitemap.|
|publication.ownerHashId|string|Publication owner identifier. You would probably never need it.|
|publication.contentRoot|string|Base URL for all publication assets. Files there are not public, so you cannot access them without viewing actual publication (when it is allowed by publication's security policy).|
|publication.canonicalLink|string|Canonical URL of the publication.|
|publication.totalPages|integer|Total number of pages in the publication. This will have valid value once the publication source has completely converted.|
|publication.lastPdfName|string|The filename of the latest uploaded PDF source file.|
|publication.customizationOptions|object|Publication looks & behavior settings.|
|publication.customizationOptions.password|boolean|Password for password-protected publications.|
|publication.customizationOptions.hardcoverEnabled|boolean|Is hardcover enabled for the publication.|
|publication.customizationOptions.companyLogoEnabled|boolean|Is company logo display enabled for the publications.|
|publication.customizationOptions.companyLogoUrl|boolean|URL which is open on company logo clicks.|
|publication.customizationOptions.rtlEnabled|boolean|Is publication in RTL mode (this is designed for Hebrew and Arabic publications, where page flipping direction and controls layout must be reversed).|
|publication.customizationOptions.theme|string|Selected skin for the publication.|
