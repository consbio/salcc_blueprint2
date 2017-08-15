import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {scaleLinear} from 'd3-scale';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import 'leaflet-basemaps';
import 'leaflet/dist/leaflet.css';
import 'leaflet-basemaps/L.Control.Basemaps.css';
import './Map.css';

// Make leaflet icons work properly from webpack / react context
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


// Map configurationParameters
let config = {
    mapParams: {
        center: [33.358, -78.593],
        zoom: 5,
        minZoom: 3,
        maxZoom: 15,
        zoomControl: false,
        scrollwheel: false,
        attributionControl: false,
        zIndex: 1
    },
    basemaps: [
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ', {
        }),
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ', {
            opacity: 0.6
        }),

        // L.tileLayer('//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        //     attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        //     maxZoom: 16,
        //     subdomains: ['server', 'services'],
        //     label: 'ESRI Gray'
        // }),
        // L.tileLayer('//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        //     attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        //     subdomains: ['server', 'services'],
        //     label: 'ESRI Topo',
        //     opacity: 0.6
        // }),
        // L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        //     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        //     label: 'ESRI Imagery',
        //     opacity: 0.6
        // })
    ],
    blueprintLayer: L.tileLayer('http://52.43.202.160/services/salcc/blueprint_2_1/tiles/{z}/{x}/{y}.png', {
        maxNativeZoom: 13,
        bounds: [[29.257276664000074, -85.89853697199993], [37.45876403900007, -71.28723321899992]],
        zIndex: 2
    }),
    unitLayer: L.vectorGrid.protobuf('http://52.43.202.160/services/salcc/salcc_id/tiles/{z}/{x}/{y}.pbf', {
        minZoom: 10,
        maxZoom: 15,
        zIndex: 3,
        bounds: [[29.257276664000074, -85.89853697199993], [37.45876403900007, -71.28723321899992]],
        rendererFactory: L.svg.tile,
        interactive: true,
        vectorTileLayerStyles: {
            inland_marine_id: {
                fill: true,
                fillOpacity: 0,
                weight: 1,
                color: '#009C8B'
            }
        },
        getFeatureId: (f) => {return f.properties.ID}
    }),
    highlightStyle: {
        color: '#009C8B',
        fillColor: '#009C8B',
        fillOpacity: 0.3,
        fill: true,
        weight: 3
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
        this.locateControl = null;
        this._marker = null;
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

        let opacityScale = scaleLinear().domain([3,13]).range([0.5, 0.3]);
        config.blueprintLayer.setOpacity(opacityScale(map.getZoom()));  // do this on initial load too
        map.on('zoomend', function(){
            config.blueprintLayer.setOpacity(opacityScale(map.getZoom()));
        });

        config.unitLayer.on('click', (f) => {
            this._handleSelect(f.layer.properties.ID);
        });

        map.addLayer(config.unitLayer);


        let locateControlClass = L.Control.extend({
            options: {
                position: 'bottomright',
                maxZoom: 14
            },

            onLocationFound: (lat, lng) => {},

            onAdd: function(map) {
                this._map = map;
                let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-locate-control');
                L.DomEvent.disableClickPropagation(container);

                let link = L.DomUtil.create('a', '', container);
                link.href = '#';

                L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation)
                    .on(link, 'click', L.DomEvent.preventDefault)
                    .on(link, 'click', () => {this._map.locate({setView: true, maxZoom: this.options.maxZoom})})
                    .on(link, 'dblclick', L.DomEvent.stopPropagation);

                map.on('locationfound', (e) => {
                    this.onLocationFound(e.latlng.lat, e.latlng.lng);
                });

                map.on('locationerror', () => {
                    alert('Unable to determine location.  Make sure your settings allow location services.');
                });

                return container;
            }
        });

        this.locateControl = new locateControlClass();
        // overriding functions here to bind to outer scope
        this.locateControl.onLocationFound = (lat, lng) => {this._addMarker(lat, lng, null)};
        this.locateControl.addTo(map);
    }

    componentWillReceiveProps(nextProps) {
        const {place} = nextProps;

        // place is expected to be:
        // {
        //     label: 'Place name',
        //     location: {lat: 44.1, lng: -123.2}
        // }

        // for now, intentionally ignoring label
        if (place && place.location) {
            this._addMarker(place.location.lat, place.location.lng, null);
            this.map.setView([place.location.lat, place.location.lng], 12);
        }
        else {
            this._removeMarker();
        }
    }

    _addMarker(lat, lng, label) {
        this._removeMarker();

        this._marker = L.marker([lat, lng]).addTo(this.map);
        if (label !== null) {
            this._marker.bindPopup(label);
            this._marker.openPopup();
        }
    }

    _removeMarker() {
        if (this._marker !== null) {
            this.map.removeLayer(this._marker);
            this._marker = null;
        }
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
                <div ref={(node) => this._mapNode = node} id="Map" >
                    <div className="legend">
                        <div className="flex-container2">
                            <div className="flex-item2">
                                <svg width ="17" height="17">
                                    <rect width = "100%" height= "100%" fill = '#686868' stroke="gray" strokeWidth="2"/>
                                </svg>
                            </div>
                        </div>
                        <div className="text">Corridors</div>
                        <div className="flex-container2">
                            <div className="flex-item2">
                                <svg width ="17" height="17">
                                    <rect width = "100%" height= "100%" fill = '#fbb4b9' stroke="gray" strokeWidth="2"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-container2">
                            <div className="flex-item2">
                                <svg width ="17" height="17">
                                    <rect width = "100%" height= "100%" fill = '#c51b8a' stroke="gray" strokeWidth="2"/>
                                </svg>
                            </div>

                        </div>
                        <div className="flex-container2">
                            <div className="flex-item2">
                                <svg width ="17" height="17">
                                    <rect width = "100%" height= "100%" fill = '#49006a' stroke="gray" strokeWidth="2"/>
                                </svg>
                            </div>
                        </div>
                        <div className="text">Highest</div>
                    </div>
                </div>

            </div>
        );
    }
}

Map.propTypes = {
    selectUnit: PropTypes.func,
    deselectUnit: PropTypes.func
}



Map.defaultProps = {
    place: null,
    selectUnit: (id) => {console.log('Selected map unit: ', id)},
    deselectUnit: () => {console.log('Deselected map unit')}
}


export default Map;