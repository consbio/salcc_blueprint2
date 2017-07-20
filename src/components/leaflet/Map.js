import React, {Component} from 'react';
import L from 'leaflet';
import 'leaflet-basemaps';
//import '../node_modules/leaflet-modal';
// import '../../../node_modules/leaflet.locatecontrol';
// postCSS import of Leaflet's CSS
import 'leaflet/dist/leaflet.css';
import 'leaflet-basemaps/L.Control.Basemaps.css';
import './Map.css';
// require('leaflet-basemaps')


// Map configurationParameters
let config = {
    mapParams: {
        center: [33.358, -78.593],
        zoom: 6,
        minZoom: 6,
        maxZoom: 14,
        zoomControl: false,
        scrollwheel: false,
        // legends: true,
        // infoControl: false,
        attributionControl: false,
        // layers: [grayscale],
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
    ]






};




// config.tileLayer = {
//     uri: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
//     params: {
//         minZoom: 5,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//         id: '',
//         accessToken: ''
//     }
// };

// array to store unique names of Brooklyn subway lines,
// this eventually gets passed down to the Filter component

//class Map extends Component {
export default class Map extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   map: null,
        //   // tileLayer: null,
        // };
        this._mapNode = null;
        // this.updateMap = this.updateMap.bind(this);
        // this.onEachFeature = this.onEachFeature.bind(this);
        //this.pointToLayer = this.pointToLayer.bind(this);//not needed
        //this.filterFeatures = this.filterFeatures.bind(this);//not needed

    }


    componentDidMount() {
        // if (!this.state.map) this.init(this._mapNode);

        this.init();




        // var blueprintLayer = new L.tileLayer(blueprintTilesURL, {
        //     maxZoom: 13,
        //     maxNativeZoom: 11,
        //     errorTileUrl: 'static/blank.png',
        //     bounds: [[29.257276664000074, -85.89853697199993], [37.45876403900007, -71.28723321899992]],
        //     zIndex: 2
        // }).addTo(map);

    }

    componentDidUpdate(prevProps, prevState) {
        // code to run when the component receives new props or state
        // check to see if geojson is stored, map is created, and geojson overlay needs to be added

    }

    componentWillUnmount() {
        // code to run just before unmounting the component
        // this destroys the Leaflet map object & related event listeners
        // this.state.map.remove();
    }

    // getData() {
    //     // could also be an AJAX request that results in setting state with the geojson data
    //     // for simplicity sake we are just importing the geojson data using webpack's json loader
    //
    // }
    //
    // updateMap(e) {
    //
    // }
    //
    //
    // zoomToFeature(target) {///////////////////////////////////////////////////////////////////////////////////unsure
    //     // pad fitBounds() so features aren't hidden under the Filter UI element
    //     var fitBoundsParams = {
    //         paddingTopLeft: [200, 10],
    //         paddingBottomRight: [10, 10]
    //     };
    //     // set the map's center & zoom so that it fits the geographic extent of the layer
    //     this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
    // }
    //
    // onEachFeature(feature, layer) {//not needed////////////
    // }

    init() {
        // if (this.state.map) return;
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(this._mapNode, config.mapParams);


        var basemapsControl = L.control.basemaps({
            basemaps: config.basemaps,
            tileX: 4,
            tileY: 6,
            tileZ: 4,
            position: 'bottomleft'
        });
        map.addControl(basemapsControl);

        // L.control.locate({position: "bottomright"}).addTo(map);

        // a TileLayer is used as the "basemap"
        // const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

        // set our state to include the tile layer
        // this.setState({ map, tileLayer });
    }


    render() {
        return (
            <div id="MapContainer">
                <div ref={(node) => this._mapNode = node} id="Map" />
            </div>

        );
    }
}