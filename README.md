#SALCC Blueprint 2.2


## Data processing

Data are provided as a file geodatabase (GDB) by SALCC staff (Amy Kiester):
* Indicators: Blueprint_V_2_2_SimpleViewerInterfaceData_20180720.7z (7/20/2018)
* Threats (IGNORE SLR, replaced by below): SimpleViewerInterfaceDataThreats.7z  (4/3/2018)
* Updated SLR: NOAA_SLR_Inundation.7z (8/22/2018)


We also obtain the US Census TIGER States shapefile to extract state and county FIPS codes for each watershed.

1. extract the geodatabase and shapefile to CSVs using `export_tables.py`.  (CSVs are version controlled, clear out the directory and regenerate for a new version of the Blueprint)
2. convert the CSVs to a JSON file for each watershed / marine block using `extract_data`.
3. the output JSON files are stored in `public/data` which is not versioned due to the volume of files.


## Development

You will likely need several environment variables set.  Create a file `.env` in the root of this project, based on the `.env.example` file.
Note: Flask does not use these variables, they need to be provided manually on the command line.

To start the frontend application (on port 3000, by default:
`yarn start`
Then open `http://localhost:3000` in your browser.

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


To start the map generation server (on port 8000, by default, using tiles hosted in /tiles):
```
mbgl-server -t ./tiles
```

To confirm that it is running, open `http://localhost:8000/render` in your browser.  It should give you a 400 error message about required parameters.

If you get a command not found error, you might need to execute the local binary file:
`./node_modules/.bin/mbgl-server -t ./tiles`


## Deployment

The production system is an EC2 instance in the SALCC AWS account.  That system runs both a static fileserver to serve
the React front-end application over HTTPS, and `mbtileserver` to provide the map tiles.

The server currently runs Caddy as the reverse proxy and static fileserver.

Server configuration steps are available in the [wiki](https://github.com/consbio/salcc_blueprint2/wiki).


1. check in and push latest version of the code
2. pull the latest code down to that server using `git pull origin master`.
3. make sure dependencies are up to date using `yarn`.
4. Change to `app` user: `> sudo su app`.
5. Deploy using yarn: `yarn deploy`
6. `pipenv install` to install any new Python dependencies
7. make sure to restart services if code has changed (e.g., Flask)



### Deploying mbtiles

1. Open a layer file of the rendered Blueprint provided by SALCC in ArcMap.
2. Export to a tilepackage, PNG8, zoom levels 0 - 15 (ArcGIS level 16)
3. Convert the tilepackage to mbtiles using [`tpkutils`](https://github.com/consbio/tpkutils) command line interface
4. upload the mbtiles file to the server (see instructions in the wiki) 


  