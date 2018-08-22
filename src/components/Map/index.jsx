/* eslint-disable max-len, no-underscore-dangle */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet.vectorgrid'
import 'leaflet-basemaps'
import 'leaflet-zoombox'
import 'leaflet-geonames'
import 'leaflet-html-legend'
import 'leaflet-datatilelayer'
import 'leaflet/dist/leaflet.css'
import 'leaflet-basemaps/L.Control.Basemaps.css'
import 'leaflet-zoombox/L.Control.ZoomBox.css'
import 'leaflet-geonames/L.Control.Geonames.css'
import 'leaflet-html-legend/dist/L.Control.HtmlLegend.css'

import * as actions from '../../Actions/actions'
import LocateControl from './LocateControl'
import PixelModeControl from './PixelModeControl'
import { PlacePropType } from '../../CustomPropTypes'

import encoding from '../../config/encoding.json'

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || '' // REQUIRED: this must be present in .env file

// Make leaflet icons work properly from webpack / react context

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

// Map configurationParameters
const config = {
    mapParams: {
        center: [33.358, -78.593], // for testing: [33.358, -80]
        zoom: 5, // for testing: 10
        minZoom: 3,
        maxZoom: 15,
        zoomControl: false,
        scrollwheel: false,
        attributionControl: false,
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
    },
    hoverStyle: {
        color: '#0892D0',
        fillColor: '#0892D0',
        fillOpacity: 0.7,
        fill: true,
        weight: 2
    },
    dataLayers: [
        L.dataTileLayer('http://localhost:8001/services/encoding2/tiles/{z}/{x}/{y}.png', {
            encoding: encoding['2'],
            opacity: 0.5,
            minZoom: 0,
            maxZoom: 8 // TODO
        }),
        L.dataTileLayer('http://localhost:8001/services/encoding3/tiles/{z}/{x}/{y}.png', {
            encoding: encoding['3'],
            opacity: 0.5,
            minZoom: 0,
            maxZoom: 8 // TODO
        }),
        L.dataTileLayer('http://localhost:8001/services/encoding5/tiles/{z}/{x}/{y}.png', {
            encoding: encoding['5'],
            opacity: 0.5,
            minZoom: 0,
            maxZoom: 8 // TODO
        }),
        L.dataTileLayer('http://localhost:8001/services/encoding7/tiles/{z}/{x}/{y}.png', {
            encoding: encoding['7'],
            opacity: 0.5,
            minZoom: 0,
            maxZoom: 8 // TODO
        })
    ]
}

const opacityScale = (zoom) => {
    const minZoom = 3
    const maxZoom = 13
    const opacityRange = [0.5, 0.3] // go from 0.5 opacity at zoom 3 to 0.3 at zoom 13
    if (zoom <= minZoom) return opacityRange[0]
    if (zoom >= maxZoom) return opacityRange[1]

    const p = (zoom - minZoom) / (maxZoom - minZoom) // proportion of way through zoom range
    /* eslint-disable-next-line no-mixed-operators */
    return p * (opacityRange[1] - opacityRange[0]) + opacityRange[0]
}

class Map extends Component {
    constructor(props) {
        super(props)

        const { place, selectedUnit, isPixelMode } = props
        this.state = {
            place,
            selectedUnit,
            isPixelMode,
            zoom: config.mapParams.zoom
        }

        this._mapNode = null
        this.map = null
        this.locateControl = null
        this._marker = null
    }

    componentDidMount() {
        const { place, selectedUnit } = this.state
        const { isMobile, setPlace, setPixelMode } = this.props
        config.mapParams.attributionControl = !isMobile
        const map = L.map(this._mapNode, config.mapParams)
        this.map = map

        // for easier debugging
        window.map = map

        if (!isMobile) {
            L.control.zoom({ position: 'topright' }).addTo(map)
            L.control.zoomBox({ position: 'topright' }).addTo(map)

            // add geonames search when in desktop view
            // it is a known issue that this uses a different API than google placenames search in mobile
            L.control
                .geonames({
                    position: 'topright',
                    username: 'databasin.cbi',
                    maxresults: 10,
                    bbox: {
                        west: -86,
                        east: -71,
                        north: 38,
                        south: 29
                    }
                })
                .addTo(map)

            L.control
                .htmllegend({
                    position: 'bottomright',
                    legends: [
                        {
                            name: 'Blueprint 2.2 Priority',
                            elements: [
                                {
                                    label: 'Highest priority',
                                    html: '',
                                    style: { 'background-color': '#49006a' }
                                },
                                {
                                    label: 'High priority',
                                    html: '',
                                    style: { 'background-color': '#c51b8a' }
                                },
                                {
                                    label: 'Medium priority',
                                    html: '',
                                    style: { 'background-color': '#fbb4b9' }
                                },
                                {
                                    label: 'Corridors',
                                    html: '',
                                    style: { 'background-color': '#686868' }
                                },
                                {
                                    label: 'Inland waterbodies',
                                    html: '',
                                    style: { 'background-color': '#004DA8' }
                                }
                            ]
                        }
                    ]
                })
                .addTo(map)
        }

        map.addLayer(config.blueprintLayer)
        config.blueprintLayer.setOpacity(opacityScale(map.getZoom())) // do this on initial load too

        map.on('zoomend', () => {
            const zoom = map.getZoom()
            config.blueprintLayer.setOpacity(opacityScale(zoom))
            this.setState({ zoom })
        })

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
            setPlace({
                label: null,
                location: { lat, lng }
            })
        }
        this.locateControl.addTo(map)

        // we are not in pixel mode by default, so go ahead and add unit layer
        this._addUnitLayer()

        if (!isMobile) {
            const pixelModeControl = new PixelModeControl()
            pixelModeControl.on('change', ({ isEnabled }) => {
                setPixelMode(isEnabled)
            })
            pixelModeControl.addTo(map)
        }

        if (place && this.place.location !== null) {
            this._zoomToPlace(place)
        }

        if (selectedUnit !== null) {
            this._highlightUnit(selectedUnit)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { place, selectedUnit, isPixelMode } = nextProps

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

        // update based on pixel mode
        if (isPixelMode !== this.state.isPixelMode) {
            this.setState({ isPixelMode })
            if (isPixelMode) {
                this._addDataTileLayers()
            } else {
                this._removeDataTileLayers()
                this._addUnitLayer()
            }
        }
    }

    _addUnitLayer = () => {
        const { isMobile } = this.props
        config.unitLayer.on('click', (f) => {
            this._handleSelect(f.layer.properties.ID)
        })

        if (!isMobile) {
            config.unitLayer
                .on('mouseover', (f) => {
                    const id = f.layer.properties.ID
                    if (id === null || id === this.state.selectedUnit) return
                    config.unitLayer.setFeatureStyle(id, config.hoverStyle)
                })
                .on('mouseout', (f) => {
                    const id = f.layer.properties.ID
                    if (id === null || id === this.state.selectedUnit) return
                    this._unhighlightUnit(id)
                })
        }

        this.map.addLayer(config.unitLayer)
    }

    _addDataTileLayers = () => {
        const { map } = this
        const { setPixelValues } = this.props
        const { dataLayers, unitLayer } = config
        map.removeLayer(unitLayer)

        const getValues = () => {
            // splice all objects into a single one
            const location = map.getCenter()
            const values = Object.assign({}, ...dataLayers.map(l => l.decodePoint(location)))
            setPixelValues({ latitude: location.lat, longitude: location.lng }, values)
        }

        dataLayers.forEach((layer) => {
            // layer.on('load', getValues) // TODO: this won't work if there are multiple layers and they haven't all loaded; increment a counter!
            layer.addTo(map)
        })

        map.on('move', getValues) // TODO: on zoom too?
        // TODO: need to unhook this when not in pixel mode
        // TODO: be careful, not all tiles may be fully loaded after move, need to collect them all
    }

    _removeDataTileLayers = () => {
        // map silently ignores layers it doesn't already have
        const { map } = this
        const { dataLayers } = config
        dataLayers.forEach((layer) => {
            map.removeLayer(layer)
        })
        map.off('move')  // TODO: tune this, it disconnects ALL move handlers
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
        const {
            activeTab, isMobile, selectUnit, deselectUnit, setTab
        } = this.props

        if (selectedUnit !== null) {
            if (id === selectedUnit) {
                if (isMobile) {
                    // Selecting the same unit again deselects it
                    this.setState({ selectedUnit: null })
                    this._unhighlightUnit(selectedUnit)
                    deselectUnit()
                }
                return
            }

            this._unhighlightUnit(selectedUnit)
        }

        this._highlightUnit(id)
        this.setState({ selectedUnit: id })
        selectUnit(id)
        if (!isMobile && activeTab === 'Map') {
            setTab('Priorities')
        }
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
        const { zoom, isPixelMode } = this.state
        return (
            <div id="MapContainer">
                {zoom < 10 && (
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
                />
                {isPixelMode && <div id="MapCenterIcon" />}
            </div>
        )
    }
}

Map.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    isPixelMode: PropTypes.bool.isRequired,
    setPlace: PropTypes.func.isRequired,
    selectUnit: PropTypes.func.isRequired,
    deselectUnit: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired,
    setPixelMode: PropTypes.func.isRequired,
    setPixelValues: PropTypes.func.isRequired,

    activeTab: PropTypes.string,
    place: PlacePropType,
    selectedUnit: PropTypes.string
}

Map.defaultProps = {
    activeTab: null,
    place: null,
    selectedUnit: null
}

const mapStateToProps = ({
    app: {
        activeTab,
        place,
        selectedUnit,
        isPixelMode,
        selectUnit,
        deselectUnit,
        setPlace,
        setPixelMode,
        setPixelValues,
        setTab
    },
    browser: { isMobile }
}) => ({
    activeTab,
    isMobile,
    place,
    selectedUnit,
    isPixelMode,
    selectUnit,
    deselectUnit,
    setPlace,
    setPixelMode,
    setPixelValues,
    setTab
})

export default connect(
    mapStateToProps,
    actions
)(Map)
