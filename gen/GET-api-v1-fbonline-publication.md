#### List filtered and/or paged publications in the account
`GET /api/v1/fbonline/publication`

With this method, your application can retrieve a full/filtered list of publications in your account.
::: tip
By default, the result is paged by 10 publications. To get information on all your publications, you should either increase the `count`
value (max 1000), or fetch the next pages using the `offset` parameter.
:::
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Query</Badge> count|The number of publications to return. Defaults to 10.|
|<Badge>Query</Badge> offset|The starting number of publication to return. Defaults to 0.|
|<Badge>Query</Badge> query|Publication filter. In order to match, publication name must contain the exact `query` value.|
|<Badge>Query</Badge> hashid|Publication filter. In order to match, publication identifier (the number in the publication URL) must exactly match the `hashid` value.|
|<Badge>Query</Badge> url|Publication filter. In order to match, publication URL must exactly match the `url` value.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|total|integer|The total number of publications matching your request (disregarding offset/count).|
|publications|array|Matching publications.|
|publications.id|string|Publication's unique identifier. It is permanent, none of your actions will change it.|
|publications.hashId|string|Publication identifier for URLs. Although it is automatically assigned to all publications,  it may be changed with the help of our support team, so you should not rely on this as a valid/unique publication identifier.|
|publications.name|string|Publication name.|
|publications.description|string|Publication description.|
|publications.links|array|A set of HATEOAS links.|
|publications.links.rel|string|The kind of relation with the linked resource.|
|publications.links.type|string|The HTTP method to use with this link.|
|publications.links.href|string|Link URL.|
|publications.state|string|Publication status. It may consist of any combination (comma separated) of the following values:  `Trashed` - the publication was moved to trash, but can still be restored;  `Deleted` - the publication was irreversibly deleted;  `CompletedAllStages` - the publication has at least one source that converted successfully;  `HasContent`, `Empty`, `Published` - internal statuses, do not rely on them.|
|publications.seoEnabled|boolean|Indicates whether SEO optimization is enabled for the publication. If true, that means web search indexing engines will see the text  content of your publication, and it will appear in our sitemap.|
|publications.ownerHashId|string|Publication owner identifier. Typically not used.|
|publications.contentRoot|string|Base URL for all publication assets. Files there are not public, so you cannot access them without viewing the actual publication (when allowed by the publication's security policy).|
|publications.cover|string|Publication cover URL.|
|publications.canonicalLink|string|Canonical URL of the publication.|
|publications.totalPages|integer|The total number of pages in the publication. This will have a valid value once the publication source has completely converted.|
|publications.lastPdfName|string|The filename of the latest uploaded PDF source file.|
|publications.domain|string|The domain where the publication is located.|
|publications.folder|string|ID of the folder containing the publication.|
|publications.customizationOptions|object|Publication looks & behavior settings.|
|publications.customizationOptions.password|string|Password for password-protected publications.|
|publications.customizationOptions.hardcoverEnabled|boolean|Indicates whether a hardcover is enabled for the publication.|
|publications.customizationOptions.companyLogoEnabled|boolean|Indicates whether a company logo display is enabled for the publication.|
|publications.customizationOptions.companyLogoUrl|string|The URL that opens when people click on the company logo inside the publication.|
|publications.customizationOptions.rtlEnabled|boolean|Indicates whether the publication is in RTL mode (this is designed for Hebrew and Arabic publications, where the page flipping direction and controls layout are reversed).|
|publications.customizationOptions.theme|string|The selected skin for the publication.|
