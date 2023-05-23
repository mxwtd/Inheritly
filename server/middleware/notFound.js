const notFound = (request, response) => {
  console.log('no found')
  response.status(404).end()
}

module.exports = notFound
