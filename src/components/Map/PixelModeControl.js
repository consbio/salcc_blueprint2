/* eslint-disable no-underscore-dangle */

import L from 'leaflet'

const PixelModeControl = L.Control.extend({
    _active: false,
    _container: null,
    _map: null,
    includes: L.Evented ? L.Evented.prototype : L.Mixin.Event,

    options: {
        position: 'topright',
        maxZoom: 10
    },

    // Connection point
    /* eslint-disable no-unused-vars */
    onLocationFound: (lat, lng) => {},

    onAdd(map) {
        this._map = map
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-pixelmode-control')
        this._container = container
        L.DomEvent.disableClickPropagation(container)
        container.title = 'View pixel-level data'

        const link = L.DomUtil.create('a', '', container)
        link.href = '#'

        // L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation)
        //     .on(link, 'click', L.DomEvent.preventDefault)
        L.DomEvent.on(link, 'click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (!this._active) {
                this._activate()
            } else {
                this._deactivate()
            }
        }).on(link, 'dblclick', L.DomEvent.stopPropagation)

        return container
    },

    _activate() {
        this._active = true
        L.DomUtil.addClass(this._container, 'active')
        this.fire('change', { isEnabled: true })
    },

    _deactivate() {
        this._active = false
        L.DomUtil.removeClass(this._container, 'active')
        this.fire('change', { isEnabled: false })
    },

    onChange(isActive) {} // for connecting external events
})

export default PixelModeControl
