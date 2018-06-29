import Raven from 'raven-js'

const logException = (ex, context) => {
    if (process.env.NODE_ENV !== 'development') {
        Raven.captureException(ex, {
            extra: context
        })
    }

    console.error(ex)  /* eslint-disable-line no-console */
}

export default logException
