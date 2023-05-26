export default{
    "version": 8,
    "name": "maplook",
    "metadata": {},
    "sources": {
      "vectorTiles": {
        "maxzoom": 22,
        "minzoom": 0,
        "tiles": [
          "https://a.api.tomtom.com/map/2/tile/basic/{z}/{x}/{y}.pbf?key=tJS1gAM0m7fhCfDwZkkckGd7H0pSyxhC",
          "https://b.api.tomtom.com/map/2/tile/basic/{z}/{x}/{y}.pbf?key=tJS1gAM0m7fhCfDwZkkckGd7H0pSyxhC",
          "https://c.api.tomtom.com/map/2/tile/basic/{z}/{x}/{y}.pbf?key=tJS1gAM0m7fhCfDwZkkckGd7H0pSyxhC",
          "https://d.api.tomtom.com/map/2/tile/basic/{z}/{x}/{y}.pbf?key=tJS1gAM0m7fhCfDwZkkckGd7H0pSyxhC"
        ],
        "type": "vector"
      }
    },
    "sprite": "https://api.tomtom.com/style/1/sprite/24.2.0-3/sprite?map=2%2Fbasic_street-light&key=tJS1gAM0m7fhCfDwZkkckGd7H0pSyxhC",
    "glyphs": "https://api.tomtom.com/style/1/glyph/24.2.0-3/{fontstack}/{range}.pbf?key=tJS1gAM0m7fhCfDwZkkckGd7H0pSyxhC",
    "layers": [
      {
        "id": "background",
        "type": "background",
        "metadata": {"group": "area"},
        "paint": {
          "background-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            6,
            "hsl(45, 35%, 92%)",
            10,
            "hsl(45, 25%, 93%)",
            13,
            "hsl(45, 15%, 94%)"
          ]
        }
      },
      {
        "id": "Landcover - Global",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "earth_cover",
        "paint": {
          "fill-antialias": false,
          "fill-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            6,
            [
              "match",
              ["get", "category"],
              "ice_and_snow",
              "hsl(210, 100%, 98%)",
              "woody",
              "hsl(105, 40%, 82%)",
              "herbaceous",
              "hsl(90, 35%, 85%)",
              "cropland",
              "hsl(75, 30%, 88%)",
              "sand",
              "hsl(60, 40%, 95%)",
              "hsla(0,0%,0%,0)"
            ],
            10,
            [
              "match",
              ["get", "category"],
              "ice_and_snow",
              "hsl(210, 100%, 98%)",
              "woody",
              "hsl(105, 35%, 85%)",
              "herbaceous",
              "hsl(90, 30%, 88%)",
              "cropland",
              "hsl(75, 25%, 90%)",
              "sand",
              "hsl(60, 30%, 95%)",
              "hsla(0,0%,0%,0)"
            ],
            13,
            [
              "match",
              ["get", "category"],
              "ice_and_snow",
              "hsl(210, 100%, 98%)",
              "woody",
              "hsl(75, 20%, 91%)",
              "herbaceous",
              "hsl(75, 20%, 91%)",
              "cropland",
              "hsl(75, 20%, 91%)",
              "sand",
              "hsl(60, 20%, 95%)",
              "hsla(0,0%,0%,0)"
            ]
          ]
        }
      },
      {
        "id": "Landcover - Built-up area",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 6,
        "filter": ["all", ["==", "category", "built_up_area"]],
        "paint": {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            6,
            "hsl(45, 35%, 90%)",
            10,
            "hsla(210, 25%, 92%, 1)",
            13,
            "hsla(210, 15%, 94%, 1)"
          ]
        }
      },
      {
        "id": "Landcover - Natural",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_cover",
        "minzoom": 10,
        "filter": [
          "any",
          ["==", "category", "beach_or_dune"],
          ["==", "category", "sand"],
          ["==", "category", "moor_or_heathland"]
        ],
        "paint": {
          "fill-color": [
            "match",
            ["get", "category"],
            "moor_or_heathland",
            "hsl(75, 30%, 88%)",
            "sand",
            "hsl(60, 60%, 95%)",
            "hsl(60, 80%, 92%)"
          ]
        }
      },
      {
        "id": "Landuse - Park",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 4,
        "filter": ["all", ["==", "protected", true], ["has", "subcategory"]],
        "paint": {
          "fill-color": "hsla(120, 40%, 78%, 1)",
          "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0,
            5,
            ["match", ["get", "subcategory"], "national", 0.5, 0],
            10,
            ["match", ["get", "subcategory"], "national", 0.7, 0.5],
            13,
            ["match", ["get", "subcategory"], "national", 0, 0.2]
          ]
        }
      },
      {
        "id": "Landuse - Military",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 8,
        "filter": ["all", ["==", "category", "military"]],
        "paint": {
          "fill-color": "hsla(324, 30%, 82%, 1)",
          "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            0,
            9,
            0.2,
            12,
            0.2,
            13,
            0
          ]
        }
      },
      {
        "id": "Landuse - Airport",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 8,
        "filter": ["any", ["==", "category", "airport"]],
        "layout": {
          "fill-sort-key": [
            "match",
            ["get", "subcategory"],
            "ground",
            1,
            "runway",
            2,
            0
          ]
        },
        "paint": {
          "fill-color": [
            "match",
            ["get", "subcategory"],
            "ground",
            "hsl(210, 22%, 89%)",
            "runway",
            "hsl(210, 22%, 85%)",
            "hsla(0,0%,0%,0)"
          ]
        }
      },
      {
        "id": "Landuse - Urban",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 10,
        "filter": [
          "any",
          ["==", "category", "industrial"],
          ["==", "category", "railway"],
          ["==", "category", "company"],
          ["==", "category", "shopping_center"],
          ["==", "category", "education"],
          ["==", "category", "hospital"],
          ["==", "category", "cemetery"]
        ],
        "layout": {
          "fill-sort-key": [
            "match",
            ["get", "category"],
            ["company", "shopping_center"],
            6,
            "hospital",
            5,
            "education",
            4,
            "railway",
            3,
            "cemetery",
            2,
            "industrial",
            1,
            0
          ]
        },
        "paint": {
          "fill-color": [
            "match",
            ["get", "category"],
            "industrial",
            "hsl(237, 50%, 95%)",
            ["company", "shopping_center"],
            "hsl(40, 85%, 92%)",
            "education",
            "hsl(40, 25%, 91%)",
            "railway",
            "hsl(210, 25%, 91%)",
            "hospital",
            "hsl(6, 50%, 92%)",
            "cemetery",
            "hsl(120, 16%, 88%)",
            "hsla(0,0%,0%,0)"
          ]
        }
      },
      {
        "id": "Landuse - Recreation",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 9,
        "filter": [
          "any",
          ["==", "category", "tourism"],
          ["==", "category", "golf_course"],
          ["==", "category", "city_park"],
          ["==", "category", "stadium"]
        ],
        "layout": {
          "fill-sort-key": [
            "match",
            ["get", "category"],
            "golf_course",
            2,
            "city_park",
            1,
            0
          ]
        },
        "paint": {
          "fill-color": [
            "match",
            ["get", "category"],
            ["tourism", "stadium"],
            "hsla(330, 30%, 92%, 1)",
            "city_park",
            "hsla(120, 40%, 85%, 1)",
            "golf_course",
            "hsla(120, 40%, 85%, 1)",
            "hsla(120, 40%, 82%, 1)"
          ]
        }
      },
      {
        "id": "Landuse - Transit",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 10,
        "filter": [
          "any",
          ["==", "category", "parking"],
          ["==", "subcategory", "runway"],
          ["all", ["==", "surface", "paved"], ["==", "category", "city_park"]]
        ],
        "paint": {
          "fill-antialias": true,
          "fill-color": [
            "match",
            ["get", "category"],
            "parking",
            "hsl(210, 35%, 93%)",
            "city_park",
            "hsl(225, 25%, 92%)",
            "hsl(210, 22%, 85%)"
          ],
          "fill-outline-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            [
              "match",
              ["get", "category"],
              "parking",
              "hsla(210, 35%, 94%, 1)",
              "city_park",
              "hsl(225, 15%, 90%)",
              "hsl(210, 22%, 84%)"
            ],
            16,
            [
              "match",
              ["get", "category"],
              "parking",
              "hsla(210, 35%, 98%, 0.75)",
              "city_park",
              "hsl(225, 15%, 80%)",
              "hsl(210, 22%, 80%)"
            ]
          ]
        }
      },
      {
        "id": "Landuse - Vegetation",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 10,
        "filter": [
          "any",
          ["==", "category", "forest"],
          ["==", "category", "grass"],
          ["==", "category", "greens"]
        ],
        "paint": {
          "fill-color": [
            "match",
            ["get", "category"],
            "greens",
            "hsl(90, 45%, 85%)",
            "grass",
            "hsl(105, 45%, 82%)",
            "hsla(105, 45%, 80%,0)"
          ]
        }
      },
      {
        "id": "Landuse - Sport",
        "type": "fill",
        "metadata": {"group": "area"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 14,
        "filter": ["any", ["==", "category", "playing_field"]],
        "paint": {
          "fill-color": "hsla(120, 45%, 80%, 1)",
          "fill-outline-color": "hsla(120, 0%, 100%, 1)"
        }
      },
      {
        "id": "Water - Shadow",
        "type": "fill",
        "metadata": {"group": "water"},
        "source": "vectorTiles",
        "source-layer": "water",
        "filter": ["all", ["==", "category", "permanent_water"]],
        "paint": {
          "fill-color": "hsl(200, 60%, 75%)",
          "fill-translate": [
            "interpolate",
            ["linear"],
            ["zoom"],
            9,
            ["literal", [0, 0]],
            13,
            ["literal", [-1, -1]],
            16,
            ["literal", [-2, -2]]
          ],
          "fill-translate-anchor": "viewport"
        }
      },
      {
        "id": "Water - Intermittent",
        "type": "fill",
        "metadata": {"group": "water"},
        "source": "vectorTiles",
        "source-layer": "water",
        "minzoom": 5,
        "filter": ["all", ["==", "category", "intermittent_water"]],
        "paint": {"fill-color": "hsl(200, 50%, 85%)"}
      },
      {
        "id": "Water - Line",
        "type": "line",
        "metadata": {"group": "water"},
        "source": "vectorTiles",
        "source-layer": "water_lines",
        "minzoom": 12,
        "filter": ["all", ["==", "category", "permanent_water"]],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(200, 60%, 75%)",
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            11,
            0.6,
            15,
            1.2,
            18,
            1.8
          ]
        }
      },
      {
        "id": "Water - Fill",
        "type": "fill",
        "metadata": {"group": "water"},
        "source": "vectorTiles",
        "source-layer": "water",
        "filter": ["all", ["==", "category", "permanent_water"]],
        "paint": {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            "hsl(200, 60%, 75%)",
            6,
            "hsl(200, 60%, 80%)"
          ]
        }
      },
      {
        "id": "Buildings - Underground",
        "type": "fill",
        "metadata": {"group": "building"},
        "source": "vectorTiles",
        "source-layer": "buildings",
        "minzoom": 16,
        "filter": ["all", ["==", "category", "subway_station"]],
        "paint": {"fill-color": "hsla(210, 32%, 87%, 0.5)"}
      },
      {
        "id": "Buildings - Shadow",
        "type": "fill",
        "metadata": {"group": "building"},
        "source": "vectorTiles",
        "source-layer": "buildings",
        "minzoom": 15,
        "filter": ["all", ["!=", "category", "subway_station"]],
        "layout": {"visibility": "visible"},
        "paint": {
          "fill-antialias": false,
          "fill-color": [
            "match",
            ["get", "category"],
            ["government", "institution", "prison", "place_of_worship"],
            "hsl(324, 8%, 58%)",
            "education",
            "hsl(40, 25%, 60%)",
            "industrial",
            "hsl(240, 15%, 58%)",
            "railway_station",
            "hsl(210, 32%, 58%)",
            "hotel",
            "hsl(245, 22%, 58%)",
            "hospital",
            "hsl(6, 45%, 58%)",
            "cultural",
            "hsl(324, 15%, 58%)",
            "hsl(215, 15%, 68%)"
          ],
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 15, 0, 17, 0.5],
          "fill-translate": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            ["literal", [0, 0]],
            17,
            ["literal", [2, 2]]
          ],
          "fill-translate-anchor": "viewport"
        }
      },
      {
        "id": "Buildings - Fill",
        "type": "fill",
        "metadata": {"group": "building"},
        "source": "vectorTiles",
        "source-layer": "buildings",
        "minzoom": 15,
        "filter": ["all", ["!=", "category", "subway_station"]],
        "paint": {
          "fill-color": [
            "match",
            ["get", "category"],
            ["government", "institution", "prison", "place_of_worship"],
            "hsl(324, 8%, 87%)",
            "education",
            "hsl(40, 25%, 85%)",
            "industrial",
            "hsl(240, 15%, 87%)",
            "railway_station",
            "hsl(210, 32%, 87%)",
            "hotel",
            "hsl(245, 22%, 87%)",
            "hospital",
            "hsl(6, 45%, 87%)",
            "cultural",
            "hsl(324, 15%, 87%)",
            "hsl(215, 15%, 90%)"
          ],
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 16, 1]
        }
      },
      {
        "id": "Buildings - Outline",
        "type": "line",
        "metadata": {"group": "building"},
        "source": "vectorTiles",
        "source-layer": "buildings",
        "minzoom": 15,
        "filter": ["all", ["!=", "category", "subway_station"]],
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["government", "institution", "prison", "place_of_worship"],
            "hsl(324, 8%, 63%)",
            "education",
            "hsl(40, 25%, 67%)",
            "industrial",
            "hsl(240, 15%, 67%)",
            "railway_station",
            "hsl(210, 32%, 67%)",
            "hotel",
            "hsl(245, 22%, 66%)",
            "hospital",
            "hsl(6, 45%, 66%)",
            "cultural",
            "hsl(324, 15%, 65%)",
            "hsl(215, 15%, 70%)"
          ],
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0.25,
            17,
            0.8
          ],
          "line-width": ["interpolate", ["linear"], ["zoom"], 13, 0, 18, 0.5]
        }
      },
      {
        "id": "Tunnel - Railway outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 13,
        "filter": ["all", ["==", "category", "railway"], ["==", "tunnel", true]],
        "layout": {"line-cap": "butt", "line-join": "bevel"},
        "paint": {
          "line-color": "hsla(210, 15%, 75%, 1)",
          "line-width": {"stops": [[13, 0.5], [16, 0.75], [19, 9]]}
        }
      },
      {
        "id": "Tunnel - Railway fill",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 16,
        "filter": ["all", ["==", "category", "railway"], ["==", "tunnel", true]],
        "layout": {"line-cap": "butt", "line-join": "bevel"},
        "paint": {
          "line-color": "hsla(210, 5%, 92%, 1)",
          "line-opacity": {"stops": [[16, 0], [17, 1]]},
          "line-width": {"stops": [[16, 0], [19, 8]]}
        }
      },
      {
        "id": "Tunnel - Railway dash",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 13,
        "filter": ["all", ["==", "category", "railway"], ["==", "tunnel", true]],
        "layout": {"line-cap": "butt", "line-join": "bevel"},
        "paint": {
          "line-color": "hsl(210, 15%, 75%)",
          "line-dasharray": [0.05, 0.4],
          "line-width": {"stops": [[13, 0], [16, 3], [19, 12]]}
        }
      },
      {
        "id": "Tunnel - Road outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "tunnel"], true],
          ["match", ["get", "category"], ["path", "railway"], false, true]
        ],
        "layout": {"line-cap": "butt", "line-join": "round"},
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(37, 70%, 65%)",
            ["trunk"],
            "hsl(37, 70%, 65%)",
            ["primary"],
            "hsl(37, 70%, 70%)",
            ["secondary", "tertiary"],
            "hsl(215, 15%, 70%)",
            ["street"],
            "hsl(215, 15%, 75%)",
            "hsl(215, 15%, 75%)"
          ],
          "line-dasharray": {"stops": [[12, [0.1, 0.1]], [14, [0.15, 0.15]]]},
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              3.5,
              ["trunk"],
              3.25,
              ["primary"],
              3,
              ["secondary"],
              2.5,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2, 1.75],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.25, 1],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              6.5,
              ["trunk"],
              6,
              ["primary"],
              5.5,
              ["secondary"],
              4,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 3.5, 3],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 2.25, 1.75],
              ["match", ["get", "subcategory"], ["parking"], 0.5, 0.5]
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              47,
              ["trunk"],
              43,
              ["primary"],
              39,
              ["secondary"],
              35,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 31, 27],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 22.5, 18.5],
              ["match", ["get", "subcategory"], ["parking"], 10, 14]
            ]
          ]
        }
      },
      {
        "id": "Tunnel - Road under construction",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "tunnel"], true],
          ["==", ["get", "under_construction"], true],
          ["match", ["get", "category"], ["path", "railway"], false, true]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            7,
            "trunk",
            6,
            "primary",
            5,
            "secondary",
            4,
            "tertiary",
            3,
            "street",
            2,
            1
          ]
        },
        "paint": {
          "line-color": "hsl(0, 0%, 95%)",
          "line-pattern": "under-construction",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Tunnel - Road line",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "tunnel"], true],
          ["!=", ["get", "under_construction"], true],
          ["match", ["get", "category"], ["path", "railway"], false, true]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            7,
            "trunk",
            6,
            "primary",
            5,
            "secondary",
            4,
            "tertiary",
            3,
            "street",
            2,
            1
          ]
        },
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(47, 80%, 77%)",
            ["trunk"],
            "hsl(47, 80%, 85%)",
            ["primary"],
            "hsl(47, 80%, 93%)",
            ["secondary", "tertiary"],
            "hsl(0, 0%, 95%)",
            [
              "match",
              ["get", "subcategory"],
              "pedestrian",
              "hsl(225, 25%, 95%)",
              "hsl(0, 0%, 95%)"
            ]
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Tunnel - Road arrow",
        "type": "symbol",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 15,
        "filter": [
          "all",
          ["!=", ["get", "under_construction"], true],
          ["==", ["has", "direction"], true],
          ["==", ["get", "tunnel"], true],
          ["match", ["get", "category"], ["path", "railway"], false, true],
          [
            "any",
            ["match", ["get", "category"], ["minor"], false, true],
            [">=", ["zoom"], 16]
          ]
        ],
        "layout": {
          "icon-image": [
            "match",
            ["get", "direction"],
            -1,
            "arrow",
            1,
            "arrow-revers",
            ""
          ],
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary", "secondary"],
              1,
              "tertiary",
              0.9,
              "street",
              0.7,
              "minor",
              0.5,
              1
            ],
            18,
            1
          ],
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            1,
            "trunk",
            1,
            "primary",
            2,
            "secondary",
            3,
            "tertiary",
            4,
            "street",
            5,
            "minor",
            6,
            10
          ],
          "symbol-spacing": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            100,
            17,
            250,
            22,
            500
          ]
        },
        "paint": {"icon-opacity": 0.6, "text-opacity": 1}
      },
      {
        "id": "Surface - Ferry",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 9,
        "filter": [
          "all",
          ["==", "category", "ferry"],
          ["==", "subcategory", "boat"]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(200, 70%, 70%)",
          "line-dasharray": [2, 3],
          "line-width": {"stops": [[13, 1], [16, 2]]}
        }
      },
      {
        "id": "Surface - Path",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 14,
        "filter": ["all", ["match", ["get", "category"], ["path"], true, false]],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsla(225, 15%, 50%, 0.3)",
          "line-dasharray": {"stops": [[13, [0.5, 2]], [16, [0, 2]]]},
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            13,
            0.25,
            19,
            4
          ]
        }
      },
      {
        "id": "Surface - Minor road outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["match", ["get", "category"], ["minor"], true, false],
          ["!=", ["get", "tunnel"], true]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            13,
            [
              "match",
              ["get", "subcategory"],
              "pedestrian",
              "hsl(215, 15%, 92%)",
              "hsl(215, 15%, 92%)"
            ],
            15,
            [
              "match",
              ["get", "subcategory"],
              "pedestrian",
              "hsl(215, 15%, 70%)",
              "hsl(215, 15%, 70%)"
            ]
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            9,
            0,
            13,
            ["match", ["get", "subcategory"], ["parking"], 0.5, 0.5],
            19,
            ["match", ["get", "subcategory"], ["parking"], 10, 14]
          ]
        }
      },
      {
        "id": "Surface - Street outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 11,
        "filter": [
          "all",
          ["match", ["get", "category"], ["street"], true, false],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["!=", ["get", "tunnel"], true]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            10,
            "hsl(215, 15%, 70%)",
            15,
            "hsl(215, 15%, 70%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            9,
            ["match", ["get", "subcategory"], ["local"], 1.25, 1],
            13,
            ["match", ["get", "subcategory"], ["local"], 2.25, 1.75],
            19,
            ["match", ["get", "subcategory"], ["local"], 22.5, 18.5]
          ]
        }
      },
      {
        "id": "Surface - Tertiary road outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 10,
        "filter": [
          "all",
          ["match", ["get", "category"], ["tertiary"], true, false],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(215, 15%, 65%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            9,
            ["match", ["get", "subcategory"], ["connecting"], 2, 1.75],
            13,
            ["match", ["get", "subcategory"], ["connecting"], 3.5, 3],
            19,
            ["match", ["get", "subcategory"], ["connecting"], 31, 27]
          ]
        }
      },
      {
        "id": "Surface - Secondary road outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 8,
        "filter": [
          "all",
          ["match", ["get", "category"], ["secondary"], true, false],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(215, 15%, 65%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            0,
            9,
            2.5,
            13,
            4,
            19,
            35
          ]
        }
      },
      {
        "id": "Surface - Minor road",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["match", ["get", "category"], ["minor"], true, false],
          ["!=", ["get", "tunnel"], true]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": [
            "match",
            ["get", "subcategory"],
            "pedestrian",
            "hsl(225, 25%, 92%)",
            "hsl(0, 0%, 100%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            9,
            0,
            13,
            0,
            19,
            ["match", ["get", "subcategory"], ["parking"], 8, 12]
          ]
        }
      },
      {
        "id": "Surface - Restricted road dash",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 15,
        "filter": [
          "all",
          ["==", ["get", "category"], "minor"],
          ["==", ["get", "subcategory"], "restricted"],
          ["!=", ["get", "tunnel"], true]
        ],
        "layout": {"line-cap": "butt", "line-join": "round"},
        "paint": {
          "line-color": "hsl(225, 15%, 90%)",
          "line-dasharray": [2, 1.5],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            13,
            0,
            19,
            6
          ]
        }
      },
      {
        "id": "Surface - Street",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 11,
        "filter": [
          "all",
          ["match", ["get", "category"], ["street"], true, false],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["!=", ["get", "tunnel"], true],
          ["!=", ["get", "under_construction"], true]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            11,
            "hsl(0, 0%, 100%)",
            12,
            "hsl(0, 0%, 100%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            9,
            ["match", ["get", "subcategory"], ["local"], 1, 0.75],
            13,
            ["match", ["get", "subcategory"], ["local"], 1.5, 1],
            19,
            ["match", ["get", "subcategory"], ["local"], 20, 16]
          ]
        }
      },
      {
        "id": "Surface - Primary road outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 7,
        "filter": [
          "all",
          ["match", ["get", "category"], ["primary"], true, false],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(37, 80%, 65%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            0,
            9,
            3,
            13,
            5.5,
            19,
            39
          ]
        }
      },
      {
        "id": "Surface - Motorway & Trunk outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 5,
        "filter": [
          "all",
          ["match", ["get", "category"], ["motorway", "trunk"], true, false],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            "motorway",
            "hsl(37, 80%, 60%)",
            "trunk",
            "hsl(37, 80%, 60%)",
            "hsla(0, 0%, 0%, 0)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, 0.25],
            9,
            ["match", ["get", "category"], ["motorway"], 3.5, 3.25],
            13,
            ["match", ["get", "category"], ["motorway"], 6.5, 6],
            19,
            ["match", ["get", "category"], ["motorway"], 47, 43]
          ]
        }
      },
      {
        "id": "Surface - Road under construction",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 5,
        "filter": [
          "all",
          ["==", ["get", "under_construction"], true],
          [
            "match",
            ["get", "category"],
            ["railway", "minor", "path"],
            false,
            true
          ],
          [
            "any",
            ["match", ["get", "category"], ["tertiary"], false, true],
            [">=", ["zoom"], 10]
          ],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            8,
            "trunk",
            7,
            "primary",
            6,
            "secondary",
            5,
            "tertiary",
            4,
            "street",
            3,
            "minor",
            2,
            1
          ]
        },
        "paint": {
          "line-color": "hsl(0, 0%, 95%)",
          "line-pattern": "under-construction",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Surface - Tertiary road",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 10,
        "filter": [
          "all",
          ["match", ["get", "category"], ["tertiary"], true, false],
          ["!=", ["get", "under_construction"], true],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(0,0%,100%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            9,
            ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
            13,
            ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
            19,
            ["match", ["get", "subcategory"], ["connecting"], 28, 24]
          ]
        }
      },
      {
        "id": "Surface - Secondary road",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 8,
        "filter": [
          "all",
          ["match", ["get", "category"], ["secondary"], true, false],
          ["!=", ["get", "under_construction"], true],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(0,0%,100%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            0,
            9,
            1.75,
            13,
            3,
            19,
            32
          ]
        }
      },
      {
        "id": "Surface - Major road small scale outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "maxzoom": 13,
        "filter": [
          "all",
          ["in", "category", "motorway", "trunk", "primary"],
          ["!=", "tunnel", true],
          ["!=", "under_construction", true]
        ],
        "layout": {"line-cap": "butt", "line-join": "round"},
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(37, 80%, 60%)",
            ["trunk"],
            "hsl(37, 80%, 60%)",
            ["primary"],
            "hsl(37, 80%, 65%)",
            ["secondary", "tertiary"],
            "hsl(215, 15%, 65%)",
            ["street"],
            "hsl(215, 15%, 70%)",
            "hsl(215, 15%, 70%)"
          ],
          "line-opacity": {"stops": [[12, 1], [13, 0]]},
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              3.5,
              ["trunk"],
              3.25,
              ["primary"],
              3,
              ["secondary"],
              2.5,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2, 1.75],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.25, 1],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              6.5,
              ["trunk"],
              6,
              ["primary"],
              5.5,
              ["secondary"],
              4,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 3.5, 3],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 2.25, 1.75],
              ["match", ["get", "subcategory"], ["parking"], 0.5, 0.5]
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              47,
              ["trunk"],
              43,
              ["primary"],
              39,
              ["secondary"],
              35,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 31, 27],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 22.5, 18.5],
              ["match", ["get", "subcategory"], ["parking"], 10, 14]
            ]
          ]
        }
      },
      {
        "id": "Surface - Primary road",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 7,
        "filter": [
          "all",
          ["match", ["get", "category"], ["primary"], true, false],
          ["!=", ["get", "under_construction"], true],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            5,
            "hsl(37, 80%, 65%)",
            9,
            "hsl(47, 100%, 85%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            0,
            9,
            2,
            13,
            3.5,
            19,
            36
          ]
        }
      },
      {
        "id": "Surface - Motorway & Trunk",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 5,
        "filter": [
          "all",
          ["match", ["get", "category"], ["motorway", "trunk"], true, false],
          ["!=", ["get", "under_construction"], true],
          ["any", ["!=", ["get", "bridge"], true], ["<", ["zoom"], 13]],
          ["any", ["!=", ["get", "tunnel"], true], ["<", ["zoom"], 12]]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "trunk",
            1,
            "motorway",
            2,
            0
          ]
        },
        "paint": {
          "line-color": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            5,
            [
              "match",
              ["get", "category"],
              "motorway",
              "hsl(37, 80%, 60%)",
              "trunk",
              "hsl(37, 80%, 60%)",
              "hsla(0, 0%, 0%, 0)"
            ],
            9,
            [
              "match",
              ["get", "category"],
              "motorway",
              "hsl(47, 100%, 72%)",
              "trunk",
              "hsl(47, 100%, 80%)",
              "hsla(0, 0%, 0%, 0)"
            ]
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, 0.25],
            9,
            ["match", ["get", "category"], ["motorway"], 2.5, 2.25],
            13,
            ["match", ["get", "category"], ["motorway"], 4.5, 4],
            19,
            ["match", ["get", "category"], ["motorway"], 44, 40]
          ]
        }
      },
      {
        "id": "Surface - Road arrow",
        "type": "symbol",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 15,
        "filter": [
          "all",
          ["!=", ["get", "under_construction"], true],
          ["==", ["has", "direction"], true],
          ["!=", ["get", "bridge"], true],
          ["!=", ["get", "tunnel"], true],
          ["match", ["get", "category"], ["path"], false, true],
          [
            "any",
            ["match", ["get", "category"], ["minor"], false, true],
            [">=", ["zoom"], 16]
          ]
        ],
        "layout": {
          "icon-image": [
            "match",
            ["get", "direction"],
            -1,
            "arrow",
            1,
            "arrow-revers",
            ""
          ],
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary", "secondary"],
              1,
              "tertiary",
              0.9,
              "street",
              0.7,
              "minor",
              0.5,
              1
            ],
            18,
            1
          ],
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            1,
            "trunk",
            1,
            "primary",
            2,
            "secondary",
            3,
            "tertiary",
            4,
            "street",
            5,
            "minor",
            6,
            10
          ],
          "symbol-spacing": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            100,
            17,
            250,
            22,
            500
          ]
        },
        "paint": {"icon-opacity": 0.8, "text-opacity": 1}
      },
      {
        "id": "Surface - Rail ferry",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 9,
        "filter": [
          "all",
          ["==", "category", "ferry"],
          ["==", "subcategory", "rail"]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(210, 5%, 70%)",
          "line-dasharray": [3, 4],
          "line-width": {"stops": [[13, 1], [19, 1.5]]}
        }
      },
      {
        "id": "Surface - Railway outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 13,
        "filter": ["all", ["==", "category", "railway"], ["!=", "tunnel", true]],
        "layout": {"line-cap": "butt", "line-join": "bevel"},
        "paint": {
          "line-color": "hsl(210, 20%, 70%)",
          "line-width": {"stops": [[13, 0.5], [16, 0.75], [19, 9]]}
        }
      },
      {
        "id": "Surface - Railway fill",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 16,
        "filter": ["all", ["==", "category", "railway"], ["!=", "tunnel", true]],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(210, 10%, 97%)",
          "line-opacity": {"stops": [[16, 0], [17, 1]]},
          "line-width": {"stops": [[16, 0], [19, 8]]}
        }
      },
      {
        "id": "Surface - Railway dash",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 13,
        "filter": ["all", ["==", "category", "railway"], ["!=", "tunnel", true]],
        "layout": {"line-cap": "butt", "line-join": "bevel"},
        "paint": {
          "line-color": "hsl(210, 20%, 70%)",
          "line-dasharray": [0.05, 0.4],
          "line-width": {"stops": [[13, 0], [16, 3], [19, 12]]}
        }
      },
      {
        "id": "Bridge  - Z1 Road outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["any", ["==", ["get", "z_level"], 1], ["==", ["get", "bridge"], true]],
          ["match", ["get", "category"], ["railway", "path"], false, true]
        ],
        "layout": {"line-cap": "butt", "line-join": "round"},
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(37, 80%, 55%)",
            ["trunk"],
            "hsl(37, 80%, 55%)",
            ["primary"],
            "hsl(37, 80%, 60%)",
            ["secondary", "tertiary"],
            "hsl(215, 15%, 60%)",
            ["street"],
            "hsl(215, 15%, 65%)",
            "hsl(215, 15%, 65%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              3.5,
              ["trunk"],
              3.25,
              ["primary"],
              3,
              ["secondary"],
              2.5,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2, 1.75],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.25, 1],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              6.5,
              ["trunk"],
              6,
              ["primary"],
              5.5,
              ["secondary"],
              4,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 3.5, 3],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 2.25, 1.75],
              ["match", ["get", "subcategory"], ["parking"], 0.5, 0.5]
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              47,
              ["trunk"],
              43,
              ["primary"],
              39,
              ["secondary"],
              35,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 31, 27],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 22.5, 18.5],
              ["match", ["get", "subcategory"], ["parking"], 10, 14]
            ]
          ]
        }
      },
      {
        "id": "Bridge  - Z1 Road under construction",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "under_construction"], true],
          ["any", ["==", ["get", "z_level"], 1], ["==", ["get", "bridge"], true]],
          ["match", ["get", "category"], ["railway", "path"], false, true]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            7,
            "trunk",
            6,
            "primary",
            5,
            "secondary",
            4,
            "tertiary",
            3,
            "street",
            2,
            1
          ]
        },
        "paint": {
          "line-color": "hsl(0, 0%, 95%)",
          "line-pattern": "under-construction",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Bridge  - Z1 Road line",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["any", ["==", ["get", "z_level"], 1], ["==", ["get", "bridge"], true]],
          ["match", ["get", "category"], ["railway", "path"], false, true],
          ["!=", ["get", "under_construction"], true]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            7,
            "trunk",
            6,
            "primary",
            5,
            "secondary",
            4,
            "tertiary",
            3,
            "street",
            2,
            1
          ]
        },
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(47, 100%, 72%)",
            ["trunk"],
            "hsl(47, 100%, 80%)",
            ["primary"],
            "hsl(47, 100%, 85%)",
            ["secondary", "tertiary"],
            "hsl(0, 0%, 100%)",
            [
              "match",
              ["get", "subcategory"],
              "pedestrian",
              "hsl(225, 25%, 92%)",
              "hsl(0, 0%, 100%)"
            ]
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Bridge  - Z2 Road outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "z_level"], 2],
          ["match", ["get", "category"], ["railway", "path"], false, true]
        ],
        "layout": {"line-cap": "butt", "line-join": "round"},
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(37, 80%, 55%)",
            ["trunk"],
            "hsl(37, 80%, 55%)",
            ["primary"],
            "hsl(37, 80%, 60%)",
            ["secondary", "tertiary"],
            "hsl(215, 15%, 60%)",
            ["street"],
            "hsl(215, 15%, 65%)",
            "hsl(215, 15%, 65%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              3.5,
              ["trunk"],
              3.25,
              ["primary"],
              3,
              ["secondary"],
              2.25,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2, 1.75],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.25, 1],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              6.5,
              ["trunk"],
              6,
              ["primary"],
              5.5,
              ["secondary"],
              4,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 3.5, 3],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 2.25, 1.75],
              ["match", ["get", "subcategory"], ["parking"], 0.5, 0.5]
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              47,
              ["trunk"],
              43,
              ["primary"],
              39,
              ["secondary"],
              35,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 31, 27],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 22.5, 18.5],
              ["match", ["get", "subcategory"], ["parking"], 10, 14]
            ]
          ]
        }
      },
      {
        "id": "Bridge  - Z2 Road under construction",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "z_level"], 2],
          ["==", ["get", "under_construction"], true],
          ["match", ["get", "category"], ["railway", "path"], false, true]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            7,
            "trunk",
            6,
            "primary",
            5,
            "secondary",
            4,
            "tertiary",
            3,
            "street",
            2,
            1
          ]
        },
        "paint": {
          "line-color": "hsl(0, 0%, 95%)",
          "line-pattern": "under-construction",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Bridge  - Z2 Road line",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "z_level"], 2],
          ["!=", ["get", "under_construction"], true],
          ["match", ["get", "category"], ["railway", "path"], false, true]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            7,
            "trunk",
            6,
            "primary",
            5,
            "secondary",
            4,
            "tertiary",
            3,
            "street",
            2,
            1
          ]
        },
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(47, 100%, 72%)",
            ["trunk"],
            "hsl(47, 100%, 80%)",
            ["primary"],
            "hsl(47, 100%, 85%)",
            ["secondary", "tertiary"],
            "hsl(0, 0%, 100%)",
            [
              "match",
              ["get", "subcategory"],
              "pedestrian",
              "hsl(225, 25%, 92%)",
              "hsl(0, 0%, 100%)"
            ]
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Bridge  - Z3+ Road outline",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          [">=", ["get", "z_level"], 3],
          ["match", ["get", "category"], ["railway", "path"], false, true]
        ],
        "layout": {"line-cap": "butt", "line-join": "round"},
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(37, 80%, 55%)",
            ["trunk"],
            "hsl(37, 80%, 55%)",
            ["primary"],
            "hsl(37, 80%, 60%)",
            ["secondary", "tertiary"],
            "hsl(215, 15%, 60%)",
            ["street"],
            "hsl(215, 15%, 65%)",
            "hsl(215, 15%, 65%)"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              3.5,
              ["trunk"],
              3.25,
              ["primary"],
              3,
              ["secondary"],
              2.25,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2, 1.75],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.25, 1],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              6.5,
              ["trunk"],
              6,
              ["primary"],
              5.5,
              ["secondary"],
              4,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 3.5, 3],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 2.25, 1.75],
              ["match", ["get", "subcategory"], ["parking"], 0.5, 0.5]
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              47,
              ["trunk"],
              43,
              ["primary"],
              39,
              ["secondary"],
              35,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 31, 27],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 22.5, 18.5],
              ["match", ["get", "subcategory"], ["parking"], 10, 14]
            ]
          ]
        }
      },
      {
        "id": "Bridge  - Z3+ Road under construction",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          [">=", ["get", "z_level"], 3],
          ["==", ["get", "under_construction"], true],
          ["match", ["get", "category"], ["railway", "path"], false, true]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            7,
            "trunk",
            6,
            "primary",
            5,
            "secondary",
            4,
            "tertiary",
            3,
            "street",
            2,
            1
          ]
        },
        "paint": {
          "line-color": "hsl(0, 0%, 95%)",
          "line-pattern": "under-construction",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Bridge  - Z3+ Road line",
        "type": "line",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 12,
        "filter": [
          "all",
          [">=", ["get", "z_level"], 3],
          ["!=", ["get", "under_construction"], true],
          ["match", ["get", "category"], ["railway", "path"], false, true]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "line-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            7,
            "trunk",
            6,
            "primary",
            5,
            "secondary",
            4,
            "tertiary",
            3,
            "street",
            2,
            1
          ]
        },
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            ["motorway"],
            "hsl(47, 100%, 72%)",
            ["trunk"],
            "hsl(47, 100%, 80%)",
            ["primary"],
            "hsl(47, 100%, 85%)",
            ["secondary", "tertiary"],
            "hsl(0, 0%, 100%)",
            [
              "match",
              ["get", "subcategory"],
              "pedestrian",
              "hsl(225, 25%, 92%)",
              "hsl(0, 0%, 100%)"
            ]
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            5,
            ["match", ["get", "category"], ["motorway"], 0.5, ["trunk"], 0.25, 0],
            9,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              2.5,
              ["trunk"],
              2.25,
              ["primary"],
              2,
              ["secondary"],
              1.75,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 1.5, 1.25],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1, 0.75],
              0
            ],
            13,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              4.5,
              ["trunk"],
              4,
              ["primary"],
              3.5,
              ["secondary"],
              3,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 2.5, 2],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 1.5, 1],
              0
            ],
            19,
            [
              "match",
              ["get", "category"],
              ["motorway"],
              44,
              ["trunk"],
              40,
              ["primary"],
              36,
              ["secondary"],
              32,
              ["tertiary"],
              ["match", ["get", "subcategory"], ["connecting"], 28, 24],
              ["street"],
              ["match", ["get", "subcategory"], ["local"], 20, 16],
              ["match", ["get", "subcategory"], ["parking"], 8, 12]
            ]
          ]
        }
      },
      {
        "id": "Bridge - Road arrow",
        "type": "symbol",
        "metadata": {"group": "road"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 15,
        "filter": [
          "all",
          ["!=", ["get", "under_construction"], true],
          ["==", ["has", "direction"], true],
          ["any", [">=", ["get", "z_level"], 1], ["==", ["get", "bridge"], true]],
          ["match", ["get", "category"], ["railway", "path"], false, true],
          [
            "any",
            ["match", ["get", "category"], ["minor"], false, true],
            [">=", ["zoom"], 16]
          ]
        ],
        "layout": {
          "icon-image": [
            "match",
            ["get", "direction"],
            -1,
            "arrow",
            1,
            "arrow-revers",
            ""
          ],
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary", "secondary"],
              1,
              "tertiary",
              0.9,
              "street",
              0.7,
              "minor",
              0.5,
              1
            ],
            18,
            1
          ],
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            1,
            "trunk",
            1,
            "primary",
            2,
            "secondary",
            3,
            "tertiary",
            4,
            "street",
            5,
            "minor",
            6,
            10
          ],
          "symbol-spacing": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            100,
            17,
            250,
            22,
            500
          ]
        },
        "paint": {"icon-opacity": 0.8, "text-opacity": 1}
      },
      {
        "id": "Borders - Landuse background",
        "type": "line",
        "metadata": {"group": "border"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 12,
        "filter": [
          "any",
          ["==", "category", "military"],
          ["==", "subcategory", "national"]
        ],
        "layout": {"line-cap": "round", "line-join": "miter"},
        "paint": {
          "line-blur": 1,
          "line-color": [
            "match",
            ["get", "category"],
            "military",
            "hsla(324, 8%, 55%, 1)",
            "hsla(120, 35%, 53%, 1)"
          ],
          "line-offset": 2,
          "line-opacity": {"stops": [[12, 0], [14, 0.15]]},
          "line-width": 4
        }
      },
      {
        "id": "Borders - Landuse",
        "type": "line",
        "metadata": {"group": "border"},
        "source": "vectorTiles",
        "source-layer": "land_use",
        "minzoom": 11,
        "filter": [
          "any",
          ["==", "category", "military"],
          ["==", "subcategory", "national"]
        ],
        "layout": {"line-cap": "round", "line-join": "miter"},
        "paint": {
          "line-color": [
            "match",
            ["get", "category"],
            "military",
            "hsla(324, 8%, 55%, 1)",
            "hsla(120, 40%, 55%, 1)"
          ],
          "line-offset": 0,
          "line-opacity": {"stops": [[11, 0], [13, 0.7]]},
          "line-width": 0.5
        }
      },
      {
        "id": "Borders - Treaty",
        "type": "line",
        "metadata": {"group": "border"},
        "source": "vectorTiles",
        "source-layer": "boundaries",
        "filter": [
          "all",
          ["==", "category", "country"],
          ["!has", "disputed"],
          ["has", "treaty"]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(219, 70%, 70%)",
          "line-dasharray": {"stops": [[3, [2, 3]], [6, [2, 4]], [7, [2, 4]]]},
          "line-width": {"stops": [[3, 1], [6, 1.3], [7, 1.3], [8, 1.6], [18, 2]]}
        }
      },
      {
        "id": "Borders - Disputed",
        "type": "line",
        "metadata": {"group": "border"},
        "source": "vectorTiles",
        "source-layer": "boundaries",
        "filter": [
          "all",
          ["==", "category", "country"],
          ["has", "disputed"],
          ["!has", "treaty"]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(23, 56%, 66%)",
          "line-dasharray": {
            "stops": [[3, [1, 1, 0, 1]], [6, [2, 2, 0, 2]], [7, [3, 3, 0, 3]]]
          },
          "line-width": {"stops": [[3, 1], [6, 1.3], [7, 1.3], [8, 1.6], [18, 2]]}
        }
      },
      {
        "id": "Borders - State background",
        "type": "line",
        "metadata": {"group": "border"},
        "source": "vectorTiles",
        "source-layer": "boundaries",
        "minzoom": 7,
        "filter": [
          "all",
          ["==", "category", "state"],
          ["!has", "disputed"],
          ["!has", "treaty"]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {"stops": [[8, 0.5], [10, 0]]},
          "line-width": {"stops": [[7, 2.7], [8, 3], [18, 3]]}
        }
      },
      {
        "id": "Borders - State",
        "type": "line",
        "metadata": {"group": "border"},
        "source": "vectorTiles",
        "source-layer": "boundaries",
        "minzoom": 3,
        "filter": [
          "all",
          ["==", "category", "state"],
          ["!has", "disputed"],
          ["!has", "treaty"]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": {
            "stops": [[3, "hsl(60, 6%, 77%)"], [8, "hsl(94, 5%, 71%)"]]
          },
          "line-dasharray": {"stops": [[3, [1, 0]], [4, [2, 2]]]},
          "line-width": {"stops": [[3, 0.5], [10, 2]]}
        }
      },
      {
        "id": "Borders - Country background",
        "type": "line",
        "metadata": {"group": "border"},
        "source": "vectorTiles",
        "source-layer": "boundaries",
        "filter": [
          "all",
          ["==", "category", "country"],
          ["!has", "disputed"],
          ["!has", "treaty"]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(0, 0%, 100%)",
          "line-width": {"stops": [[4, 2], [10, 3], [11, 4]]}
        }
      },
      {
        "id": "Borders - Country",
        "type": "line",
        "metadata": {"group": "border"},
        "source": "vectorTiles",
        "source-layer": "boundaries",
        "filter": [
          "all",
          ["==", "category", "country"],
          ["!has", "disputed"],
          ["!has", "treaty"]
        ],
        "layout": {"line-cap": "round", "line-join": "round"},
        "paint": {
          "line-color": "hsl(0, 1%, 54%)",
          "line-width": {"stops": [[4, 1], [10, 2], [11, 3]]}
        }
      },
      {
        "id": "Borders - Treaty label",
        "type": "symbol",
        "metadata": {"group": "label"},
        "source": "vectorTiles",
        "source-layer": "boundaries",
        "minzoom": 6,
        "filter": [
          "all",
          ["==", "category", "country"],
          ["!has", "disputed"],
          ["has", "treaty"]
        ],
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-font": ["Noto-Regular"],
          "text-keep-upright": true,
          "text-letter-spacing": 0.1,
          "text-rotation-alignment": "map",
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14,
            14,
            16,
            16,
            20,
            20
          ]
        },
        "paint": {
          "text-color": "hsl(209, 48%, 56%)",
          "text-halo-color": "hsl(205, 44%, 92%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "NatureLabels - Physiography",
        "type": "symbol",
        "metadata": {"group": "label"},
        "source": "vectorTiles",
        "source-layer": "carto_labels",
        "minzoom": 7,
        "maxzoom": 15,
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 7],
            [
              "all",
              ["!=", ["get", "name"], " "],
              ["==", ["get", "category"], "island"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 10],
            [
              "any",
              ["!=", ["get", "name"], " "],
              ["==", ["get", "category"], "woodland"]
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "point",
          "text-anchor": "top",
          "text-field": "{name}",
          "text-font": ["NotoSans-MediumItalic"],
          "text-letter-spacing": 0.25,
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["match", ["get", "category"], "island", 11, "woodland", 0, 0],
            12,
            ["match", ["get", "category"], "island", 11, "woodland", 9, 0],
            17,
            ["match", ["get", "category"], "island", 20, "woodland", 18, 0]
          ]
        },
        "paint": {
          "text-color": [
            "match",
            ["get", "category"],
            "island",
            "hsl(60, 5%, 40%)",
            "woodland",
            "hsl(120, 25%, 41%)",
            "hsla(0,0%,100%, 0)"
          ],
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1.4
        }
      },
      {
        "id": "NatureLabels - River line",
        "type": "symbol",
        "metadata": {"group": "label"},
        "source": "vectorTiles",
        "source-layer": "water_lines",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", "category", "permanent_water"],
          ["==", "subcategory", "river"]
        ],
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-spacing": 400,
          "text-field": "{name}",
          "text-font": ["NotoSans-MediumItalic"],
          "text-keep-upright": true,
          "text-letter-spacing": 0.1,
          "text-rotation-alignment": "map",
          "text-size": {"stops": [[0, 8], [12, 11], [16, 16]]}
        },
        "paint": {
          "text-color": "hsl(200, 48%, 56%)",
          "text-halo-color": "hsl(200, 44%, 92%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "NatureLabels - River area",
        "type": "symbol",
        "metadata": {"group": "label"},
        "source": "vectorTiles",
        "source-layer": "carto_labels",
        "minzoom": 12,
        "filter": [
          "all",
          ["!=", "name", " "],
          ["==", "category", "permanent_water"],
          ["==", "subcategory", "river"]
        ],
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-spacing": 400,
          "text-field": "{name}",
          "text-font": ["NotoSans-MediumItalic"],
          "text-keep-upright": true,
          "text-letter-spacing": 0.1,
          "text-rotation-alignment": "map",
          "text-size": {"stops": [[0, 8], [12, 11], [16, 16]]}
        },
        "paint": {
          "text-color": "hsl(200, 48%, 56%)",
          "text-halo-color": "hsl(200, 44%, 92%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "NatureLabels - Water area",
        "type": "symbol",
        "metadata": {"group": "label"},
        "source": "vectorTiles",
        "source-layer": "carto_labels",
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 0],
            [
              "all",
              ["!=", ["get", "name"], " "],
              ["==", ["get", "category"], "permanent_water"],
              ["==", ["get", "subcategory"], "ocean"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 3],
            [
              "all",
              ["!=", ["get", "name"], " "],
              ["==", ["get", "category"], "permanent_water"],
              ["==", ["get", "subcategory"], "sea"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 8],
            [
              "all",
              ["!=", ["get", "name"], " "],
              ["==", ["get", "category"], "permanent_water"],
              ["==", ["get", "subcategory"], "lake"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 14],
            [
              "all",
              ["!=", ["get", "name"], " "],
              [
                "any",
                [
                  "all",
                  ["==", ["get", "category"], "permanent_water"],
                  ["!=", ["get", "subcategory"], ""]
                ],
                ["==", ["get", "category"], "intermittent_water"]
              ]
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "point",
          "text-allow-overlap": false,
          "text-field": "{name}",
          "text-font": ["NotoSans-MediumItalic"],
          "text-ignore-placement": false,
          "text-keep-upright": true,
          "text-letter-spacing": 0.25,
          "text-optional": false,
          "text-pitch-alignment": "auto",
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            ["match", ["get", "subcategory"], "ocean", 8, "sea", 8, 0],
            4,
            ["match", ["get", "subcategory"], "ocean", 15, "sea", 11, 0],
            5,
            ["match", ["get", "subcategory"], "ocean", 16, "sea", 15, 9],
            12,
            [
              "match",
              ["get", "subcategory"],
              "ocean",
              17,
              "sea",
              17,
              "lake",
              11,
              9
            ],
            17,
            [
              "match",
              ["get", "subcategory"],
              "ocean",
              19,
              "sea",
              19,
              "lake",
              16,
              16
            ]
          ]
        },
        "paint": {
          "text-color": "hsl(200, 60%, 50%)",
          "text-halo-color": "hsla(200, 26%, 91%, 0.5)",
          "text-halo-width": 1
        }
      },
      {
        "id": "TransitLabels - Ferry",
        "type": "symbol",
        "metadata": {"group": "road_label"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 9,
        "filter": [
          "all",
          ["==", "category", "ferry"],
          ["==", "subcategory", "boat"]
        ],
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-font": ["Noto-Regular"],
          "text-keep-upright": true,
          "text-letter-spacing": 0.05,
          "text-rotation-alignment": "map",
          "text-size": {"stops": [[14, 12]]}
        },
        "paint": {
          "text-color": "hsl(200, 48%, 52%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.5)",
          "text-halo-width": 1
        }
      },
      {
        "id": "TransitLabels - Road",
        "type": "symbol",
        "metadata": {"group": "road_label"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 10,
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 10],
            [
              "any",
              ["==", ["get", "category"], "motorway"],
              ["==", ["get", "category"], "trunk"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 11],
            [
              "any",
              ["==", ["get", "category"], "primary"],
              ["==", ["get", "category"], "secondary"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 12],
            [
              "any",
              ["==", ["get", "category"], "tertiary"],
              ["==", ["get", "category"], "street"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 14],
            [
              "all",
              [
                "any",
                ["==", ["get", "category"], "minor"],
                ["==", ["get", "category"], "street"]
              ],
              ["!=", ["get", "subcategory"], "service"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 15],
            [
              "any",
              ["==", ["get", "subcategory"], "service"],
              ["==", ["get", "category"], "path"]
            ]
          ]
        ],
        "layout": {
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            1,
            "trunk",
            1,
            "primary",
            2,
            "secondary",
            3,
            "tertiary",
            4,
            "street",
            5,
            "minor",
            6,
            10
          ],
          "symbol-spacing": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            250,
            17,
            400,
            22,
            800
          ],
          "text-field": "{name}",
          "text-font": ["Noto-Regular"],
          "text-keep-upright": true,
          "text-letter-spacing": 0.05,
          "text-pitch-alignment": "viewport",
          "text-rotation-alignment": "map",
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary", "secondary", "tertiary"],
              13,
              ["street"],
              11,
              9
            ],
            18,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary"],
              15,
              ["secondary", "tertiary"],
              13,
              ["street"],
              12,
              11
            ]
          ]
        },
        "paint": {
          "text-color": [
            "match",
            ["get", "category"],
            "motorway",
            "hsl(208, 14%, 21%)",
            "trunk",
            "hsl(208, 14%, 21%)",
            "primary",
            "hsl(208, 14%, 21%)",
            "secondary",
            "hsl(209, 15%, 28%)",
            "hsl(208, 15%, 35%)"
          ],
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": {"stops": [[0, 1], [16, 1.5], [17, 2]]}
        }
      },
      {
        "id": "TransitLabels - Road Shield 4",
        "type": "symbol",
        "metadata": {"group": "shield"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 7,
        "filter": [
          "all",
          ["has", "shield_icon_3"],
          [
            "step",
            ["zoom"],
            ["match", ["get", "category"], ["motorway", "trunk"], true, false],
            8,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary"],
              true,
              false
            ],
            10,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary", "secondary"],
              true,
              false
            ],
            12,
            ["match", ["get", "category"], ["street"], false, true]
          ]
        ],
        "layout": {
          "icon-image": "{shield_icon_3}",
          "icon-padding": 5,
          "icon-rotation-alignment": "viewport",
          "icon-size": {"stops": [[10, 0.85], [12, 1]]},
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            1,
            "trunk",
            2,
            "primary",
            3,
            "secondary",
            4,
            "tertiary",
            5,
            "street",
            6,
            "minor",
            7,
            10
          ],
          "symbol-spacing": 725,
          "text-field": "{shield_icon_text_3}",
          "text-font": ["Noto-Bold"],
          "text-padding": 5,
          "text-rotation-alignment": "viewport",
          "text-size": 10
        },
        "paint": {
          "text-color": {
            "property": "shield_icon_text_color_3",
            "type": "identity"
          }
        }
      },
      {
        "id": "TransitLabels - Road Shield 3",
        "type": "symbol",
        "metadata": {"group": "shield"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 7,
        "filter": [
          "all",
          ["has", "shield_icon_2"],
          [
            "step",
            ["zoom"],
            ["match", ["get", "category"], ["motorway", "trunk"], true, false],
            8,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary"],
              true,
              false
            ],
            10,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary", "secondary"],
              true,
              false
            ],
            12,
            ["match", ["get", "category"], ["street"], false, true]
          ]
        ],
        "layout": {
          "icon-image": "{shield_icon_2}",
          "icon-padding": 5,
          "icon-rotation-alignment": "viewport",
          "icon-size": {"stops": [[10, 0.85], [12, 1]]},
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            1,
            "trunk",
            2,
            "primary",
            3,
            "secondary",
            4,
            "tertiary",
            5,
            "street",
            6,
            "minor",
            7,
            10
          ],
          "symbol-spacing": 650,
          "text-field": "{shield_icon_text_2}",
          "text-font": ["Noto-Bold"],
          "text-padding": 5,
          "text-rotation-alignment": "viewport",
          "text-size": 10
        },
        "paint": {
          "text-color": {
            "property": "shield_icon_text_color_2",
            "type": "identity"
          }
        }
      },
      {
        "id": "TransitLabels - Road Shield 2",
        "type": "symbol",
        "metadata": {"group": "shield"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 7,
        "filter": [
          "all",
          ["has", "shield_icon_1"],
          [
            "step",
            ["zoom"],
            ["match", ["get", "category"], ["motorway", "trunk"], true, false],
            8,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary"],
              true,
              false
            ],
            10,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary", "secondary"],
              true,
              false
            ],
            12,
            ["match", ["get", "category"], ["street"], false, true]
          ]
        ],
        "layout": {
          "icon-image": "{shield_icon_1}",
          "icon-padding": 5,
          "icon-rotation-alignment": "viewport",
          "icon-size": {"stops": [[10, 0.85], [12, 1]]},
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            1,
            "trunk",
            2,
            "primary",
            3,
            "secondary",
            4,
            "tertiary",
            5,
            "street",
            6,
            "minor",
            7,
            10
          ],
          "symbol-spacing": 575,
          "text-field": "{shield_icon_text_1}",
          "text-font": ["Noto-Bold"],
          "text-padding": 5,
          "text-rotation-alignment": "viewport",
          "text-size": 10
        },
        "paint": {
          "text-color": {
            "property": "shield_icon_text_color_1",
            "type": "identity"
          }
        }
      },
      {
        "id": "TransitLabels - Road Shield 1",
        "type": "symbol",
        "metadata": {"group": "shield"},
        "source": "vectorTiles",
        "source-layer": "roads",
        "minzoom": 7,
        "filter": [
          "all",
          ["has", "shield_icon_0"],
          [
            "step",
            ["zoom"],
            ["match", ["get", "category"], ["motorway", "trunk"], true, false],
            8,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary"],
              true,
              false
            ],
            10,
            [
              "match",
              ["get", "category"],
              ["motorway", "trunk", "primary", "secondary"],
              true,
              false
            ],
            12,
            ["match", ["get", "category"], ["street"], false, true]
          ]
        ],
        "layout": {
          "icon-image": "{shield_icon_0}",
          "icon-padding": 5,
          "icon-rotation-alignment": "viewport",
          "icon-size": {"stops": [[10, 0.85], [12, 1]]},
          "symbol-avoid-edges": true,
          "symbol-placement": "line",
          "symbol-sort-key": [
            "match",
            ["get", "category"],
            "motorway",
            1,
            "trunk",
            2,
            "primary",
            3,
            "secondary",
            4,
            "tertiary",
            5,
            "street",
            6,
            "minor",
            7,
            10
          ],
          "symbol-spacing": 500,
          "text-field": "{shield_icon_text_0}",
          "text-font": ["Noto-Bold"],
          "text-padding": 5,
          "text-rotation-alignment": "viewport",
          "text-size": 10
        },
        "paint": {
          "text-color": {
            "property": "shield_icon_text_color_0",
            "type": "identity"
          }
        }
      },
      {
        "id": "3D - Building",
        "type": "fill-extrusion",
        "metadata": {"group": "area_3d"},
        "source": "vectorTiles",
        "source-layer": "buildings",
        "minzoom": 15,
        "layout": {"visibility": "none"},
        "paint": {
          "fill-extrusion-base": [
            "case",
            ["has", "ground_height"],
            ["get", "ground_height"],
            0
          ],
          "fill-extrusion-color": [
            "match",
            ["get", "category"],
            ["government", "institution", "prison", "place_of_worship"],
            "hsl(324, 8%, 83%)",
            "education",
            "hsl(40, 25%, 81%)",
            "industrial",
            "hsl(240, 15%, 83%)",
            "railway_station",
            "hsl(210, 32%, 83%)",
            "hotel",
            "hsl(245, 22%, 83%)",
            "hospital",
            "hsl(6, 45%, 83%)",
            "cultural",
            "hsl(324, 15%, 83%)",
            "hsl(215, 15%, 86%)"
          ],
          "fill-extrusion-height": [
            "case",
            ["has", "height"],
            ["get", "height"],
            4
          ],
          "fill-extrusion-opacity": 0.4,
          "fill-extrusion-vertical-gradient": false
        }
      },
      {
        "id": "House Number",
        "type": "symbol",
        "metadata": {"group": "address_point_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "minzoom": 18,
        "maxzoom": 22,
        "filter": ["all", ["==", "category", "address_point"], ["has", "number"]],
        "layout": {
          "symbol-placement": "point",
          "text-field": "{number}",
          "text-font": ["Noto-Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 18, 10, 20, 12]
        },
        "paint": {
          "text-color": "hsl(200, 1%, 45%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.5)",
          "text-halo-width": 1
        }
      },
      {
        "id": "POI",
        "type": "symbol",
        "metadata": {"group": "POI"},
        "source": "vectorTiles",
        "source-layer": "poi_basic",
        "filter": [
          "all",
          [
            "any",
            ["all", ["<=", ["zoom"], 10], ["<=", ["get", "priority"], 109]],
            ["all", ["==", ["zoom"], 11], ["<=", ["get", "priority"], 119]],
            ["all", ["==", ["zoom"], 12], ["<=", ["get", "priority"], 129]],
            ["all", ["==", ["zoom"], 13], ["<=", ["get", "priority"], 139]],
            ["all", ["==", ["zoom"], 14], ["<=", ["get", "priority"], 149]],
            ["all", ["==", ["zoom"], 15], ["<=", ["get", "priority"], 159]],
            ["all", ["==", ["zoom"], 16], ["<=", ["get", "priority"], 169]],
            ["all", ["==", ["zoom"], 17], ["<=", ["get", "priority"], 179]],
            ["all", [">=", ["zoom"], 18], ["<=", ["get", "priority"], 189]]
          ],
          [
            "any",
            ["==", ["get", "category"], "industrial_building"],
            ["==", ["get", "category"], "college_or_university"],
            ["==", ["get", "category"], "fire_station_or_brigade"],
            ["==", ["get", "category"], "government_office"],
            ["==", ["get", "category"], "library"],
            ["==", ["get", "category"], "military_installation"],
            ["==", ["get", "category"], "native_reservation"],
            ["==", ["get", "category"], "non_governmental_organization"],
            ["==", ["get", "category"], "police_station"],
            ["==", ["get", "category"], "post_office"],
            ["==", ["get", "category"], "prison_or_correctional_facility"],
            ["==", ["get", "category"], "school"],
            ["==", ["get", "category"], "hospital"],
            ["==", ["get", "category"], "amusement_park"],
            ["==", ["get", "category"], "museum"],
            ["==", ["get", "category"], "park_and_recreation_area"],
            ["==", ["get", "category"], "zoo_arboreta_and_botanical_garden"],
            ["==", ["get", "category"], "shopping_center"],
            ["==", ["get", "category"], "golf_course"],
            ["==", ["get", "category"], "stadium"],
            ["==", ["get", "category"], "tourist_attraction"],
            ["==", ["get", "category"], "place_of_worship"],
            ["==", ["get", "category"], "airport"],
            ["==", ["get", "category"], "ferry_terminal"],
            ["==", ["get", "category"], "public_transportation_stop"],
            ["==", ["get", "category"], "railroad_station"],
            ["==", ["get", "category"], "geographic_feature"]
          ]
        ],
        "layout": {
          "icon-image": "{icon}",
          "icon-padding": 5,
          "icon-size": {"stops": [[10, 0.7], [18, 1]]},
          "symbol-avoid-edges": true,
          "symbol-placement": "point",
          "symbol-sort-key": ["get", "priority"],
          "symbol-z-order": "auto",
          "text-field": "{name}\n{sub_text}",
          "text-font": ["Noto-Regular"],
          "text-justify": "auto",
          "text-letter-spacing": 0.1,
          "text-line-height": 1.1,
          "text-optional": true,
          "text-radial-offset": {"stops": [[10, 1], [18, 1.3]]},
          "text-size": [
            "step",
            ["zoom"],
            ["/", 14, ["log10", ["max", ["length", ["get", "name"]], 30]]],
            10,
            ["/", 16, ["log10", ["max", ["length", ["get", "name"]], 30]]],
            15,
            ["/", 17, ["log10", ["max", ["length", ["get", "name"]], 30]]],
            18,
            ["/", 18, ["log10", ["max", ["length", ["get", "name"]], 30]]]
          ],
          "text-variable-anchor": ["top", "left", "bottom", "right"]
        },
        "paint": {
          "text-color": {
            "property": "category",
            "stops": [
              ["industrial_building", "hsl(237, 14%, 32%)"],
              ["college_or_university", "hsl(31, 38%, 27%)"],
              ["fire_station_or_brigade", "hsl(324, 8%, 35%)"],
              ["government_office", "hsl(324, 8%, 35%)"],
              ["library", "hsl(324, 8%, 35%)"],
              ["military_installation", "hsl(324, 8%, 35%)"],
              ["native_reservation", "hsl(160, 43%, 23%)"],
              ["non_governmental_organization", "hsl(324, 8%, 35%)"],
              ["police_station", "hsl(324, 8%, 35%)"],
              ["post_office", "hsl(291, 29%, 41%)"],
              ["prison_or_correctional_facility", "hsl(324, 8%, 35%)"],
              ["school", "hsl(31, 38%, 27%)"],
              ["hospital", "hsl(8, 63%, 29%)"],
              ["amusement_park", "hsl(324, 35%, 33%)"],
              ["museum", "hsl(324, 35%, 33%)"],
              ["park_and_recreation_area", "hsl(160, 43%, 23%)"],
              ["zoo_arboreta_and_botanical_garden", "hsl(324, 35%, 33%)"],
              ["shopping_center", "hsl(291, 29%, 41%)"],
              ["golf_course", "hsl(160, 43%, 23%)"],
              ["stadium", "hsl(324, 35%, 33%)"],
              ["tourist_attraction", "hsl(160, 43%, 23%)"],
              ["place_of_worship", "hsl(324, 8%, 35%)"],
              ["airport", "hsl(212, 58%, 32%)"],
              ["ferry_terminal", "hsl(212, 58%, 32%)"],
              ["public_transportation_stop", "hsl(212, 58%, 32%)"],
              ["railroad_station", "hsl(212, 58%, 32%)"],
              ["geographic_feature", "hsl(160, 43%, 23%)"]
            ],
            "type": "categorical"
          },
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "Places - Village / Hamlet",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "minzoom": 11,
        "maxzoom": 17,
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 11],
            ["==", ["get", "subcategory"], "village"]
          ],
          ["all", [">=", ["zoom"], 12], ["==", ["get", "subcategory"], "hamlet"]]
        ],
        "layout": {
          "symbol-placement": "point",
          "symbol-sort-key": [
            "+",
            ["length", ["get", "name"]],
            ["*", ["get", "priority"], 100]
          ],
          "text-field": "{name}",
          "text-font": ["Noto-Regular"],
          "text-padding": 10,
          "text-size": [
            "step",
            ["zoom"],
            ["match", ["get", "category"], "hamlet", 0, 11],
            11,
            ["match", ["get", "category"], "hamlet", 0, 12],
            13,
            ["match", ["get", "category"], "hamlet", 12, 13],
            14,
            ["match", ["get", "category"], "hamlet", 14, 15]
          ]
        },
        "paint": {
          "text-color": "hsl(200, 1%, 40%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.8)",
          "text-halo-width": 1
        }
      },
      {
        "id": "Places - Neighbourhood",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "minzoom": 11,
        "maxzoom": 17,
        "filter": [
          "any",
          [
            "all",
            ["!=", "name", " "],
            ["==", "category", "settlement_division"],
            ["==", "subcategory", "neighbourhood"]
          ],
          ["all", ["==", "admin_class", 5], ["==", "display_class", 8]]
        ],
        "layout": {
          "icon-padding": 2,
          "symbol-placement": "point",
          "symbol-sort-key": [
            "+",
            ["length", ["get", "name"]],
            ["*", ["get", "priority"], 100]
          ],
          "text-field": "{name}",
          "text-font": ["Noto-Regular"],
          "text-letter-spacing": 0.05,
          "text-padding": 20,
          "text-size": ["interpolate", ["linear"], ["zoom"], 11, 10, 17, 14],
          "text-transform": "uppercase"
        },
        "paint": {
          "text-color": "hsl(200, 1%, 40%)",
          "text-halo-color": "hsla(0, 0%, 100%, 1)",
          "text-halo-width": 1
        }
      },
      {
        "id": "Places - Town",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "minzoom": 9,
        "maxzoom": 17,
        "filter": [
          "all",
          ["!=", "name", " "],
          [">=", "priority", 110],
          ["<", "priority", 129],
          ["==", "category", "settlement"],
          ["==", "subcategory", "town"]
        ],
        "layout": {
          "icon-padding": 2,
          "symbol-placement": "point",
          "symbol-sort-key": [
            "+",
            ["length", ["get", "name"]],
            ["*", ["get", "priority"], 100]
          ],
          "text-field": "{name}",
          "text-font": ["Noto-Regular"],
          "text-padding": 10,
          "text-size": ["interpolate", ["linear"], ["zoom"], 9, 12, 17, 19]
        },
        "paint": {
          "text-color": "hsl(0, 0%, 35%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.8)",
          "text-halo-width": 1
        }
      },
      {
        "id": "Places - Small city",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "minzoom": 7,
        "maxzoom": 17,
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 7],
            [">=", ["get", "display_class"], 9],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"],
            [">=", ["get", "priority"], 90],
            ["<=", ["get", "priority"], 104]
          ],
          [
            "all",
            [">=", ["zoom"], 8],
            ["!=", ["get", "name"], " "],
            [">=", ["get", "display_class"], 9],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"]
          ]
        ],
        "layout": {
          "icon-image": "{icon}",
          "icon-size": ["step", ["zoom"], 1, 8, 0],
          "symbol-placement": "point",
          "symbol-sort-key": [
            "+",
            ["length", ["get", "name"]],
            ["*", ["get", "priority"], 100]
          ],
          "text-anchor": ["step", ["zoom"], "bottom", 8, "center"],
          "text-field": "{name}",
          "text-font": ["Noto-Regular"],
          "text-justify": "auto",
          "text-letter-spacing": 0.05,
          "text-padding": ["step", ["zoom"], 4, 8, 5],
          "text-radial-offset": ["step", ["zoom"], 0.7, 8, 0],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["match", ["get", "display_class"], 9, 13, 10, 12, 13],
            8,
            ["match", ["get", "display_class"], 9, 14, 10, 13, 13],
            11,
            ["match", ["get", "display_class"], 9, 16, 10, 15, 15],
            17,
            ["match", ["get", "display_class"], 9, 21, 10, 21, 21]
          ]
        },
        "paint": {
          "text-color": "hsl(0, 0%, 30%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.8)",
          "text-halo-width": 1.4
        }
      },
      {
        "id": "Places - Medium city",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "minzoom": 5,
        "maxzoom": 16,
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 5],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"],
            ["has", "icon"],
            [
              "any",
              [
                "all",
                ["==", ["get", "admin_class"], 1],
                ["==", ["get", "display_class"], 8]
              ],
              [
                "all",
                [
                  "any",
                  ["==", ["get", "admin_class"], 2],
                  ["==", ["get", "admin_class"], 3]
                ],
                [
                  "any",
                  ["==", ["get", "display_class"], 6],
                  ["==", ["get", "display_class"], 7]
                ]
              ]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 6],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"],
            ["has", "icon"],
            [
              "any",
              [
                "all",
                [">=", ["get", "display_class"], 6],
                ["<", ["get", "display_class"], 8],
                ["!=", ["get", "admin_class"], 1]
              ],
              [
                "all",
                ["!=", ["get", "admin_class"], 5],
                ["==", ["get", "display_class"], 8]
              ]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 8],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"],
            ["!=", ["get", "name"], " "],
            [
              "any",
              [
                "all",
                [">=", ["get", "display_class"], 6],
                ["<", ["get", "display_class"], 8],
                ["!=", ["get", "admin_class"], 1]
              ],
              [
                "all",
                ["!=", ["get", "admin_class"], 5],
                ["==", ["get", "display_class"], 8]
              ]
            ]
          ]
        ],
        "layout": {
          "icon-image": "{icon}",
          "icon-size": ["step", ["zoom"], 1, 8, 0],
          "symbol-placement": "point",
          "symbol-sort-key": [
            "+",
            ["length", ["get", "name"]],
            ["*", ["get", "priority"], 100]
          ],
          "text-anchor": "bottom",
          "text-field": "{name}",
          "text-font": ["Noto-Regular"],
          "text-justify": "auto",
          "text-letter-spacing": 0.05,
          "text-padding": ["step", ["zoom"], 2, 8, 5],
          "text-radial-offset": ["step", ["zoom"], 0.7, 8, 0],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            ["match", ["get", "display_class"], 6, 12, 7, 12, 11],
            8,
            ["match", ["get", "display_class"], 6, 15, 7, 15, 14.5],
            11,
            ["match", ["get", "display_class"], 6, 17, 17],
            16,
            ["match", ["get", "display_class"], 6, 23, 23]
          ]
        },
        "paint": {
          "text-color": "hsl(0, 0%, 30%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.8)",
          "text-halo-width": 1.4
        }
      },
      {
        "id": "Places - Large city",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "minzoom": 3,
        "maxzoom": 15,
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 3],
            ["has", "icon"],
            ["==", ["get", "category"], "settlement"],
            ["!=", ["get", "capital"], "country"],
            ["==", ["get", "subcategory"], "city"],
            ["==", ["get", "admin_class"], 1]
          ],
          [
            "all",
            [">=", ["zoom"], 4],
            ["has", "icon"],
            ["==", ["get", "category"], "settlement"],
            ["!=", ["get", "capital"], "country"],
            ["==", ["get", "subcategory"], "city"],
            [
              "any",
              [
                "all",
                ["==", ["get", "admin_class"], 1],
                [
                  "all",
                  [">=", ["get", "display_class"], 2],
                  ["<", ["get", "display_class"], 8]
                ]
              ],
              [
                "all",
                [
                  "any",
                  ["==", ["get", "admin_class"], 2],
                  ["==", ["get", "name"], "New York"]
                ],
                [
                  "any",
                  ["==", ["get", "display_class"], 2],
                  ["==", ["get", "display_class"], 3]
                ]
              ]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 5],
            ["has", "icon"],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"],
            [
              "any",
              [
                "all",
                ["==", ["get", "admin_class"], 2],
                [
                  "any",
                  ["==", ["get", "display_class"], 4],
                  ["==", ["get", "display_class"], 5]
                ]
              ],
              [
                "all",
                ["==", ["get", "admin_class"], 3],
                [
                  "any",
                  ["==", ["get", "display_class"], 2],
                  ["==", ["get", "display_class"], 3]
                ]
              ]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 6],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"],
            ["!=", ["get", "capital"], "country"],
            ["has", "icon"],
            ["<=", ["get", "display_class"], 5]
          ],
          [
            "all",
            [">=", ["zoom"], 8],
            ["!=", ["get", "name"], " "],
            ["==", ["get", "category"], "settlement"],
            ["!=", ["get", "capital"], "country"],
            ["==", ["get", "subcategory"], "city"],
            [
              "any",
              [
                "all",
                ["==", ["get", "admin_class"], 1],
                ["!=", ["get", "display_class"], 8]
              ],
              [
                "all",
                [">=", ["get", "display_class"], 2],
                ["<", ["get", "display_class"], 6]
              ]
            ]
          ]
        ],
        "layout": {
          "icon-image": "{icon}",
          "icon-size": ["step", ["zoom"], 0.8, 5, 0.9, 6, 1, 8, 0],
          "symbol-placement": "point",
          "symbol-sort-key": [
            "+",
            ["length", ["get", "name"]],
            ["*", ["get", "priority"], 100]
          ],
          "text-anchor": "bottom",
          "text-field": "{name}",
          "text-font": [
            "step",
            ["zoom"],
            ["literal", ["Noto-Regular"]],
            5,
            ["literal", ["Noto-Medium"]]
          ],
          "text-justify": "auto",
          "text-letter-spacing": 0.05,
          "text-padding": ["step", ["zoom"], 10, 4, 2, 8, 5],
          "text-radial-offset": ["step", ["zoom"], 0.7, 8, 0],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            ["match", ["get", "display_class"], 2, 12, 3, 12, 4, 12, 11],
            8,
            ["match", ["get", "display_class"], 2, 18, 3, 18, 4, 18, 17],
            15,
            ["match", ["get", "display_class"], 2, 25, 25]
          ]
        },
        "paint": {
          "text-color": [
            "match",
            ["get", "display_class"],
            2,
            "hsl(0, 0%, 18%)",
            3,
            "hsl(0, 0%, 18%)",
            4,
            "hsl(0, 0%, 18%)",
            "hsl(0, 0%, 26%)"
          ],
          "text-halo-color": "hsla(0, 0%, 100%, 0.8)",
          "text-halo-width": 1.4
        }
      },
      {
        "id": "Places - State name",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 3],
            ["<", ["zoom"], 4],
            [
              "all",
              ["!=", ["get", "abbr"], " "],
              ["==", ["get", "category"], "state"]
            ]
          ],
          [
            "all",
            [">=", ["zoom"], 4],
            [
              "all",
              ["!=", ["get", "name"], " "],
              ["==", ["get", "category"], "state"]
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "point",
          "text-field": ["step", ["zoom"], ["get", "abbr"], 4, ["get", "name"]],
          "text-font": ["Noto-Regular"],
          "text-letter-spacing": 0.3,
          "text-padding": 2,
          "text-size": {"stops": [[0, 10], [4, 11], [5, 12], [7, 14], [8, 16]]},
          "text-transform": "uppercase"
        },
        "paint": {
          "text-color": "hsl(0, 0%, 53%)",
          "text-halo-blur": 1,
          "text-halo-color": "hsla(0, 0%, 100%, 1)",
          "text-halo-width": 1
        }
      },
      {
        "id": "Places - Capital",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "minzoom": 3,
        "maxzoom": 15,
        "filter": [
          "any",
          [
            "all",
            [">=", ["zoom"], 3],
            ["!=", ["get", "name"], " "],
            ["has", "icon"],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"],
            ["==", ["get", "capital"], "country"]
          ],
          [
            "all",
            [">=", ["zoom"], 8],
            ["!=", ["get", "name"], " "],
            ["==", ["get", "category"], "settlement"],
            ["==", ["get", "subcategory"], "city"],
            ["==", ["get", "capital"], "country"]
          ]
        ],
        "layout": {
          "icon-image": "{icon}",
          "icon-offset": [0, 2.5],
          "icon-padding": 0.5,
          "icon-size": ["step", ["zoom"], 0.7, 5, 0.9, 6, 1, 8, 0],
          "symbol-placement": "point",
          "symbol-sort-key": [
            "+",
            ["length", ["get", "name"]],
            ["*", ["get", "priority"], 100]
          ],
          "symbol-spacing": 250,
          "text-anchor": "center",
          "text-field": "{name}",
          "text-font": ["Noto-Bold"],
          "text-justify": "auto",
          "text-letter-spacing": 0.05,
          "text-radial-offset": ["step", ["zoom"], 0.62, 8, 0],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            12,
            8,
            18,
            15,
            25
          ],
          "text-variable-anchor": ["top", "bottom", "left", "right"]
        },
        "paint": {
          "text-color": "hsl(0, 0%, 15%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.8)",
          "text-halo-width": 2
        }
      },
      {
        "id": "Places - Country name",
        "type": "symbol",
        "metadata": {"group": "places_label"},
        "source": "vectorTiles",
        "source-layer": "places",
        "filter": ["all", ["!=", "name", " "], ["==", "category", "country"]],
        "layout": {
          "symbol-placement": "point",
          "text-field": "{name}",
          "text-font": ["Noto-Medium"],
          "text-letter-spacing": 0.05,
          "text-max-width": 8,
          "text-padding": 2,
          "text-size": {
            "stops": [[0, 10], [4, 14], [5, 16], [6, 18], [7, 20], [8, 24]]
          },
          "text-transform": "uppercase"
        },
        "paint": {
          "text-color": "hsl(209, 22%, 30%)",
          "text-halo-color": "hsla(0, 0%, 100%, 1)",
          "text-halo-width": {"stops": [[1, 0.5], [5, 1]]}
        }
      }
    ],
    "id": "m0smkngrm"
  }