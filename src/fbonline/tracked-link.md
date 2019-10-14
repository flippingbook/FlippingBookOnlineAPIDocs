---
title: Tracked Link Entity Model
---
# `Tracked Link` Entity Model

|Property|Type|Description|
|-|-|-|
|`Id`|string|Link unique identifier.|
|`Title`|string|Link title (visible only to link owner, not end-user).|
|`State`|string|Link state. It may consist of any combination (comma separated) of the following values: `WithNewData` - there is some 'unseen' statistics collected for the link; `WithoutNewData` - there is no 'unseen' statistics for the link; `Active` - link is active and enabled; `Deleted` - link was deleted and unavailable to end-users (readers); `Expired` - link's lifetime ended - it was not clicked before set expiration time.|
|`CreatedAt`|string|Link creation timestamp. ISO 8601 date format.|
|`UrlName`|string|Unique URL part for the link. To get full URL you should prefix it with `https://online.flippingbook.com/link/` (for the default domain).|
|`TriggerId`|string|Trigger identifier for the link.|
|`ShortStats`|object|View statistics for the link.|
|`ShortStats.FullStats`|object|Totals for the link.|
|`ShortStats.FullStats.LastViewedAt`|string|Date/time of last view, ISO 8601 format.|
|`ShortStats.FullStats.ViewDuration`|number|Total viewing time (seconds).|
|`ShortStats.FullStats.Visits`|number|Total number of views.|
|`ShortStats.SinceLastUpdate`|object|Statistics accumulated from last 'seen' state.|
|`ShortStats.SinceLastUpdate.LastViewedAt`|string|Date/time of last view since last seen, ISO 8601 format.|
|`ShortStats.SinceLastUpdate.ViewDuration`|number|Viewing time (seconds) since last seen.|
|`ShortStats.SinceLastUpdate.Visits`|number|Number of views since last seen.|
|`Publication`|object|Parent publication excerpt.|
|`Publication.Id`|string|Parent publication identifier.|
|`Publication.Id.Id`|string|Parent publication unique identifier.|
|`Publication.Id.HashId`|string|Parent publication URL identifier.|
|`Publication.Title`|string|Parent publication name.|
|`Publication.Url`|string|Parent publication canonical URL.|
|`Triggers`|object|Triggers for the link.|
|`Triggers.OnView`|object|View trigger for the link.|
|`Triggers.OnView.Enabled`|boolean|Is this trigger enabled.|
|`Triggers.OnView.Amount`|number|How many times this trigger is allowed to fire.|
|`Triggers.OnDownload`|object|Download trigger for the link.|
|`Triggers.OnDownload.Enabled`|boolean|Is this trigger enabled.|
|`Triggers.OnDownload.Amount`|number|How many times this trigger is allowed to fire.|
|`Triggers.OnNotOpenedUntil`|object|Link not opened before trigger for the link.|
|`Triggers.OnNotOpenedUntil.Enabled`|boolean|Is this trigger enabled.|
|`Triggers.OnNotOpenedUntil.Until`|string|When this trigger should fire.|
|`Triggers.TriggerVia`|string|Trigger delivery method. Can be one of the following values: `Email` - notify via email; `Zapier` - notify via [zapier](https://zapier.com/) integration.|