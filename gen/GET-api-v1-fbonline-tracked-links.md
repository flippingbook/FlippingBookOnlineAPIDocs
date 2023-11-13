#### List tracked links
`GET /api/v1/fbonline/tracked_links`

This method allows your application to retrieve a list of all tracked links created for your account. Although tracked 
links are bound to individual publications, they can be fetched in the account context for all publications at once.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Query</Badge> title|Link filter. In order to match, the tracked link's title must contain the exact `title` value.|
|<Badge>Query</Badge> publication-hashid|Link filter. In order to match, the parent publication must have its URL identifier matching the `publication-hashid` value.|
|<Badge>Query</Badge> publication-uid|Link filter. In order to match, the parent publication must have its unique identifier matching the `publication-uid` value.|
|<Badge>Query</Badge> publication-url|Link filter. In order to match, the parent publication URL must exactly match the `publication-url` value.|
|<Badge>Query</Badge> count|The number of links to return. Defaults to 10.|
|<Badge>Query</Badge> offset|The starting number of links to return. Defaults to 0.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|total|integer|The total number of links matching your request (disregarding offset/count).|
|userTotal|integer|The total number of links in your account (disregarding filters/offset/count).|
|links|array|A list of links matching your filters.|
|links.id|string|Link's unique identifier.|
|links.title|string|Link title (visible only to the link owner, not to end-users).|
|links.state|string|Link state. It may consist of any combination (comma separated) of the following values: `WithNewData` - there are some new statistics collected for the link which you haven't seen via your account (views via API do not count); `WithoutNewData` - there are no 'unseen' statistics for the link; `Active` - the link is active and enabled; `Deleted` - the link was deleted and unavailable to end-users (readers); `Expired` - the link's lifetime has ended since it was not clicked on before the set expiration time.|
|links.createdAt|string|Link creation timestamp. ISO 8601 date format.|
|links.urlName|string|The unique URL part of the link. To get the full URL, you should prefix it with `https://online.flippingbook.com/link/` (for the default domain).|
|links.triggerId|string|Trigger identifier for the link.|
|links.shortStats|object|View statistics for the link.|
|links.shortStats.fullStats|object|Statistics for the tracked link.|
|links.shortStats.fullStats.lastViewedAt|string|Date/time of the last view, ISO 8601 format.|
|links.shortStats.fullStats.viewDuration|number|Total viewing time (seconds).|
|links.shortStats.fullStats.visits|number|Total number of views.|
|links.shortStats.sinceLastUpdate|object|Statistics for the tracked link.|
|links.shortStats.sinceLastUpdate.lastViewedAt|string|Date/time of the last view, ISO 8601 format.|
|links.shortStats.sinceLastUpdate.viewDuration|number|Total viewing time (seconds).|
|links.shortStats.sinceLastUpdate.visits|number|Total number of views.|
|links.publication|object|Parent publication excerpt.|
|links.publication.id|object|Parent publication identifiers.|
|links.publication.id.id|string|Parent publication's unique identifier.|
|links.publication.id.hashId|string|Parent publication's URL identifier.|
|links.publication.title|string|Parent publication's name.|
|links.publication.url|string|Parent publication's canonical URL.|
|links.triggers|object|Triggers for the link.|
|links.triggers.onView|object|The view trigger for the link.|
|links.triggers.onView.enabled|boolean|Indicates whether this trigger is enabled.|
|links.triggers.onView.amount|number|The number of times that this trigger is allowed to fire.|
|links.triggers.onDownload|object|The download trigger for the link.|
|links.triggers.onDownload.enabled|boolean|Indicates whether this trigger is enabled.|
|links.triggers.onNotOpenedUntil|object|'Link not opened before a set date' trigger for the link.|
|links.triggers.onNotOpenedUntil.enabled|boolean|Indicates whether this trigger is enabled.|
|links.triggers.onNotOpenedUntil.until|string|When this trigger should fire.|
|links.triggers.triggerVia|string|Trigger delivery method. Can be one of the following values:  `Email` - notify via email;  `Zapier` - notify via [Zapier/API](https://zapier.com/) integration.|
