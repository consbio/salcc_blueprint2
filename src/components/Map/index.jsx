/* eslint-disable max-len, no-underscore-dangle */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet.vectorgrid'
import 'leaflet-basemaps'
import 'leaflet-zoombox'
import 'leaflet/dist/leaflet.css'
import 'leaflet-basemaps/L.Control.Basemaps.css'
import 'leaflet-zoombox/L.Control.ZoomBox.css'

import LocateControl from './LocateControl'
import { PlacePropType } from '../../CustomPropTypes'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ'

// Make leaflet icons work properly from webpack / react context

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

// Map configurationParameters
const config = {
    mapParams: {
        center: [33.358, -80], // FIXME: [33.358, -78.593],
        // zoom: 5,
        zoom: 10,
        minZoom: 3,
        maxZoom: 15,
        zoomControl: false,
        scrollwheel: false,
        // attributionControl: false,
        zIndex: 1
    },
    basemaps: [
        L.tileLayer(
            `https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
            {}
        ),
        L.tileLayer(
            `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
            {
                opacity: 0.6
            }
        )
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
        getFeatureId: f => f.properties.ID
    }),
    highlightStyle: {
        color: '#0892D0',
        fillColor: '#0892D0',
        fillOpacity: 0.3,
        fill: true,
        weight: 3
    }
}

class Map extends Component {
    constructor(props) {
        super(props)

        const { place, selectedUnit } = props
        this.state = {
            place,
            selectedUnit,
            zoom: config.mapParams.zoom
        }

        this._mapNode = null
        this.map = null
        this.locateControl = null
        this._marker = null
    }

    componentDidMount() {
        const { place, selectedUnit } = this.state
        const { isMobile, onSetLocation } = this.props
        config.mapParams.attributionControl = !isMobile
        const map = L.map(this._mapNode, config.mapParams)
        this.map = map

        // for easier debugging
        window.map = map

        if (!isMobile) {
            L.control.zoom({ position: 'topright' }).addTo(map)
            L.control.zoomBox({ position: 'topright' }).addTo(map)
        }

        map.addLayer(config.blueprintLayer)

        const opacityScale = scaleLinear()
            .domain([3, 13])
            .range([0.5, 0.3])
        config.blueprintLayer.setOpacity(opacityScale(map.getZoom())) // do this on initial load too

        map.on('zoomend', () => {
            const zoom = map.getZoom()
            config.blueprintLayer.setOpacity(opacityScale(zoom))
            this.setState({ zoom })
        })

        config.unitLayer.on('click', (f) => {
            this._handleSelect(f.layer.properties.ID)
        })

        map.addLayer(config.unitLayer)

        const basemapsControl = L.control.basemaps({
            basemaps: config.basemaps,
            tileX: 4,
            tileY: 6,
            tileZ: 4,
            position: isMobile ? 'topright' : 'bottomleft'
        })
        map.addControl(basemapsControl)

        this.locateControl = new LocateControl()
        // overriding functions here to bind to outer scope
        this.locateControl.onLocationFound = (lat, lng) => {
            onSetLocation({
                label: null,
                location: { lat, lng }
            })
        }
        this.locateControl.addTo(map)

        if (place && this.place.location !== null) {
            this._zoomToPlace(place)
        }

        if (selectedUnit !== null) {
            this._highlightUnit(selectedUnit)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { place, selectedUnit } = nextProps

        if (place !== this.state.place) {
            if (place && place.location) {
                this.setState({ place })
                this._zoomToPlace(place)
            } else {
                this._removeMarker()
            }
        }

        // Set currently selected unit, clearing out previous selection if
        // necessary
        if (selectedUnit !== this.state.selectedUnit) {
            this._unhighlightUnit(this.state.selectedUnit)
            this._highlightUnit(selectedUnit)
            this.setState({ selectedUnit })
        }
    }

    _zoomToPlace(place) {
        const zoom = 10

        // for now, intentionally ignoring label
        this._addMarker(place.location.lat, place.location.lng, null)
        this.map.setView([place.location.lat, place.location.lng], zoom)
    }

    _addMarker(lat, lng, label) {
        this._removeMarker()

        this._marker = L.marker([lat, lng]).addTo(this.map)
        if (label !== null) {
            this._marker.bindPopup(label)
            this._marker.openPopup()
        }
    }

    _removeMarker() {
        if (this._marker !== null) {
            this.map.removeLayer(this._marker)
            this._marker = null
        }
    }

    _handleSelect(id) {
        const { selectedUnit } = this.state
        const { allowDeselect, onSelectUnit, onDeselectUnit } = this.props

        if (selectedUnit !== null) {
            if (id === selectedUnit) {
                if (allowDeselect) {
                    // Selecting the same unit again deselects it
                    this.setState({ selectedUnit: null })
                    this._unhighlightUnit(selectedUnit)
                    onDeselectUnit()
                }
                return
            }

            this._unhighlightUnit(selectedUnit)
        }

        this._highlightUnit(id)
        this.setState({ selectedUnit: id })
        onSelectUnit(id)
    }

    _highlightUnit = (id) => {
        if (id !== null) {
            config.unitLayer.setFeatureStyle(id, config.highlightStyle)
        }
    }

    _unhighlightUnit = (id) => {
        if (id !== null) {
            config.unitLayer.resetFeatureStyle(id)
        }
    }

    render() {
        return (
            <div id="MapContainer">
                {this.state.zoom < 10 && (
                    <div
                        ref={(node) => {
                            this._zoomNote = node
                        }}
                        id="ZoomInNote"
                        className="text-center text-small text-quieter"
                    >
                        Zoom in to select an area
                    </div>
                )}
                <div
                    ref={(node) => {
                        this._mapNode = node
                    }}
                    id="Map"
                    onClick={this.props.onClick}
                />
            </div>
        )
    }
}

Map.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    place: PlacePropType,
    selectedUnit: PropTypes.string,
    onSelectUnit: PropTypes.func,
    onDeselectUnit: PropTypes.func,
    onSetLocation: PropTypes.func,
    onClick: PropTypes.func,
    allowDeselect: PropTypes.bool
}

Map.defaultProps = {
    place: null,
    selectedUnit: null,
    allowDeselect: false,
    onSelectUnit: (id) => {
        console.log('Selected map unit: ', id) /* eslint-disable-line no-console */
    },
    onDeselectUnit: () => {
        console.log('Deselected map unit') /* eslint-disable-line no-console */
    },
    onSetLocation: (place) => {
        console.log('Set location using location services', place) /* eslint-disable-line no-console */
    },
    onClick: () => console.log('map onClick') /* eslint-disable-line no-console */
}

export default Map
