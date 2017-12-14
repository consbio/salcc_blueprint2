import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {scaleLinear} from 'd3-scale';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import 'leaflet-basemaps';
import 'leaflet/dist/leaflet.css';
import 'leaflet-basemaps/L.Control.Basemaps.css';
import './customleaflet.css';

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
        center: [33.358, -78.593], // [33.358, -80]
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
        })
    ],
    blueprintLayer: L.tileLayer('https://m.salcc.databasin.org/services/blueprint2_2/tiles/{z}/{x}/{y}.png', {
        maxNativeZoom: 15,
        bounds: [[29.257276664000074, -85.89853697199993], [37.45876403900007, -71.28723321899992]],
        zIndex: 2
    }),
    unitLayer: L.vectorGrid.protobuf('https://m.salcc.databasin.org/services/salcc_id/tiles/{z}/{x}/{y}.pbf', {
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
                color: '#0892D0'
            }
        },
        getFeatureId: (f) => {return f.properties.ID}
    }),
    highlightStyle: {
        color: '#0892D0',
        fillColor: '#0892D0',
        fillOpacity: 0.3,
        fill: true,
        weight: 3
    }
};

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: this.props.place,
            selectedUnit: this.props.selectedUnit,
            zoom: config.mapParams.zoom
        };

        this._mapNode = null;
        this.map = null;
        this.locateControl = null;
        this._marker = null;
    }

    componentDidMount() {
        let {place, selectedUnit} = this.state;
        let map = this.map = L.map(this._mapNode, config.mapParams);

        map.addLayer(config.blueprintLayer);

        let opacityScale = scaleLinear().domain([3, 13]).range([0.5, 0.3]);
        config.blueprintLayer.setOpacity(opacityScale(map.getZoom()));  // do this on initial load too

        map.on('zoomend', () => {
            const zoom = map.getZoom();
            config.blueprintLayer.setOpacity(opacityScale(zoom));
            this.setState({zoom: zoom});
        })

        config.unitLayer.on('click', (f) => {
            this._handleSelect(f.layer.properties.ID);
        });

        map.addLayer(config.unitLayer);


        let locateControlClass = L.Control.extend({
            options: {
                position: 'topright',
                maxZoom: 10
            },

            onLocationFound: (lat, lng) => {
            },

            onAdd: function (map) {
                this._map = map;
                let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-locate-control');
                L.DomEvent.disableClickPropagation(container);

                let link = L.DomUtil.create('a', '', container);
                link.href = '#';

                L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation)
                    .on(link, 'click', L.DomEvent.preventDefault)
                    .on(link, 'click', () => {
                        this._map.locate({setView: true, maxZoom: this.options.maxZoom})
                    })
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

        let basemapsControl = L.control.basemaps({
            basemaps: config.basemaps,
            tileX: 4,
            tileY: 6,
            tileZ: 4,
            position: 'topright'
        });
        map.addControl(basemapsControl);

        this.locateControl = new locateControlClass();
        // overriding functions here to bind to outer scope
        this.locateControl.onLocationFound = (lat, lng) => {
            const place = {
                label: null,
                location: {lat: lat, lng: lng}
            };
            this.props.onSetLocation(place);
        };
        this.locateControl.addTo(map);

        if (place && this.place.location !== null) {
            this._zoomToPlace(place);
        }

        if (selectedUnit !== null) {
            this._highlightUnit(selectedUnit)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {place, selectedUnit} = nextProps;

        if (place !== this.state.place) {
            if (place && place.location) {
                this.setState({place: place});
                this._zoomToPlace(place);
            }
            else {
                this._removeMarker();
            }
        }

        // Set currently selected unit, clearing out previous selection if
        // necessary
        if (selectedUnit !== this.state.selectedUnit) {
            this._unhighlightUnit(this.state.selectedUnit);
            this._highlightUnit(selectedUnit);
            this.setState({selectedUnit: selectedUnit});
        }
    }

    _zoomToPlace(place) {
        const zoom = 10;

        // for now, intentionally ignoring label
        this._addMarker(place.location.lat, place.location.lng, null);
        this.map.setView([place.location.lat, place.location.lng], zoom);
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
        if (this.state.selectedUnit !== null) {
            this._unhighlightUnit(this.state.selectedUnit);

            // Selecting the same unit again deselects it
            if (id === this.state.selectedUnit) {
                this.setState({selectedUnit: null});
                this.props.onDeselectUnit();
                return;
            }
        }

        this._highlightUnit(id);
        this.setState({selectedUnit: id});
        this.props.onSelectUnit(id);
    }
    
    _highlightUnit(id) {
        if (id !== null) {
            config.unitLayer.setFeatureStyle(id, config.highlightStyle)
        }
    }
    
    _unhighlightUnit(id) {
        if (id !== null) {
            config.unitLayer.resetFeatureStyle(id);
        }
    }
    

    render() {
        return (
            <div id="MapContainer">
                {this.state.zoom < 10 &&
                    <div ref={(node) => this._zoomNote = node} id="ZoomInNote"
                         className="text-center text-small text-quieter">
                        Zoom in to select an area
                    </div>
                }
                <div ref={(node) => this._mapNode = node} id="Map" onClick={this.props.onClick}></div>
            </div>
        );
    }
}

Map.propTypes = {
    // TODO: place is expected to be:
    // {
    //     label: 'Place name',
    //     location: {lat: 44.1, lng: -123.2}
    // }
    selectedUnit: PropTypes.string,
    onSelectUnit: PropTypes.func,
    onDeselectUnit: PropTypes.func
};



Map.defaultProps = {
    place: null,
    selectedUnit: null,
    onSelectUnit: (id) => {console.log('Selected map unit: ', id)},
    onDeselectUnit: () => {console.log('Deselected map unit')},
    onSetLocation: (place) => {console.log('Set location using location services', place);}
};


export default Map;