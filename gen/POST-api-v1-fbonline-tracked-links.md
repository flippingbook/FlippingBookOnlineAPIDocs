#### Create a new tracked link
`POST /api/v1/fbonline/tracked_links`

With this method, your application may create a new tracked link for an existing publication.
##### Parameters in request body
|Name|Type|Description|
|-|-|-|
|title|string|The tracked link's title (visible only to link owner, not to end-users).|
|publicationUid|string|Publication's unique identifier for the created link.|
|publicationHashId|string|Publication's URL identifier for the created link.|
|publicationUrl|string|Publication URL for the created link.|
|notificationType|string|Notification delivery method for link events. Can be one of the following values: `Email` - notify via email;  `Zapier` - notify via [Zapier/API](https://zapier.com/) integration.|
|onViewTriggerSingle|boolean|Whether a notification should be delivered when the link is opened for the first time.|
|onViewTrigger|boolean|Whether a notification should be delivered when the link is opened for the first 10 times.|
|onDownload|boolean|Whether a notification should be delivered when PDF print or download is requested for the linked publication.|
|onNotOpenedUntil|boolean|Whether a notification should be delivered when the link is not opened until the specified date/time (ISO 8601 format)?|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|total|integer|The total number of links matching your request (one).|
|userTotal|integer|The total number of links in your account (disregarding filters/offset/count).|
|links|array|One link matching your request.|
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
