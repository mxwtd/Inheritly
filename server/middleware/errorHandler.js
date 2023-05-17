const ERROR_HANDLERS = {
  CastError: response => response.status(400).send({ error: 'bad id typed' }),
  JsonWebTokenError: response => response.status(401).send({ error: 'token is missing or invalid token' }),
  TokenExpiredError: response => response.status(401).send({ error: 'token expired' }),
  ValidationError: (response, error) => response.status(409).send({ error: error.message }),
  defaultError: response => response.status(500).end()
}

const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
  console.log(err.stack)

  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
  handler(res, err)
}

module.exports = errorHandler
