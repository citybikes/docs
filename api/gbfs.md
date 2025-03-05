---
outline: deep
---
# General Bikeshare Feed Specification (GBFS)

This page explains how to use our [GBFS API endpoint][gbfs-api]. For info about
the format specification itself, check their [documentation site][GBFS docs].

As a clarification, when we talk about the Citybikes format, we will refer
to it as [CB-V2], and when it is about GBFS, GBFS-v2, GBFS-v3, ...

### What is GBFS?

> The General Bikeshare Feed Specification, known as GBFS, is the open data
> standard for shared mobility. GBFS makes real-time data feeds in a uniform
> format publicly available online, with an emphasis on findability.
>
> <cite>excerpt from https://gbfs.org</cite>

GBFS is a standarized format that mobility operators use to share their
information publicly. By supporting GBFS as an API format, we want to help push
this specification forward by bridging the gap with all the networks that _do
not_ use GBFS.

If you are already using GBFS on your app then this page is for you - adding
GBFS feeds from Citybikes will _just work_.

[CB-V2]: /api/v2
[GBFS]: https://gbfs.org
[GBFS docs]: https://gbfs.org/documentation
[pybikes]: https://github.com/eskerda/pybikes
[gbfs-api]: https://api.citybik.es/gbfs/

## Endpoints

As a general rule, endpoints look like:

```
GET https://api.citybik.es/gbfs/<version>/<network-id>/<feed-name>.json
```

### Version

GBFS is a versioned specification. We use the major version at the url level,
and the complete version at the response format.

Simply point your client to the major version you support, and as long as the
format is backwards compatible within the major version, nothing should break
on minor version bumps.

```json
GET https://api.citybik.es/gbfs/2/bicing/gbfs.json
                                └───── major
{
  "last_updated": 1741182508,
  "ttl": 0,
  "version": "2.3", ──── full version
                └───── minor
  "data": {
    ...
  }
}

GET https://api.citybik.es/gbfs/3/bicing/gbfs.json
                                └───── major
{
  "last_updated": "2025-03-05T13:57:28",
  "ttl": 0,
  "version": "3.0", ──── full version
                └───── minor
  "data": {
    ...
  }
}
```

### Network

Qualified network id from Citybikes.

To get a full list of all networks available check:

* [CB-V2] format: https://api.citybik.es/v2/networks
* [GBFS-V3](#gbfs-v3-0) format: https://api.citybik.es/gbfs/3/manifest.json

GBFS-V2 does not support a full manifest of networks, therefore either use
[CB-V2] or a GBFS version that supports it.

```
GET https://api.citybik.es/gbfs/2/bicing/gbfs.json
                  GBFS-V2 ──────┘    └───── network id

GET https://api.citybik.es/gbfs/3/velib/gbfs.json
                  GBFS-V3 ──────┘    └───── network id

GET https://api.citybik.es/gbfs/2/citi-bike-nyc/gbfs.json
                  GBFS-V2 ──────┘    └───── network id

```

### Available feeds

GBFS is a _broad_ specification. We support a subset of it: just the part that
is both relevant to Citybikes data and marked as REQUIRED in the specification.

Following the specification, get a full list of the feeds supported by querying
the [discovery endpoint](#gbfs-json).

### GBFS v2

We support the [version 2.3][GBFS-V2.3-docs] of the GBFS specification.

[GBFS-V2.3-docs]: https://github.com/MobilityData/gbfs/blob/v2.3/gbfs.md

#### gbfs.json

Discovery endpoint. [GBFS Docs](https://github.com/MobilityData/gbfs/blob/v2.3/gbfs.md#gbfsjson)

For example:

```json
GET https://api.citybik.es/gbfs/2/bicing/gbfs.json

{
  "last_updated": 1741185208,
  "ttl": 0,
  "version": "2.3",
  "data": {
    "en": {
      "feeds": [
        {
          "name": "gbfs",
          "url": "https://api.citybik.es/gbfs/2/bicing/gbfs.json"
        },
        {
          "name": "gbfs_versions",
          "url": "https://api.citybik.es/gbfs/2/bicing/gbfs_versions.json"
        },
        {
          "name": "system_information",
          "url": "https://api.citybik.es/gbfs/2/bicing/system_information.json"
        },
        {
          "name": "vehicle_types",
          "url": "https://api.citybik.es/gbfs/2/bicing/vehicle_types.json"
        },
        {
          "name": "station_information",
          "url": "https://api.citybik.es/gbfs/2/bicing/station_information.json"
        },
        {
          "name": "station_status",
          "url": "https://api.citybik.es/gbfs/2/bicing/station_status.json"
        }
      ]
    }
  }
}
```

#### gbfs_versions.json

Available versions within network. [GBFS docs](https://github.com/MobilityData/gbfs/blob/v2.3/gbfs.md#gbfs_versionsjson)

```json
GET https://api.citybik.es/gbfs/2/bicing/gbfs_versions.json

{
  "last_updated": 1741185567,
  "ttl": 0,
  "version": "2.3",
  "data": {
    "versions": [
      {
        "version": "2.3",
        "url": "https://api.citybik.es/gbfs/2/bicing/gbfs.json"
      },
      {
        "version": "3.0",
        "url": "https://api.citybik.es/gbfs/3/bicing/gbfs.json"
      }
    ]
  }
}
```

#### system_information.json

Information about the bike-share network. [GBFS docs](https://github.com/MobilityData/gbfs/blob/v2.3/gbfs.md#system_informationjson)

Please do note that we only provide timestamps in UTC, therefore we set the
timezone field as `Etc/UTC`.

```json
GET https://api.citybik.es/gbfs/2/bicing/system_information.json

{
  "last_updated": 1741185748,
  "ttl": 0,
  "version": "2.3",
  "data": {
    "system_id": "bicing",
    "language": "en",
    "name": "Bicing",
    "short_name": "Bicing",
    "operator": "Barcelona de Serveis Municipals, S.A. (BSM) | CESPA | PBSC",
    "feed_contact_email": "info@citybik.es",
    "timezone": "Etc/UTC"
  }
}
```
#### vehicle_types.json

Types of vehicles a network supports [GBFS docs](https://github.com/MobilityData/gbfs/blob/v2.3/gbfs.md#vehicle_typesjson).

Here we had to get creative and create our own constants, that differentiate
between normal bikes, electric, cargo bikes and bikes for kids.


```json
GET https://api.citybik.es/gbfs/2/bicing/vehicle_types.json

{
  "last_updated": 1741185567,
  "ttl": 0,
  "version": "2.3",
  "data": {
    "vehicle_types": [
      {
        "vehicle_type_id": "cb:vehicle:bike",
        "form_factor": "bicycle",
        "propulsion_type": "human",
        "name": "Humble Bike"
      },
      {
        "vehicle_type_id": "cb:vehicle:ebike",
        "form_factor": "bicycle",
        "propulsion_type": "electric",
        "name": "Electric Bike",
        "max_range_meters": 9000
      }
    ]
  }
}
```
#### station_information.json

Information about the stations sans status. [GBFS docs](https://github.com/MobilityData/gbfs/blob/v2.3/gbfs.md#station_informationjson)

```json
GET https://api.citybik.es/gbfs/2/bicing/station_information.json

{
  "last_updated": 1741185927,
  "ttl": 0,
  "version": "2.3",
  "data": {
    "stations": [
      {
        "station_id": "00028670e3d01438515caba403ffd680",
        "name": " PL  JOANIC - C / BRUNIQUER, 59",
        "lat": 41.40552,
        "lon": 2.162255
      },
      {
        "station_id": "00341b8b54545c560fdec7d7983f9f5a",
        "name": "C/ SARDENYA,  178",
        "lat": 41.396717,
        "lon": 2.182508
      },
      {
        "station_id": "00565dda9629be93f8f69358b48602cc",
        "name": "PL. CATALUNYA, 7",
        "lat": 41.386543,
        "lon": 2.169427
      },
      {
        "station_id": "006395fd7434c1f65d20cf0a1b0c94f0",
        "name": "C/ VILADOMAT, 200",
        "lat": 41.38481,
        "lon": 2.150807
      },
      ...
    ]
  }
}
```

#### station_status.json

Status information about the stations sans information. [GBFS docs](https://github.com/MobilityData/gbfs/blob/v2.3/gbfs.md#station_statusjson)

```json
GET https://api.citybik.es/gbfs/2/bicing/station_status.json

{
  "last_updated": 1741186108,
  "ttl": 0,
  "version": "2.3",
  "data": {
    "stations": [
      {
        "station_id": "00028670e3d01438515caba403ffd680",
        "num_bikes_available": 5,
        "vehicle_types_available": [
          {
            "vehicle_type_id": "cb:vehicle:ebike",
            "count": 4
          },
          {
            "vehicle_type_id": "cb:vehicle:bike",
            "count": 1
          }
        ],
        "num_docks_available": 11,
        "is_installed": true,
        "is_renting": true,
        "is_returning": true,
        "last_reported": 1741186108
      },
      {
        "station_id": "00341b8b54545c560fdec7d7983f9f5a",
        "num_bikes_available": 14,
        "vehicle_types_available": [
          {
            "vehicle_type_id": "cb:vehicle:ebike",
            "count": 4
          },
          {
            "vehicle_type_id": "cb:vehicle:bike",
            "count": 10
          }
        ],
        "num_docks_available": 25,
        "is_installed": true,
        "is_renting": true,
        "is_returning": true,
        "last_reported": 1741186108
      },
      ...
    ]
  }
}
```

### GBFS v3

We support the [version 3.0][GBFS-V3.0-docs] of the GBFS specification.

[GBFS-V3.0-docs]: https://github.com/MobilityData/gbfs/blob/v3.0/gbfs.md

#### manifest.json


Manifest endpoint. It links to the discovery endpoint of all available networks
and versions. Please note this is a top-level endpoint without a network id.
[GBFS Docs](https://github.com/MobilityData/gbfs/blob/v3.0/gbfs.md#manifestjson)


```json
GET https://api.citybik.es/gbfs/3/manifest.json

{
  "last_updated": "2025-03-05T14:55:42.206176",
  "ttl": 0,
  "version": "3.0",
  "data": {
    "datasets": [
      ...
      {
        "system_id": "bicing",
        "versions": [
          {
            "version": "2.3",
            "url": "https://api.citybik.es/gbfs/2/bicing/gbfs.json"
          },
          {
            "version": "3.0",
            "url": "https://api.citybik.es/gbfs/3/bicing/gbfs.json"
          }
        ]
      },
      ...
    ]
  }
}
```

#### gbfs.json

Discovery endpoint. [GBFS Docs](https://github.com/MobilityData/gbfs/blob/v3.0/gbfs.md#gbfsjson)

For example:

```json
GET https://api.citybik.es/gbfs/3/bicing/gbfs.json

{
  "last_updated": "2025-03-05T15:09:27",
  "ttl": 0,
  "version": "3.0",
  "data": {
    "feeds": [
      {
        "name": "gbfs",
        "url": "https://api.citybik.es/gbfs/3/bicing/gbfs.json"
      },
      {
        "name": "system_information",
        "url": "https://api.citybik.es/gbfs/3/bicing/system_information.json"
      },
      {
        "name": "vehicle_types",
        "url": "https://api.citybik.es/gbfs/3/bicing/vehicle_types.json"
      },
      {
        "name": "station_information",
        "url": "https://api.citybik.es/gbfs/3/bicing/station_information.json"
      },
      {
        "name": "station_status",
        "url": "https://api.citybik.es/gbfs/3/bicing/station_status.json"
      }
    ]
  }
}
```

#### system_information.json

Information about the bike-share network. [GBFS docs](https://github.com/MobilityData/gbfs/blob/v3.0/gbfs.md#system_informationjson)

Please do note that we only provide timestamps in UTC, therefore we set the
timezone field as `Etc/UTC`.

```json
GET https://api.citybik.es/gbfs/3/bicing/system_information.json

{
  "last_updated": "2025-03-05T15:09:27",
  "ttl": 0,
  "version": "3.0",
  "data": {
    "system_id": "bicing",
    "languages": [
      "en"
    ],
    "name": [
      {
        "language": "en",
        "text": "Bicing"
      }
    ],
    "opening_hours": "off",
    "short_name": [
      {
        "language": "en",
        "text": "Bicing"
      }
    ],
    "feed_contact_email": "info@citybik.es",
    "manifest_url": "https://api.citybik.es/gbfs/3/manifest.json",
    "timezone": "Etc/UTC",
    "attribution_organization_name": [
      {
        "language": "en",
        "text": "CityBikes"
      }
    ],
    "attribution_url": "https://citybik.es",
    "operator": [
      {
        "language": "en",
        "text": "Barcelona de Serveis Municipals, S.A. (BSM) | CESPA | PBSC"
      }
    ]
  }
}

```
#### vehicle_types.json

Types of vehicles a network supports [GBFS docs](https://github.com/MobilityData/gbfs/blob/v3.0/gbfs.md#vehicle_typesjson).

Here we had to get creative and create our own constants, that differentiate
between normal bikes, electric, cargo bikes and bikes for kids.


```json
GET https://api.citybik.es/gbfs/3/bicing/vehicle_types.json

{
  "last_updated": "2025-03-05T15:09:27",
  "ttl": 0,
  "version": "3.0",
  "data": {
    "vehicle_types": [
      {
        "vehicle_type_id": "cb:vehicle:bike",
        "form_factor": "bicycle",
        "propulsion_type": "human",
        "name": [
          {
            "language": "en",
            "text": "Humble Bike"
          }
        ]
      },
      {
        "vehicle_type_id": "cb:vehicle:ebike",
        "form_factor": "bicycle",
        "propulsion_type": "electric",
        "name": [
          {
            "language": "en",
            "text": "Electric Bike"
          }
        ],
        "max_range_meters": 9000.0
      }
    ]
  }
}
```
#### station_information.json

Information about the stations sans status. [GBFS docs](https://github.com/MobilityData/gbfs/blob/v3.0/gbfs.md#station_informationjson)

```json
GET https://api.citybik.es/gbfs/3/bicing/station_information.json

{
  "last_updated": "2025-03-05T15:09:27",
  "ttl": 0,
  "version": "3.0",
  "data": {
    "stations": [
      {
        "station_id": "00028670e3d01438515caba403ffd680",
        "name": [
          {
            "language": "en",
            "text": " PL  JOANIC - C / BRUNIQUER, 59"
          }
        ],
        "lat": 41.40552,
        "lon": 2.162255
      },
      {
        "station_id": "00341b8b54545c560fdec7d7983f9f5a",
        "name": [
          {
            "language": "en",
            "text": "C/ SARDENYA,  178"
          }
        ],
        "lat": 41.396717,
        "lon": 2.182508
      },
      {
        "station_id": "00565dda9629be93f8f69358b48602cc",
        "name": [
          {
            "language": "en",
            "text": "PL. CATALUNYA, 7"
          }
        ],
        "lat": 41.386543,
        "lon": 2.169427
      },
      ...
    ]
  }
}
```

#### station_status.json

Status information about the stations sans information. [GBFS docs](https://github.com/MobilityData/gbfs/blob/v3.0/gbfs.md#station_statusjson)

```json
GET https://api.citybik.es/gbfs/3/bicing/station_status.json

{
  "last_updated": "2025-03-05T15:09:27",
  "ttl": 0,
  "version": "3.0",
  "data": {
    "stations": [
      {
        "station_id": "00028670e3d01438515caba403ffd680",
        "num_vehicles_available": 2,
        "vehicle_types_available": [
          {
            "vehicle_type_id": "cb:vehicle:ebike",
            "count": 1
          },
          {
            "vehicle_type_id": "cb:vehicle:bike",
            "count": 1
          }
        ],
        "num_docks_available": 16,
        "is_installed": true,
        "is_renting": true,
        "is_returning": true,
        "last_reported": "2025-03-05T15:09:27.755904"
      },
      {
        "station_id": "00341b8b54545c560fdec7d7983f9f5a",
        "num_vehicles_available": 14,
        "vehicle_types_available": [
          {
            "vehicle_type_id": "cb:vehicle:ebike",
            "count": 4
          },
          {
            "vehicle_type_id": "cb:vehicle:bike",
            "count": 10
          }
        ],
        "num_docks_available": 25,
        "is_installed": true,
        "is_renting": true,
        "is_returning": true,
        "last_reported": "2025-03-05T15:09:27.755848"
      },
      ...
    ]
  }
}
```

### Something missing?

Help us! Feel free to write to us at info@citybik.es or contribute on the
following links

  * Code: https://github.com/citybikes/gbfs-api
  * Docs: https://github.com/citybikes/docs/
  * Matrix: https://matrix.to/#/#citybikes:matrix.org
