import os
import json
from io import BytesIO

import requests

# Mapbox token is REQUIRED, using default public token from Mapbox as fallback (beware, it could be rotated by them in future)
ACCESS_TOKEN = os.getenv(
    'MAPBOX_ACCESS_TOKEN', 'pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ')

MBGL_SERVER_URL = os.getenv('MAP_SERVER', 'http://localhost:8000/render')

OVERVIEW_MAP_CENTER = [-78.593, 33.358]  # center of South Atlantic region
OVERVIEW_MAP_ZOOM = 4

OVERVIEW_STYLE = {
    "version": 8,
    "sources": {
        "basemap": {
            "type": "raster",
            "tiles": [
                "https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=%s" % ACCESS_TOKEN
            ],
            "tileSize": 256
        },
        "blueprint": {
            "type": "raster",
            "url": "mbtiles://blueprint2_2",
            "tileSize": 256
        },
        "boundaries": {
            "type": "vector",
            "url": "mbtiles://salcc_id",
            "tileSize": 256
        }
    },
    "layers": [
        {
            "id": "basemap",
            "type": "raster",
            "source": "basemap"
        },
        {
            "id": "blueprint",
            "type": "raster",
            "source": "blueprint",
            "paint": {
                "raster-opacity": 0.3
            }
        },
        # {
        #     "id": "boundaries",
        #     "source": "boundaries",
        #     "source-layer": "inland_marine_id",
        #     "type": "line",
        #     "paint": {
        #         "line-color": "#0892D0",
        #         "line-width": 1
        #     }
        # }
    ]
}

STYLE = {
    "version": 8,
    "sources": {
        "basemap": {
            "type": "raster",
            "tiles": [
                "https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=%s" % ACCESS_TOKEN
            ],
            "tileSize": 256
        },
        "blueprint": {
            "type": "raster",
            "url": "mbtiles://blueprint2_2",
            "tileSize": 256
        },
        "boundaries": {
            "type": "vector",
            "url": "mbtiles://salcc_id",
            "tileSize": 256
        }
    },
    "layers": [
        {
            "id": "basemap",
            "type": "raster",
            "source": "basemap"
        },
        {
            "id": "blueprint",
            "type": "raster",
            "source": "blueprint",
            "paint": {
                "raster-opacity": 0.3
            }
        },
        {
            "id": "boundaries",
            "source": "boundaries",
            "source-layer": "inland_marine_id",
            "type": "line",
            "paint": {
                "line-color": "#0892D0",
                "line-width": 1
            }
        }
    ]
}


def get_center_from_bounds(bounds):
    return [
        ((bounds[2] - bounds[0]) / 2.0) + bounds[0],
        ((bounds[3] - bounds[1]) / 2.0) + bounds[1]
    ]


def get_map_image_bytes(unit_id, bounds, width, height):
    """
    Create a rendered map image for the unit as PNG bytes.

    Parameters
    ----------
    unit_id : str
        unit ID to highlight on the map
    bounds : list-like of (west, south, east, north) in geographic coordinates
        geographic bounds of the map
    width: int
        width of the image in pixels
    height: int
        height of the image in pixels

    Returns
    -------
    Image PNG bytes in a BytesIO buffer
    """

    # Set styling for selected unit to highlight it on the map
    style = STYLE.copy()
    style['layers'].extend([
        {
            "id": "selected_boundary-fill",
            "source": "boundaries",
            "source-layer": "inland_marine_id",
            "type": "fill",
            "paint": {
                "fill-color": "#0892D0",
                "fill-opacity": 0.3
            },
            "filter": ["==", ["get", "ID"], unit_id]
        },
        {
            "id": "selected_boundary-outline",
            "source": "boundaries",
            "source-layer": "inland_marine_id",
            "type": "line",
            "paint": {
                "line-color": "#0892D0",
                "line-width": 3
            },
            "filter": ["==", ["get", "ID"], unit_id]
        }
    ])

    params = {
        'style': style,
        'bounds': bounds,
        'width': width,
        'height': height
    }

    r = requests.post(MBGL_SERVER_URL, json=params)
    r.raise_for_status()

    return BytesIO(r.content)


def get_overview_image_bytes(unit_id, bounds, width, height):
    """
    Create a rendered overview map image for the unit as PNG bytes.

    Parameters
    ----------
    unit_id : str
        unit ID to highlight on the map
    bounds : list-like of (west, south, east, north) in geographic coordinates
        geographic bounds of the map
    width: int
        width of the image in pixels
    height: int
        height of the image in pixels

    Returns
    -------
    Image PNG bytes in a BytesIO buffer
    """

    # Set styling for selected unit to highlight it on the map
    style = OVERVIEW_STYLE.copy()
    style['layers'].extend([
        {
            "id": "selected_boundary-fill",
            "source": "boundaries",
            "source-layer": "inland_marine_id",
            "type": "fill",
            "paint": {
                "fill-color": "#0892D0",
                # "fill-opacity": 0.3
            },
            "filter": ["==", ["get", "ID"], unit_id]
        },
        {
            "id": "selected_boundary-outline",
            "source": "boundaries",
            "source-layer": "inland_marine_id",
            "type": "line",
            "paint": {
                "line-color": "#0892D0",
                "line-width": 3
            },
            "filter": ["==", ["get", "ID"], unit_id]
        }
    ])

    params = {
        'style': style,
        'center': get_center_from_bounds(bounds),  # OVERVIEW_MAP_CENTER,  # ,
        'zoom': 3,
        'width': width,
        'height': height
    }

    r = requests.post(MBGL_SERVER_URL, json=params)
    if r.status_code != 200:
        print('-------------------------')
        # print('params', params)
        # print('\n\n')
        print(r.content)
        print('-----------------------------')
    r.raise_for_status()

    return BytesIO(r.content)
