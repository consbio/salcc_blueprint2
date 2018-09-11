# South Atlantic Conservation Blueprint 2.2 Simple Viewer

## About the Blueprint

The South Atlantic Conservation Blueprint is a living spatial plan to conserve natural and cultural resources for future generations. It identifies shared conservation priorities across the South Atlantic region.

Blueprint 2.2, released in November 2017, is a totally data-driven plan based on terrestrial, freshwater, marine, and cross-ecosystem indicators. It uses the current condition of those indicators to prioritize the most important areas for natural and cultural resources across the South Atlantic geography. Through a connectivity analysis, the Blueprint also identifies corridors that link coastal and inland areas and span climate gradients. The Blueprint reflects extensive feedback from the broader cooperative community, with more than 500 people from over 150 different organizations actively participating in its development so far.

[more info](http://www.southatlanticlcc.org/blueprint/)

## About the Simple Viewer

The Simple Viewer summarizes the Blueprint priorities and supporting information within subwatersheds and marine lease blocks. In a new pixel mode, you can also explore pixel-level details of what indicators are driving the Blueprint priorities.

The Simple Viewer is a companion to the more advanced [Conservation Planning Atlas](https://salcc.databasin.org/), which provides access to hundreds of
geospatial datasets with rich interactive mapping and collaboration capabilities.

## Architecture

The Simple Viewer is composed of the following components:

-   User interface: implemented in Javascript, HTML, CSS using ReactJS, Webpack, and modern JS tools
-   Map tile generation: implemented using [`datatiles`](https://github.com/brendan-ward/datatiles)
-   Map tile hosting: implemented using [`mbtileserver`](https://github.com/consbio/mbtileserver)
-   Server-side reporting: implemented in Python using a `flask` API
-   Server-side static map image generation: implemented in NodeJS using [`mbgl-renderer`](https://github.com/consbio/mbgl-renderer)
-   Static file server and reverse proxy: implemented using [`caddy`](https://caddyserver.com/)
-   Data processing pipeline: run in advance of deployment using Python with Pandas and Geopandas libraries; scripts located under `/tools`

Currently, these components are deployed to a Amazon Web Services (AWS) T3.micro EC2 instance with 4 GB of additional `swap` space.

Server configuration steps are available in the [wiki](https://github.com/consbio/salcc_blueprint2/wiki).

Note: building the dependencies for `mbgl-renderer` requires substantially more resources than are available on a T3.micro instance. To build these,
we use a larger AWS instance to perform the build and create a new AMI, then start that up as a T3.micro instance.

DNS entries for `southatlanticlcc.org` are managed by South Atlantic staff.

## Source data

### Constants and descriptive information

Descriptive information describing the names, descriptions, colors, and other information for the Blueprint categories, ecoystems and indicators, etc are
stored in configuration files under `/config/*.json`. These files contain the information needed to display dynamic data for selected units and pixels
in the user interface, and generally do not change except between major versions of the Blueprint (e.g., adding an indicator).

All content of these files is provided using Google Docs and Google Spreadsheets from South Atlantic staff.

These files are combined directly into the user interface using Webpack.

### Geospatial and summary data

Data are provided as file geodatabases (GDB) and GeoTIFFs by South Atlantic staff:

-   Indicators: Blueprint_V_2_2_SimpleViewerInterfaceData_20180720.7z (7/20/2018)
-   Threats (IGNORE SLR, replaced by below): SimpleViewerInterfaceDataThreats.7z (4/3/2018)
-   Updated SLR: NOAA_SLR_Inundation.7z (8/22/2018)

We also use the US Census TIGER Counties (2015) shapefile to extract state and county FIPS codes for each watershed.

Processed data are stored in `public/data` (not versioned due to the volume of files). The data are processed from
summary tables in GDB format to individual JSON files for each subwatershed and marine lease block (summary units). This was done to streamline
the fetching of information from each summary unit when the user selects one within the user interface.

The JSON files are encoded using the smallest amount of information required to represent those data in the user interface. Values in these fiels
are joined to various constants in the user interface.

The data structure of these JSON files is documented in `/docs/example_inland_annotated.json`.

#### Processing

Data are extracted from GDB to CSV for version control and to streamline downstream processing. Clear out `/public/data*` when rerunning data processing.

1. extract the geodatabase and shapefile to CSVs using `tools/export_tables.py`.
2. convert the CSVs to a JSON file for each watershed / marine block using `tools/extract_data.py`.

### Map tiles

All tile layers are generating using [`datatiles`](https://github.com/brendan-ward/datatiles).

The visible Blueprint tiles are generated by rendering the Blueprint TIF to tiles using the standard colors for the Blueprint categories.

Data tiles are created for the indicators and Blueprint. They are currently binned into 4 tilesets based on their value range using the
`exponential` data tiles encoder.

TODO: Documentation on the configuration is under development.

Tiles are stored locally in `/tiles` (not versioned due to size).

## Development

To develop this application, you need Python 3.6+ and NodeJS 8.9+

`pipenv` and `yarn` are used as the package managers for those languages.

Initial setup:

-   run `yarn install` to install all depedencies. Building mapbox-gl-native from source may take a long time.
-   run `pipenv install` to setup a Python virtual environment and install all dependencies.

Running the above is also required as Python or NodeJS dependencies change.

### Environment variables

You will likely need several environment variables set. Create a file `.env` in the root of this project, based on the `.env.example` file.
Note: Flask does not use these variables, they need to be provided manually on the command line.

### Development servers

#### User interface (Webpack development server)

To start the frontend application (on port 3000, by default:
`yarn start`
Then open `http://localhost:3000` in your browser.

#### Report map image generation API:

To start the map generation server (on port 8000, by default, using tiles hosted in `/tiles`):

```
./node_modules/.bin/mbgl-server -t ./tiles
```

To confirm that it is running, open `http://localhost:8000/render` in your browser. It should give you a 400 error message about required parameters.

#### Report generation API:

To start the report server (on port 5000, by default):

```
export FLASK_APP=api
pipenv run flask run
```

Alternatively, you can run flask from within your virtual environment:

```
pipenv shell
flask run
```

To confirm it is running, go to `http://localhost:5000/report/I1` in your browser, which should trigger a download of a word doc.

Note: the map image generation API must be running properly in order to generate map images in the reports. If it is not running,
an error will be logged to the console and a placeholder map image will be added to the report.

## Deployment

Server configuration and deployment steps are available in the [wiki](https://github.com/consbio/salcc_blueprint2/wiki).

## License

Software: See [LICENSE].
Data (including contents of `/config` and `/source_data`): Public domain (data are managed by U.S. Fish and Wildlife Service)

## Credits

This project was developed in close collaboration with staff from the [South Atlantic Landscape Conservation Cooperative](http://www.southatlanticlcc.org/)
under U.S. Fish and Wildlife Service grant FW14AC00792.
