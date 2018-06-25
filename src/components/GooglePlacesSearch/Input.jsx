import React from 'react'
import PropTypes from 'prop-types'

import ResetIcon from '../icons/ResetIcon'

// The value of this input is entirely managed via props (meaning it is managed from the outside)
class Input extends React.PureComponent {
    onFocus = () => {
        this.props.onFocus()
    }

    onBlur = () => {
        this.props.onBlur()
    }

    focus() {
        this.input.focus()
    }

    blur() {
        this.input.blur()
    }

    reset = (event) => {
        event.preventDefault()
        this.props.onChange('')
        this.focus()
    }

    handleChange = (event) => {
        this.props.onChange(event.target.value)
    }

    renderSpinner = () => {
        if (this.props.isPending) {
            return (
                <div className="gplaces-search-spinner">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20px"
                        height="20px"
                        viewBox="0 0 80 80"
                    >
                        <path
                            fill="#AAA"
                            d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
                        >
                            <animateTransform
                                attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 40 40"
                                to="360 40 40"
                                dur="1s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </svg>
                </div>
            )
        }

        return null
    }

    renderReset = () => {
        if (this.props.value) {
            return <ResetIcon className="gplaces-search-reset" onClick={this.reset} />
        }
        return null
    }

    render() {
        const icon = (
                <svg
                    fill="#888"
                    height="30"
                    width="30"
                    viewBox="2 -2 22 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={this.focus.bind(this)}
                >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            ),
            input = (
                <input
                    ref={i => (this.input = i)}
                    type="text"
                    autoComplete="false"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.handleChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
            ),
            spinner = this.renderSpinner(),
            reset = this.renderReset()

        return (
            <div className={this.props.className}>
                {icon}
                {input}
                {spinner}
                {reset}
            </div>
        )
    }
}

Input.defaultProps = {
    className: '',
    value: '',
    placeholder: 'Enter a location name',
    isPending: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {}
}

export default Input
