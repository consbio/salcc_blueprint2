/* eslint-disable no-underscore-dangle */
import L from 'leaflet'

const LocateControl = L.Control.extend({
    options: {
        position: 'topright',
        maxZoom: 10
    },

    // Connection point
    /* eslint-disable no-unused-vars */
    onLocationFound: (lat, lng) => {},

    onAdd(map) {
        this._map = map
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-locate-control')
        L.DomEvent.disableClickPropagation(container)
        container.title = 'Zoom to my location'

        const link = L.DomUtil.create('a', '', container)
        link.href = '#'

        L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', () => {
                this._map.locate({ setView: true, maxZoom: this.options.maxZoom })
            })
            .on(link, 'dblclick', L.DomEvent.stopPropagation)

        map.on('locationfound', (e) => {
            this.onLocationFound(e.latlng.lat, e.latlng.lng)
        })

        map.on('locationerror', () => {
            /* eslint-disable-next-line no-alert */
            alert('Unable to determine location.  Make sure your settings allow location services.')
        })

        return container
    }
})

export default LocateControl
