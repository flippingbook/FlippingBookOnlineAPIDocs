#### Retrieve information about a single source
`GET /api/v1/fbonline/publication/{id}/source/{sourceId}`

With this method, your application may retrieve information about one publication source by its identifier.
It may be useful to monitor the source conversion progress.
##### Parameters in path and query
|Name|Description|
|-|-|
|<Badge>Path</Badge> id|<Badge>REQUIRED</Badge> Publication identifier.|
|<Badge>Path</Badge> sourceId|<Badge>REQUIRED</Badge> Source identifier.|
##### Response format
|Name|Type|Description|
|-|-|-|
|success|boolean|Indicates whether your request was successful or not.|
|wellKnownError|string|Machine-readable error code.|
|message|string|Human-readable error message.|
|error|string|Detailed error code.|
|source|object||
|source.id|string|Source's unique identifier. Although these IDs are unique across the system, they cannot be used without a publication identifier.|
|source.publicationId|string|Parent publication identifier.|
|source.links|array|A set of HATEOAS links.|
|source.links.rel|string|The kind of relation with the linked resource.|
|source.links.type|string|The HTTP method to use with this link.|
|source.links.href|string|Link URL.|
|source.state|string|The processing state of the source file. It can be one of the following values: `WaitAutoQueue` - source file upload was completed, but it is not queued for conversion yet; `Queued` - the source file is in the conversion queue; `Completed` - the source file has been partially converted, publication preview is available; `CompletedAllStages` - the source file has been completely converted and was activated in the publication; `CompletedWithErrors` - there was a permanent error during conversion, re-uploading the same file will not fix it; `WaitManualQueue` - a special status, never set automatically, meaning the source file upload was completed, but it will not be put in the conversion queue.|
|source.stage|string|The current conversion state (if the source is still converting). At the moment, there are two stages: `Preview`  and `L1`. After `Preview` is completed, the source will be activated for the publication only if it does  not have any previous successful sources. Publication in the preview mode is customizable, the first few pages  can be viewed, and other pages will load as the conversion completes. Preview publications are not optimized  for end users, and thus, these publications should not be shared until their conversion is complete.|
|source.Progress|string|The current conversion progress. During the `Preview` stage, it has a range of `[0..1]`, which indicates the stage completion percentage. On the `L1` stage, it shows the number of completed pages.|
