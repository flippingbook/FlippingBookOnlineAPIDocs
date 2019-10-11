---
title: Authentication
---
# Authentication

## Authentication scheme
All publicly available APIs require your application to be authenticated and authorized to make API calls. 
Authentication is done with HTTP bearer scheme, so all your requests (unless specified explicitly in request description)
should come with the `Authorization` HTTP header with proper value:

```
GET /api/v1/auth/me HTTP/1.1
Host: api-tc.is.flippingbook.com
Authorization: Bearer <your API key>
```

## API keys
