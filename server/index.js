require('./config/dbConnection')

const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const cookieParser = require('cookie-parser')

const path = require('path')

// import middleware
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const { logger } = require('./middleware/logger')

// Import controllers
const investmentRouter = require('./routes/investmentRoutes')
const userRoutes = require('./routes/userRoutes')
const propertyRoutes = require('./routes/propertyRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const jewelRoutes = require('./routes/jewelRoutes')
const stockRoutes = require('./routes/stockRoutes')
const cryptoRoutes = require('./routes/cryptoRoutes')
const bondRoutes = require('./routes/bondRoutes')
const authRoutes = require('./routes/authRoutes')
const willRoutes = require('./routes/willRoutes')
const calculatorRoutes = require('./routes/calculatorRoutes')
const commodityRoutes = require('./routes/commodityRoutes')
const fundRoutes = require('./routes/fundRoutes')

const app = express()

app.use(logger)

app.use(cors(corsOptions))
app.use(express.json()) // initial Parse JSON bodies

app.use(cookieParser())

Sentry.init({
  dsn: 'https://05a850a7ff3a47c6a6edcd93f8c1a6ab@o4505107991822336.ingest.sentry.io/4505107993853952',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations()
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../app/dist'))
//   app.get('*', (req, res) => res.sendFile(path.resolve('app', 'dist', 'index.html')))
// }

app.use(express.static(path.join(__dirname, '../app/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/dist'))
})

// app.use(express.static('../app/dist'))

app.use(userRoutes)

app.use(authRoutes)

app.use(investmentRouter)

app.use(propertyRoutes)

app.use(vehicleRoutes)

app.use(jewelRoutes)

app.use(stockRoutes)

app.use(cryptoRoutes)

app.use(bondRoutes)

app.use(willRoutes)

app.use(calculatorRoutes)

app.use(commodityRoutes)

app.use(fundRoutes)

app.use(notFound)

// --------------------------deployment------------------------------
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../app/dist'))
//   app.get('*', (req, res) => res.sendFile(path.resolve('app', 'dist', 'index.html')))
// }
// const __dirname = path.resolve()

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/app/dist')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'app', 'dist', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send(express.static('../app/dist'))
//   })
// }
// --------------------------deployment------------------------------

app.use(Sentry.Handlers.errorHandler())

app.use(errorHandler)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
