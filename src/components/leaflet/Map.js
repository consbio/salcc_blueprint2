import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {scaleLinear} from 'd3-scale';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import 'leaflet-basemaps';
import 'leaflet/dist/leaflet.css';
import 'leaflet-basemaps/L.Control.Basemaps.css';
import './Map.css';


// Map configurationParameters
let config = {
    mapParams: {
        center: [33.358, -78.593],
        zoom: 10, //5
        minZoom: 3,
        maxZoom: 15,
        zoomControl: false,
        scrollwheel: false,
        attributionControl: false,
        zIndex: 1
    },
    basemaps: [
        L.tileLayer('//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
            subdomains: ['server', 'services'],
            label: 'ESRI Topo'
        }),
        L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            label: 'ESRI Imagery'
        })
    ],
    blueprintLayer: L.tileLayer('http://52.43.202.160/services/blueprint_2_1/tiles/{z}/{x}/{y}.png', {
        maxNativeZoom: 13,
        bounds: [[29.257276664000074, -85.89853697199993], [37.45876403900007, -71.28723321899992]],
        zIndex: 2
    }),
    unitLayer: L.vectorGrid.protobuf('http://10.5.1.165:8000/services/salcc_id/tiles/{z}/{x}/{y}.pbf', {
        minZoom: 9,
        maxZoom: 15,
        zIndex: 3,
        rendererFactory: L.svg.tile,
        interactive: true,
        vectorTileLayerStyles: {
            inland_marine_id: {
                fill: true,
                fillOpacity: 0,
                weight: 1,
                color: 'orange'
            }
        },
        getFeatureId: (f) => {return f.properties.ID}
    }),
    highlightStyle: {
        color: 'orange',
        fillColor: 'orange',
        fillOpacity: 0.4,
        fill: true,
        weight: 2
    }

};

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedID: null
        }

        this._mapNode = null;
        this.map = null;
    }

    componentDidMount() {
        let map = this.map = L.map(this._mapNode, config.mapParams);


        let basemapsControl = L.control.basemaps({
            basemaps: config.basemaps,
            tileX: 4,
            tileY: 6,
            tileZ: 4,
            position: 'bottomleft'
        });
        map.addControl(basemapsControl);

        map.addLayer(config.blueprintLayer);

        let opacityScale = scaleLinear().domain([3,13]).range([1, 0.35]);
        config.blueprintLayer.setOpacity(opacityScale(map.getZoom()));  // do this on initial load too
        map.on('zoomend', function(){
            config.blueprintLayer.setOpacity(opacityScale(map.getZoom()));
        });



        config.unitLayer.on('click', (f) => {
            this._handleSelect(f.layer.properties.ID);
        });

        map.addLayer(config.unitLayer);


        // L.control.locate({position: "bottomright"}).addTo(map);

    }


    _handleSelect(id) {
        console.log(this.state.selectedID, id)
        if (this.state.selectedID !== null) {
            if (id === this.state.selectedID) {
                // clear highlight
                this.setState({selectedID: null});
                config.unitLayer.resetFeatureStyle(id);
                this.props.deselectUnit();
                return;
            }

            config.unitLayer.resetFeatureStyle(this.state.selectedID);
        }

        this.setState({selectedID: id});
        config.unitLayer.setFeatureStyle(id, config.highlightStyle)
        this.props.selectUnit(id); // move this to callback above
    }


    render() {
        return (
            <div id="MapContainer">
                <div ref={(node) => this._mapNode = node} id="Map" />
            </div>
        );
    }
}

Map.propTypes = {
    selectUnit: PropTypes.func,
    deselectUnit: PropTypes.func
}



Map.defaultProps = {
    selectUnit: (id) => {console.log('Selected map unit: ', id)},
    deselectUnit: () => {console.log('Deselected map unit')}
}


export default Map;