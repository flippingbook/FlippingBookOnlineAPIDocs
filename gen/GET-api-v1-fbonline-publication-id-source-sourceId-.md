#### Retrieve information about one single source
`GET /api/v1/fbonline/publication/{id}/source/{sourceId}`

With this method your application may retrieve information about one publication source by its identifier.
It may be useful to watch for source conversion progress.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> The publication identifier.|
|<Badge>Path</Badge> sourceId|<Badge>REQUIRED</Badge> The source identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates wheter your request was succesful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|source|object||
|source.id|string|Source unique identifier. Although these ids are unique across the system they cannot be used without publication identifier.|
|source.publicationId|string|Parent publication identifier.|
|source.links|array|A set of HATEOAS links.|
|source.links.rel|string|Kind of relation with linked resource.|
|source.links.type|string|HTTP method to use with this link.|
|source.links.href|string|Link URL.|
|source.state|string|Processing state of the source file. It can be one of the following values: `WaitAutoQueue` - source file upload has completed yet it is not queued for conversion yet; `Queued` - source file is in conversion queue; `Completed` - source file has been converted partially, publication preview is available; `CompletedAllStages` - source file has been converted completely and it was activated in publication; `CompletedWithErrors` - there was a permanent error during conversion, re-uploading the same file will be fruitless; `WaitManualQueue` - special status meaning that source file has been uploaded yet it will not be put in conversion queue,  this status is never set automatically.|
|source.stage|string|Current conversion state (if the source is still converting). At the moment there's two stages: `Preview`  and `L1`. After the `Preview` is completed, the source is activated for the publication only if it does  not have any previous successful sources. Publication in preview mode is customizable, several first pages  are available for viewing and other pages are loaded as they completes. Preview publication content delivery  to end users is not optimized and thus these publications should not be shared until they conversion is complete.|
|source.Progress|string|Current conversion progress. During `Preview` stage it has range `[0..1]` which means stage completion percentage, and on `L1` stage it shows the number of completed pages.|
