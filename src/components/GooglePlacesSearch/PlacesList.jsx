import React from 'react'
import PropTypes from 'prop-types'

const PlacesList = ({
    places, highlightText, isPending, onSelect
}) => {
    if (isPending) {
        return <div className="gplaces-search-loading">loading...</div>
    }

    if (highlightText && places.length === 0) {
        return <div className="gplaces-search-noresults">No results found...</div>
    }

    return (
        <ul className="gplaces-search-results">
            {places.map((result) => {
                const { label } = result
                const offset = label.toLowerCase().indexOf(highlightText.toLowerCase())
                const handleClick = (e) => {
                    e.preventDefault()
                    onSelect(result)
                }

                if (offset === -1) {
                    return (
                        <a key={label} href="#" onClick={handleClick}>
                            <li>{label}</li>
                        </a>
                    )
                }

                const head = label.slice(0, offset)
                const highlight = label.slice(offset, offset + highlightText.length)
                const tail = label.slice(offset + highlightText.length)
                return (
                    <a key={label} href="#" onClick={handleClick}>
                        <li>
                            {head}
                            <b>{highlight}</b>
                            {tail}
                        </li>
                    </a>
                )
            })}
        </ul>
    )
}

PlacesList.propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: shape
    onSelect: PropTypes.func.isRequired,
    isPending: PropTypes.bool,
    highlightText: PropTypes.string
}

PlacesList.defaultProps = {
    isPending: false,
    highlightText: ''
}

export default PlacesList
