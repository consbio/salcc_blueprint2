#SALCC Blueprint 2.2


## Data processing

Data are provided as a file geodatabase (GDB) by SALCC staff (Amy Kiester).

We also obtain the US Census TIGER States shapefile to extract state and county FIPS codes for each watershed.

1. extract the geodatabase and shapefile to CSVs using `export_tables.py`.  (CSVs are version controlled, clear out the directory and regenerate for a new version of the Blueprint)
2. convert the CSVs to a JSON file for each watershed / marine block using `extract_data`.
3. the output JSON files are stored in `public/data` which is not versioned due to the volume of files.


## Development

To startup the frontend application:
`yarn start`


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



### Deploying mbtiles

1. Open a layer file of the rendered Blueprint provided by SALCC in ArcMap.
2. Export to a tilepackage, PNG8, zoom levels 0 - 15 (ArcGIS level 16)
3. Convert the tilepackage to mbtiles using [`tpkutils`](https://github.com/consbio/tpkutils) command line interface
4. upload the mbtiles file to the server (see instructions in the wiki) 


  