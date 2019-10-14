# FlippingBook Online API

FlippingBook Online is a service for converting PDFs into interactive digital documents. Its API allows you to programmatically create publications and customize their looks and behavior.

Publications are represented as [Publication](/fbonline/publications) entities which are build of one or more [Source](/fbonline/sources) entity. Source represents one publication version and usually corresponds to one source PDF file. To make things even more complex each publication may contains zero or many [Tracked/Individual Links](/fbonline/tracked-links) entities which represent special links to publication with separate opening tracking, statistics and notifications.

To ease external systems integration there is [Triggers/hooks system](/fbonline/triggers).

To allow easier API exploration most entities contain [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) links.

Read about entities supported by this API:
- [Publication](/fbonline/publications)
- [Publication Sources](/fbonline/sources)
- [Tracked/Individual Links](/fbonline/tracked-links)
- [Triggers/Hooks](/fbonline/triggers)
