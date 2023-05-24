const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization

    let token = null

    try {
      if (authHeader !== undefined) {
        if (authHeader || authHeader.toLowerCase().startsWith('bearer')) {
          token = authHeader.split(' ')[1]
        }
      }
    } catch (error) {
      next(error)
    }

    let decodedToken = null
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
      console.log('decodedToken: ', decodedToken)
    } catch (error) {
      next(error)
    }

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { id: userId } = decodedToken
    const { email: userEmail } = decodedToken
    req.userId = userId
    req.userEmail = userEmail

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = verifyJWT