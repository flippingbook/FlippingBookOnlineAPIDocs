---
title: API Usage Limits
---
# API Usage Limits
To prevent abuse API usage is limited in several ways:
- Request Rate Limiting
- General API limitations
- Domain-specific API limitations

## Request Rate Limiting
Each API key is allowed to make one request per second with bursts (consequent requests without any delay) up to ten requests. After the burst next one is available after ten seconds of inactivity (or even more is you keep your request rate under one per second).

## General API Limitations
API keys are linked to your FlippingBook account. For each account there may be no more than ten keys.

## Domain-specific API Limitations
For every application domain (e.g. FlippingBook Online) there are more enforced limits. Access to API features may be limited by your purchased edition/plan and various limits on entities is enforced. Consult each application API documentation for the details. 