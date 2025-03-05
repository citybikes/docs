---
outline: deep
---

# Citybikes API Documentation

The Citybikes API provides information for re-use: transport apps, research,
visualizations, analytics. The following resources are available:

### Real-time bike share information

Available in the following formats:

  * Citybikes: [v2][CB-V2]
  * GBFS: [v2.3][GBFS-V2] [v3.0][GBFS-V3]

[CB-V2]: /api/v2
[GBFS-V2]: /api/gbfs#gbfs-v2
[GBFS-V3]: /api/gbfs#gbfs-v3

### Historical bike share information

Time-series records of bike share station status changes, organized by network
and month, in Parquet format. More info at https://data.citybik.es


## Limits

To ensure fair usage, the public API is limited to **300 requests per hour**.
Rate limits reset every hour. Information about the limits can be inspected
on the response headers:

```shell
$ curl -I https://api.citybik.es/v2/networks
[...]
ratelimit-reset: 1832
x-ratelimit-limit-hour: 300
x-ratelimit-remaining-hour: 297
ratelimit-limit: 300
ratelimit-remaining: 297
[...]
```

If you need more requests, send us an email at info@citybik.es with information
about your project and the number of requests per minute/hour needed. For most
cases we are happy to provide an API key.

Alternatively, if none of these options suit your project, you are welcome to
run your own citybikes node: https://github.com/citybikes

## Using an API key

You will get an email with an API key. Use it by adding a `x-api-key` header
with your request.

```shell
curl https://api.citybik.es/v2/networks \
     -H x-api-key:f00b4r12hunter21onetwo345b4zfuzz
```
