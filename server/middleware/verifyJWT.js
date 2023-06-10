const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  console.log('authHeader is:', authHeader)

  if (!authHeader?.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_KEY,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })

      req.email = decoded.UserInfo.email
      req.userId = decoded.UserInfo.id
      next()
    }
  )
}

module.exports = verifyJWT
