/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'

// The value of this input is entirely managed via props (meaning it is managed from the outside)
const Input = ({
    value, placeholder, onChange, onBlur, onFocus
}) => {
    const handleChange = ({ target: { value: newValue } }) => {
        onChange(newValue)
    }

    const handleReset = (e) => {
        e.preventDefault()
        onChange('')
    }

    return (
        <div className="gplaces-search-input-container flex-container flex-align-center">
            <svg fill="#AAA" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg>

            <input
                type="text"
                autoComplete="false"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            <a className="gplaces-search-reset" href="#" onClick={handleReset}>
                cancel
            </a>
        </div>
    )
}

Input.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string
}

Input.defaultProps = {
    value: '',
    placeholder: 'Enter a location name',
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {}
}

export default Input
