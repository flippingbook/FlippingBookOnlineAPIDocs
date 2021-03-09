#### List filtered and/or paged publications in the account
`GET /api/v1/fbonline/publication`

With this method your application can retrieve the list of all publications in your account.
::: tip
By default result is paged by 10 publications. To get information on all your publications you should either increase `count`
value (max 1000), or fetch next pages using `offset` parameter.
:::
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Query</Badge> count|Number of publications to return. Defaults to 10.|
|<Badge>Query</Badge> offset|Starting number of publication to return. Defaults to 0.|
|<Badge>Query</Badge> query|Publication filter. In order to match publication name must exactly contain `query` value.|
|<Badge>Query</Badge> hashid|Publication filter. In order to match publication's identifier (the number in the publication URL) must exactly match `hashid` value.|
|<Badge>Query</Badge> url|Publication filter. In order to match publication URL must exactly match `url` value.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates if your request has been successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|total|integer|Total number of publications matching request (disregarding offset/count).|
|publications|array|Matching publications.|
|publications.id|string|Publication unique identifier. This one will never change whatever you do with the publication.|
|publications.hashId|string|Publication identifier for URLs. Although it is automatically assigned to all publications  it may change with the help of our support team, so you should not rely on this as a valid/unique publication identifier.|
|publications.name|string|Publication name.|
|publications.description|string|Publication description.|
|publications.links|array|A set of HATEOAS links.|
|publications.links.rel|string|Kind of relation with linked resource.|
|publications.links.type|string|HTTP method to use with this link.|
|publications.links.href|string|Link URL.|
|publications.state|string|Publication status. It may consist of any combination (comma separated) of the following values:  `Trashed` - publication was moved to trash, restoration possible;  `Deleted` - publication was irreversibly deleted;  `CompletedAllStages` - publication has at least one source that converted successfully;  `HasContent`, `Empty`, `Published` - internally used statuses, do not rely on them.|
|publications.seoEnabled|boolean|Is SEO optimization enabled for the publication. That means web search indexing engines will see text  content of your publication and is will appear in our sitemap.|
|publications.ownerHashId|string|Publication owner identifier. You would probably never need it.|
|publications.contentRoot|string|Base URL for all publication assets. Files there are not public, so you cannot access them without viewing actual publication (when it is allowed by publication's security policy).|
|publications.canonicalLink|string|Canonical URL of the publication.|
|publications.totalPages|integer|Total number of pages in the publication. This will have valid value once the publication source has completely converted.|
|publications.lastPdfName|string|The filename of the latest uploaded PDF source file.|
|publications.customizationOptions|object|Publication looks & behavior settings.|
|publications.customizationOptions.password|boolean|Password for password-protected publications.|
|publications.customizationOptions.hardcoverEnabled|boolean|Is hardcover enabled for the publication.|
|publications.customizationOptions.companyLogoEnabled|boolean|Is company logo display enabled for the publications.|
|publications.customizationOptions.companyLogoUrl|boolean|URL which is open on company logo clicks.|
|publications.customizationOptions.rtlEnabled|boolean|Is publication in RTL mode (this is designed for Hebrew and Arabic publications, where page flipping direction and controls layout must be reversed).|
|publications.customizationOptions.theme|string|Selected skin for the publication.|
