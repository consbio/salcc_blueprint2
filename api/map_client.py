import os
import json
from copy import deepcopy
from io import BytesIO

from PIL import Image, ImageDraw, ImageFont
import requests
import logging

logger = logging.getLogger(__name__)

# Mapbox token is REQUIRED, using default public token from Mapbox as fallback (beware, it could be rotated by them in future)
ACCESS_TOKEN = os.getenv(
    'MAPBOX_ACCESS_TOKEN', 'pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ')

MBGL_SERVER_URL = os.getenv('MBGL_SERVER_URL', 'http://localhost:8000/render')

MAP_WIDTH = 800
MAP_HEIGHT = 600
OVERVIEW_WIDTH = 200
OVERVIEW_HEIGHT = 200
LEGEND_WIDTH = 200
MAP_ATTRIBUTION = '© Mapbox, © OpenStreetMap'

# Load fonts for legend and map text
calibri_font = os.path.join(os.path.dirname(__file__), "Calibri.ttf")
try:
    HEADER_FONT = ImageFont.truetype(calibri_font, 20)
    LABEL_FONT = ImageFont.truetype(calibri_font, 14)
except:
    HEADER_FONT = ImageFont.load_default()
    LABEL_FONT = ImageFont.load_default()

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
        }
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
        }
    ]
}


def get_center_from_bounds(bounds):
    """
    Calculate center point from bounds in longitude, latitude format.

    Parameters
    ----------
    bounds : list-like of (west, south, east, north) in geographic coordinates
        geographic bounds of the map

    Returns
    -------
    list: [longitude, latitude]
    """

    return [
        ((bounds[2] - bounds[0]) / 2.0) + bounds[0],
        ((bounds[3] - bounds[1]) / 2.0) + bounds[1]
    ]


def get_unit_map_image(unit_id, bounds, width, height):
    """
    Create a rendered map image for the unit.

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
    Image object
    """

    # Set styling for selected unit to highlight it on the map
    style = deepcopy(STYLE)
    style['layers'].extend([
        {
            "id": "boundaries",
            "source": "boundaries",
            "source-layer": "inland_marine_id",
            "type": "line",
            "paint": {
                "line-color": "#0892D0",
                "line-width": 1
            }
        },
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
                "line-width": 4
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

    try:
        r = requests.post(MBGL_SERVER_URL, json=params)
        r.raise_for_status()

        img = Image.open(BytesIO(r.content))

        if MAP_ATTRIBUTION:
            canvas = ImageDraw.Draw(img)
            canvas.text((10, height - 24), MAP_ATTRIBUTION,
                        font=LABEL_FONT, fill=(0, 0, 0, 255))

    except Exception as err:
        logger.error("Error retrieving map image: {0}".format(err))
        img = Image.new('RGBA', (width, height), color='#EEE')
        ImageDraw.Draw(img).text(
            (width/2 - 40, height/2), 'Error creating map', font=LABEL_FONT, fill=(80, 80, 80, 255))

    return img


def get_overview_image(unit_id, bounds, width, height):
    """
    Create a rendered overview map image.

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
    Image object
    """

    center = get_center_from_bounds(bounds)

    # Set styling for selected unit to highlight it on the map
    style = deepcopy(STYLE)

    # Add a circle highlight for selected feature
    style['sources']["selected_boundary-circle"] = {
        "id": "selected_boundary-circle",
        "type": "geojson",
        "data": {
            "type": "Point",
            "coordinates": center
        }
    }

    style['layers'].extend([
        {
            "id": "selected_boundary-fill",
            "source": "boundaries",
            "source-layer": "inland_marine_id",
            "type": "fill",
            "paint": {
                "fill-color": "#0892D0"
            },
            "filter": ["==", ["get", "ID"], unit_id]
        },
        {
            "id": "selected_boundary-circle",
            "source": "selected_boundary-circle",
            "type": "circle",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#FF0000",
                "circle-opacity": 0,
                "circle-stroke-color": "#FF0000",
                "circle-stroke-width": 2

            }
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
        'center': center,
        'zoom': 3,  # determined to be the best zoom given size of overview
        'width': width,
        'height': height
    }

    try:
        r = requests.post(MBGL_SERVER_URL, json=params)
        r.raise_for_status()
        img = Image.open(BytesIO(r.content))

    except Exception as err:
        img = Image.new('RGBA', (width, height), color='#EEE')

    return img


def get_legend_image(legend, width):
    """
    Render legend colors and labels to a legend image to include with map.
    Color patches are rendered at 20x20px.

    Parameters
    ----------
    legend : list-like of (color, label) tuples
        colors and labels for the map legend
    width: int
        width of the image in pixels

    Returns
    -------
    Image object    
    """

    header = "Legend"
    patch_width = 20
    patch_height = 20
    padding = 8  # padding between label and patch
    label_x = patch_width + padding

    # Heights calibrated manually
    header_height = 36
    label_height = 16

    # figure out the dimensions required for the text
    text_width = max([LABEL_FONT.getsize(label)[0]
                      for _, label in legend])

    if text_width > (width - patch_width - padding):
        print('WARNING: legend text is wider than image width, it will be cropped!')

    # include triple line spacing
    height = header_height + label_height * 3 * len(legend)
    img = Image.new('RGBA', (width, height), color=(
        255, 255, 255, 255))
    canvas = ImageDraw.Draw(img)

    canvas.text((0, 0), header, font=HEADER_FONT,
                fill=(0, 0, 0, 255))  # black text

    label_y_offset = header_height

    for index, (color, label) in enumerate(legend):
        label_y = int(round(index * label_height * 2)) + label_y_offset
        canvas.rectangle(
            (0, label_y, patch_width, label_y+patch_height), fill=color)

        # move labels down 4 px to center against patches
        canvas.text((label_x, label_y + 4), label, font=LABEL_FONT,
                    fill=(0, 0, 0, 255))  # black text

    return img


def get_map_image(unit_id, bounds, legend):
    """
    Get a map image for use in report, including unit map, overview map, and legend.

    Parameters
    ----------
    unit_id : str
        unit ID to highlight on the map
    bounds : list-like of (west, south, east, north) in geographic coordinates
        geographic bounds of the map
    legend : list-like of (color, label) tuples
        colors and labels for the map legend

    Returns
    -------
    Image object
    """

    gutter = 20
    unit_map_width = MAP_WIDTH - OVERVIEW_WIDTH - gutter

    unit_map = get_unit_map_image(unit_id, bounds, unit_map_width, MAP_HEIGHT)
    overview = get_overview_image(
        unit_id, bounds, OVERVIEW_WIDTH, OVERVIEW_HEIGHT)

    legend = get_legend_image(legend, LEGEND_WIDTH)

    img = Image.new('RGBA', size=(MAP_WIDTH, MAP_HEIGHT),
                    color=(255, 255, 255, 255))

    img.paste(unit_map)
    img.paste(overview, box=(MAP_WIDTH - OVERVIEW_WIDTH,
                             MAP_HEIGHT - OVERVIEW_HEIGHT))

    img.paste(legend, box=(MAP_WIDTH - LEGEND_WIDTH, 20))

    return img
