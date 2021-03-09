#### List tracked links
`GET /api/v1/fbonline/tracked_links`

This method allows your application to retrieve list of tracked links in your account. Although tracked 
links are bound to publications they can be fetched in account context for all publications at once.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Query</Badge> title|Link filter. In order to match tracked link title must exactly contain `title` value.|
|<Badge>Query</Badge> publication-hashid|Link filter. In order to match parent publication must have its URL identifier matching `publication-hashid` value.|
|<Badge>Query</Badge> publication-uid|Link filter. In order to match parent publication must have its unique identifier matching `publication-uid` value.|
|<Badge>Query</Badge> publication-url|Link filter. In order to match parent publication URL must exactly match `publication-url` value.|
|<Badge>Query</Badge> count|Number of links to return. Defaults to 10.|
|<Badge>Query</Badge> offset|Starting number of link to return. Defaults to 0.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates if your request has been successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|total|integer|Total number of links matching request (disregarding offset/count).|
|userTotal|integer|Total number of links in your account (disregarding filters/offset/count).|
|links|array|List of links matching your filter.|
|links.id|string|Link unique identifier.|
|links.title|string|Link title (visible only to link owner, not end-user).|
|links.state|string|Link state. It may consist of any combination (comma separated) of the following values: `WithNewData` - there is some 'unseen' statistics collected for the link; `WithoutNewData` - there is no 'unseen' statistics for the link; `Active` - link is active and enabled; `Deleted` - link was deleted and unavailable to end-users (readers); `Expired` - link's lifetime ended - it was not clicked before set expiration time.|
|links.createdAt|string|Link creation timestamp. ISO 8601 date format.|
|links.urlName|string|Unique URL part for the link. To get full URL you should prefix it with `https://online.flippingbook.com/link/` (for the default domain).|
|links.triggerId|string|Trigger identifier for the link.|
|links.shortStats|object|View statistics for the link.|
|links.shortStats.fullStats|object|Statistics for tracked link|
|links.shortStats.fullStats.lastViewedAt|string|Date/time of last view, ISO 8601 format.|
|links.shortStats.fullStats.viewDuration|number|Total viewing time (seconds).|
|links.shortStats.fullStats.visits|number|Total number of views.|
|links.shortStats.sinceLastUpdate|object|Statistics for tracked link|
|links.shortStats.sinceLastUpdate.lastViewedAt|string|Date/time of last view, ISO 8601 format.|
|links.shortStats.sinceLastUpdate.viewDuration|number|Total viewing time (seconds).|
|links.shortStats.sinceLastUpdate.visits|number|Total number of views.|
|links.publication|object|Parent publication excerpt.|
|links.publication.id|object|Parent publication identifiers.|
|links.publication.id.id|string|Parent publication unique identifier.|
|links.publication.id.hashId|string|Parent publication URL identifier.|
|links.publication.title|string|Parent publication name.|
|links.publication.url|string|Parent publication canonical URL.|
|links.triggers|object|Triggers for the link.|
|links.triggers.onView|object|View trigger for the link.|
|links.triggers.onView.enabled|boolean|Is this trigger enabled.|
|links.triggers.onView.amount|number|How many times this trigger is allowed to fire.|
|links.triggers.onDownload|object|Download trigger for the link.|
|links.triggers.onDownload.enabled|boolean|Is this trigger enabled.|
|links.triggers.onNotOpenedUntil|object|Link not opened before trigger for the link.|
|links.triggers.onNotOpenedUntil.enabled|boolean|Is this trigger enabled.|
|links.triggers.onNotOpenedUntil.until|string|When this trigger should fire.|
|links.triggers.triggerVia|string|Trigger delivery method. Can be one of the following values:  `Email` - notify via email;  `Zapier` - notify via [zapier](https://zapier.com/) integration.|
