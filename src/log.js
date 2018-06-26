import Raven from 'raven-js'

// Initialize raven for our DSN
Raven.config('https://ee2fb0698ed04309baa26d4af81b0305@sentry.io/213163').install()

const logException = (ex, context) => {
    Raven.captureException(ex, {
        extra: context
    })

    console.error(ex)
}

export default logException
