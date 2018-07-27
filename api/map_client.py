import os
import json
from io import BytesIO

from PIL import Image, ImageDraw, ImageFont
import requests

# Mapbox token is REQUIRED, using default public token from Mapbox as fallback (beware, it could be rotated by them in future)
ACCESS_TOKEN = os.getenv(
    'MAPBOX_ACCESS_TOKEN', 'pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ')

MBGL_SERVER_URL = os.getenv('MAP_SERVER', 'http://localhost:8000/render')

MAP_WIDTH = 1024
MAP_HEIGHT = 800
OVERVIEW_WIDTH = 200
OVERVIEW_HEIGHT = 200
LEGEND_WIDTH = 200

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

    In test, width = 804 and height = 800
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

    return Image.open(BytesIO(r.content))


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
        'center': get_center_from_bounds(bounds),
        'zoom': 3,  # determined to be the best zoom given size of overview
        'width': width,
        'height': height
    }

    r = requests.post(MBGL_SERVER_URL, json=params)
    r.raise_for_status()

    return Image.open(BytesIO(r.content))


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

    try:
        header_font = ImageFont.truetype("Calibri.ttf", 24)
    except:
        header_font = ImageFont.load_default()

    try:
        label_font = ImageFont.truetype("Calibri.ttf", 18)
    except:
        label_font = ImageFont.load_default()

    header = "Legend"
    patch_width = 20
    patch_height = 20
    padding = 8  # padding between label and patch
    label_x = patch_width + padding

    # Heights calibrated manually
    header_height = 36
    label_height = 16

    # figure out the dimensions required for the text
    text_width = max([label_font.getsize(label)[0]
                      for _, label in legend])

    if text_width > (width - patch_width - padding):
        print('WARNING: legend text is wider than image width, it will be cropped!')

    # include triple line spacing
    height = header_height + label_height * 3 * len(legend)
    img = Image.new('RGBA', (width, height), color=(
        255, 255, 255, 255))
    canvas = ImageDraw.Draw(img)

    canvas.text((0, 0), header, font=header_font,
                fill=(0, 0, 0, 255))  # black text

    label_y_offset = header_height

    for index, (color, label) in enumerate(legend):
        label_y = int(round(index * label_height * 2)) + label_y_offset
        canvas.rectangle(
            (0, label_y, patch_width, label_y+patch_height), fill=color)

        # move labels up 2 px to center against patches
        canvas.text((label_x, label_y - 2), label, font=label_font,
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
