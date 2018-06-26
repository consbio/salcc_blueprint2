import Raven from 'raven-js'

// Initialize raven for our DSN
if (process.env.NODE_ENV !== 'development') {
    Raven.config('https://ee2fb0698ed04309baa26d4af81b0305@sentry.io/213163').install()
}

const logException = (ex, context) => {
    if (process.env.NODE_ENV !== 'development') {
        Raven.captureException(ex, {
            extra: context
        })
    }

    console.error(ex)  /* eslint-disable-line no-console */
}

export default logException
