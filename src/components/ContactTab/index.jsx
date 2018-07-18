import React from 'react'

const ContactTab = () => (
    <div id="Content">
        <section>
            <h3>Feedback</h3>
            <p>
                You can help improve the Blueprint. Please give us your feedback:
                <br />
                <br />
                <b>email</b>{' '}
                <a
                    href="mailto:southatlanticlcc@gmail.com?subject=South Atlantic Blueprint Feedback (Simple Viewer)"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    southatlanticlcc@gmail.com
                </a>
            </p>
        </section>
        <section>
            <h3>Contact Staff</h3>
            <p>
                Do you have questions about the Blueprint? Do you need support from South Atlantic staff to help
                interpret and apply the Blueprint for your project?
                <br />
                <br />
                South Atlantic staff are here to help!
                <br />
                <br />
                <b>email</b>{' '}
                <a
                    href="mailto:southatlanticlcc@gmail.com?subject=South Atlantic Blueprint Support (Simple Viewer)"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    southatlanticlcc@gmail.com
                </a>
                <br />
                <br />
                <b>call</b> Hilary Morris: <a href="tel:19197070252">(919) 707-0252</a>
                <div className="text-quieter text-small">(Blueprint User Support)</div>
            </p>
        </section>
    </div>
)

ContactTab.propTypes = {}

export default ContactTab
