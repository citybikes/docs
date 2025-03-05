---
outline: deep
---

# Citybikes API Documentation

The Citybikes API provides real-time and historical bike share data for re-use
by transport apps, researchers, visualizations and analytics. The following
resources are available.

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
Rate limits reset every hour. You can inspect the limits in the response
headers

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

If you need more requests, please contact us at info@citybik.es with details
about your project and the number of requests you need per minute/hour. We're
happy to provide an API key for most cases.

Alternatively, you can run your own Citybikes node, see: [pybikes] and [hyper].

[pybikes]: /pybikes/
[hyper]: /hyper/

## Using an API key

Once you receive an email with your API key, use it by adding the `x-api-key`
header to your request:

```shell
curl https://api.citybik.es/v2/networks \
     -H x-api-key:f00b4r12hunter21onetwo345b4zfuzz
```
