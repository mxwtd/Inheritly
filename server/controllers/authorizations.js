const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const loginUser = async (req, res, next) => {
  try {
    const { body } = req
    const { email, password } = body

    const user = await User.findOne({ email })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      const error = new Error('invalid username or password')
      error.name = 'InvalidCredentials'
      return next(error)
    }

    const userForToken = {
      id: user._id,
      username: user.email
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET_KEY,
      // { expiresIn: 60 * 60 }
      { expiresIn: 60 * 2 }
    )

    res.status(200).send({
      name: user.name,
      email: user.email,
      token
    }).end()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  loginUser
}
