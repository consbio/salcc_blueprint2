import React, { Component } from 'react';
import L from 'leaflet';
//import '../node_modules/leaflet-modal';
import '../../../node_modules/leaflet.locatecontrol';
// postCSS import of Leaflet's CSS
import 'leaflet/dist/leaflet.css';

// Get some more layers in there
let grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/johnmichel/ciobach7h0084b3nf482gfvvr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9obm1pY2hlbCIsImEiOiJjaW9iOW1vbHUwMGEzdnJseWNranhiMHpxIn0.leVOjMBazNl6v4h9MT7Glw', {id: 'MapID'});
let streets = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {id: 'MapID'});
// import local components Filter and ForkMe
// store the map configuration properties in an object,
// we could also move this to a separate file & import it if desired.
let config = {};
config.params = {
  center: [33.755769,-84.386330],
  zoomControl: false,
  zoom: 7,
  maxZoom: 15,
  minZoom: 5,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true,
  layers: [grayscale],
    zIndex: 1
};
config.tileLayer = {
  uri: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
  params: {
    minZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
};

// array to store unique names of Brooklyn subway lines,
// this eventually gets passed down to the Filter component

//class Map extends Component {
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
    };
    this._mapNode = null;
    this.updateMap = this.updateMap.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    //this.pointToLayer = this.pointToLayer.bind(this);//not needed
    //this.filterFeatures = this.filterFeatures.bind(this);//not needed

  }


  componentDidMount() {
    // code to run just after the component "mounts" / DOM elements are created
    // we could make an AJAX request for the GeoJSON data here if it wasn't stored locally
    this.getData();
    // create the Leaflet map object
    if (!this.state.map) this.init(this._mapNode);
  }

  componentDidUpdate(prevProps, prevState) {
    // code to run when the component receives new props or state
    // check to see if geojson is stored, map is created, and geojson overlay needs to be added

  }

  componentWillUnmount() {
    // code to run just before unmounting the component
    // this destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  getData() {
    // could also be an AJAX request that results in setting state with the geojson data
    // for simplicity sake we are just importing the geojson data using webpack's json loader

  }

  updateMap(e) {

  }



  zoomToFeature(target) {///////////////////////////////////////////////////////////////////////////////////unsure
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [200,10],
      paddingBottomRight: [10,10]
    };
    // set the map's center & zoom so that it fits the geographic extent of the layer
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }

  filterFeatures(feature, layer) {
    // filter the subway entrances based on the map's current search filter
    // returns true only if the filter value matches the value of feature.properties.LINE

  }


  onEachFeature(feature, layer) {//not needed////////////
  }

  init(id) {
    if (this.state.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, config.params);
    let baseMaps = {
        "Grayscale": grayscale,
        "Streets": streets
    };
    //let overlayMaps = {
      //  "Cities": L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {id: 'MapID'})
    //};


    //L.control.zoom({ position: "topright"}).addTo(map);
    //L.control.scale({ position: "bottomleft"}).addTo(map);
    //L.control.layers( baseMaps, overlayMaps, {position: "bottomleft"}).addTo(map);
    L.control.locate({position: "bottomright"}).addTo(map);

    // a TileLayer is used as the "basemap"
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    // set our state to include the tile layer
    this.setState({ map, tileLayer });
  }



  render() {
    return (
      <div id="mapUI">
        {
          //<Map/>
            //Currently the navigation is always showing but a show and hide function exists
        }
        <div ref={(node) => this._mapNode = node} id="map" />
      </div>

    );
  }
}