const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const login = async (req, res, next) => {
  try {
    const { body } = req
    const { email, password } = body

    const user = await User.findOne({ email }).exec()

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if ((!(user && passwordCorrect))) {
      const error = new Error('invalid email or password')
      error.name = 'InvalidCredentials'
      return next(error)
    }

    const { email: userEmail, _id: userId, name, username, lastNames } = user

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          email: user.email
        }
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '1m' }
    )

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: '2m' }
    )

    const cookieUserData = {
      refreshToken,
      userEmail,
      name,
      lastNames,
      username
    }

    res.cookie('jwt', cookieUserData, {
      httpOnly: true, // accessible only by web server
      secure: true, // https
      sameSite: 'None', // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiry: set to match rT
    })

    res.json({
      accessToken,
      userEmail,
      userId,
      name,
      lastNames,
      username
    })
  } catch (error) {
    next(error)
  }
}

const refresh = async (req, res, next) => {
  try {
    const cookie = req.cookies

    if (!cookie?.jwt) {
      const error = new Error('token is missing')
      error.name = 'JsonWebTokenError'
      return next(error)
    }

    const refreshToken = cookie.jwt

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      async (err, decoded) => {
        if (err) {
          const error = new Error('Forbidden token')
          error.name = 'Forbidden'
          return next(error)
        }

        const user = await User.findOne({ email: decoded.email }).exec()

        if (!user) {
          const error = new Error('invalid email or password')
          error.name = 'InvalidCredentials'
          return next(error)
        }

        const { email: userEmail, _id: userId, name, username, lastNames } = user

        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: user._id,
              email: user.email
            }
          },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: '1m' }
        )

        res.json({
          accessToken,
          userEmail,
          userId,
          name,
          lastNames,
          username
        })
      })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies
    if (!cookies?.jwt) {
      next(res.status(204))
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  refresh,
  logout
}
