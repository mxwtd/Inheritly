const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  console.log('token from verify JWT: ', token)

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_KEY,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })
      req.user = decoded.UserInfo.email
      req.userId = decoded.UserInfo.id
      next()
    }
  )
}

module.exports = verifyJWT
