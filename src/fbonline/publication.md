---
title: Publication Entity Model
---
# `Publication` Entity Model

|Property|Type|Description|
|-|-|-|
|`Id`|string|Publication unique identifier. This one will never change whatever you do with the publication.|
|`HashId`|string|Publication identifier for URLs. Although it is automatically assigned to all publications it may change with the help of our support team, so you should not rely on this as a valid/unique publication identifier.|
|`Name`|string|Publication name.|
|`Description`|string|Publication description.|
|`links`|array of objects|HATEOAS links to related API resources.|
|`State`|string|Publication status. It may consist of any combination (comma separated) of the following values: `Trashed` - publication was moved to trash, restoration possible; `Deleted` - publication was irreversibly deleted; `CompletedAllStages` - publication has at least one source that converted successfully; `HasContent`, `Empty`, `Published` - internally used statuses, do not rely on them.|
|`SeoEnabled`|boolean|Is SEO optimization enabled for the publication. That means web search indexing engines will see text content of your publication and is will appear in our sitemap.|
|`OwnerHashId`|string|Publication owner identifier. You would probably never need it.|
|`ContentRoot`|string|Base URL for all publication assets. Files there are not public, so you cannot access them without viewing actual publication (when it is allowed by publication's security policy).|
|`CanonicalLink`|string|Canonical URL of the publication.|
|`TotalPages`|string|Total number of pages in the publication. This will have valid value once the publication source has completely converted.|
|`LastPdfName`|string|The filename of the latest uploaded PDF source file.|
|`CustomizationOptions`|object|Publication looks & behavior settings.|
|`CustomizationOptions.Password`|string|Password for password-protected publications.|
|`CustomizationOptions.HardcoverEnabled`|boolean|Is hardcover enabled for the publication.|
|`CustomizationOptions.CompanyLogoEnabled`|boolean|Is company logo display enabled for the publications.|
|`CustomizationOptions.CompanyLogoUrl`|string|URL which is open on company logo clicks.|
|`CustomizationOptions.RtlEnabled`|boolean|Is publication in RTL mode (this is designed for Hebrew and Arabic publications, where page flipping direction and controls layout must be reversed).|
|`CustomizationOptions.Theme`|string|Selected skin for the publication.|