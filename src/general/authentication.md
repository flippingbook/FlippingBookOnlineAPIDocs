---
title: Authentication
---
# Authentication

## Authentication Scheme
All publicly available APIs require your application to be authenticated and authorized to make API calls. Authentication is done with HTTP bearer scheme, so all your requests (unless specified explicitly in request description) should come with the `Authorization` HTTP header with proper value:

```http request
GET /api/v1/auth/me HTTP/1.1
Host: api-tc.is.flippingbook.com
Authorization: Bearer <your API key>
```

## API Keys
You may receive your API key (linked to your FlippingBook account) by contacting our support team. Or, if you want to save the hassle just log into your account, go to the `https://logon.flippingbook.com/myaccesstoken`, save value of the `AccessToken` property and then call [Key Management API new key method](/auth/keys#post-api-v1-auth-key).

API keys are linked to your FlippingBook account and all actions are recorded/audited. No account may have more than 10 API keys.