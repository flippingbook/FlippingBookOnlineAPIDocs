---
title: Trigger Entity Model
---
# Trigger Entity Model

|Property|Type|Description|
|-|-|-|
|`Name`|string|Description of a trigger. It is not seen anywhere but in API calls.|
|`Endpoint`|string|Target URL for the trigger. When trigger fires an event, this URL is POST'ed with corresponding trigger/link/publication data.|
|`Events`|array of strings|Event names for which this trigger should fire. See following table for the defined event names.|

## Event Names

|Event Name|Scope|Description|
|-|-|-|-|
|PublicationCreatedCompleted|Account|Publication has been created successfully (first [source](/fbonline/sources) converted).|
|PublicationUpdatedCompleted|Account|Publication has been updated successfully (non-first [source](/fbonline/sources) converted).|
|PublicationCompleted|Account|Publication has been created/updated successfully (any [source](/fbonline/sources) converted)|
|PublicationFailed|Account|Publication conversion failed.|
|PublicationDeleted|Account|Publication has been deleted.|
|lead|Account, Publication|Lead form in the publication has been passed.|
|page|Account, Publication|Publication page shown to end-user.|
|link|Account, Publication|Link in the publication has been clicked.|
|download|Account, Publication|Download button in the publication has been clicked.|
|print|Account, Publication|Print button in the publication has been clicked.|
|TrackedPublicationLink-session|Account, Publication, Link|Tracked link view session started.|
|TrackedPublicationLink-notViewedUntil|Account, Publication, Link|Tracked link was not viewed in the specified time window.|
|TrackedPublicationLink-download|Account, Publication, Link|Download or print button has been clicked in the publication referenced by tracked link.|

All events should have `trigger` and `eventData` properties in their data.