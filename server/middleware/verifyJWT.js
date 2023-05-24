const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization

    let token = null

    try {
      if (!authHeader?.toLowerCase().startsWith('bearer')) {
        token = authHeader.split(' ')[1]
      }
    } catch (error) {
      next(error)
    }

    let decodedToken = null
    try {
      decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY,
        (err, decoded, next) => {
          if (err) {
            const error = new Error('Forbidden token')
            error.name = 'Forbidden'
            return next(error)
          }
        }
      )
    } catch (error) {
      next(error)
    }

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { id: userId } = decodedToken.UserInfo
    const { email: userEmail } = decodedToken.UserInfo
    req.userId = userId
    req.userEmail = userEmail

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = verifyJWT
