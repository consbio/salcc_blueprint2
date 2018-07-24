import React from 'react'
import PropTypes from 'prop-types'

import ResetIcon from './icons/outline-cancel-24px.svg'

const Modal = ({
    title, children, width, onClose, open
}) => {
    const handleClose = (e) => {
        // we can't annotate path inside the icon SVG, so we just check type
        if (e.target.dataset.clickable || e.target.nodeName === 'path') {
            onClose()
        }
    }

    if (!open) return null

    return (
        <React.Fragment>
            <div className="modal-scrim" />
            <div
                className="modal-container flex-container flex-justify-center flex-align-center"
                onClick={handleClose}
                data-clickable
            >
                <div className="modal" style={{ width }}>
                    <div className="modal-header flex-container ">
                        <h3 className="modal-title">{title}</h3>
                        <ResetIcon className="modal-close" onClick={handleClose} data-clickable />
                    </div>
                    <div className="modal-content">{children}</div>
                </div>
            </div>
        </React.Fragment>
    )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,

    open: PropTypes.bool,
    width: PropTypes.number,
    onClose: PropTypes.func
}

Modal.defaultProps = {
    open: true,
    width: 400,
    onClose: () => {}
}
export default Modal
