# FlippingBook Online API

FlippingBook Online is a service for converting PDFs into interactive digital documents. Its API allows you to programmatically create publications and customize their look and behavior.

Publications are represented as [Publication](/fbonline/publications) entities which are build of one or more [Source](/fbonline/sources) entities. Source represents one publication version and usually corresponds to one source PDF file. Each publication may contain zero or many [Tracked/Individual Links](/fbonline/tracked-links) entities which represent special type of links to a publication with independant  tracking, statistics and notifications.

To make the integration to external systems easier there is [Triggers/hooks system](/fbonline/triggers).

To allow simpler API exploration most entities contain [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) links.

Read about entities supported by this API:
- [Publication](/fbonline/publications)
- [Publication Sources](/fbonline/sources)
- [Tracked/Individual Links](/fbonline/tracked-links)
- [Triggers/Hooks](/fbonline/triggers)
