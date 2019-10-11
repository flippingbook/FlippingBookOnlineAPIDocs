---
title: API Changes Policy
---
# API Changes Policy
We are constantly improving our APIs to support new product features. However we would try our best to keep backward compatibility with
existing integrations. All APIs are versioned (by HTTP path, `/api/v1/...`) and all breaking changes will happen only with new API versions,
non-breaking changes (like adding new calls, extending responses with new properties, adding properties to requests while keeping default behavior)
may be added to the current version.