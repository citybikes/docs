---
outline: deep
---

# CityBikes API Documentation

Welcome to the CityBikes API documentation page. This is a brief explanation on how to use CityBikes data.

## Network list

`https://api.citybik.es/v2/networks`

```json
{
  "networks": [
    {
        "company": "JCDecaux", 
        "href": "/v2/networks/velib", <--- network API endpoint
        "location": {
          "latitude": 48.856612, 
          "city": "Paris", 
          "longitude": 2.352233, 
          "country": "FRA"
        }, 
        "name": "Vélib'", 
        "id": "velib"
    },
    {...}
  ]
}
```

## Network

`https://api.citybik.es/v2/networks/<network_id>`

```json
{
  "network": {
    "name": "Vélib'",
    "stations": [
      {
          "name": "00903 - QUAI MAURIAC  / PONT DE BERCY",   /   UTC Zulu timestamp of the last time
          "timestamp": "2014-04-14T12:10:17.622Z",  <-------/ the station was updated on our systems
          "longitude": 2.374340554605615,
          "free_bikes": 1,   <-------------------------- Available bikes
          "latitude": 48.83713368945151,
          "empty_slots": 19,  <------------------------- Empty spaces
          "id": "f5a551a87eec15155d6409fe9d0ff8e2" <---- Unique id for this station
      },
      {...}
    ],
    "company": "JCDecaux",           |
    "href": "/v2/networks/velib",    |        Redundant Information
    "location": {                    |
      "latitude": 48.856612,         |    Just so you know where you are
      "city": "Paris",               |---      with less requests
      "longitude": 2.352233,         |
      "country": "FRA"               |    This can be filtered by passing
    },                               |      ?fields=stations to the URI
    "id": "velib"                    |
  }
}
```
