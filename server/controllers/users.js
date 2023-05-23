const bcrypt = require('bcrypt')
const User = require('../models/User')

// usersRouter.get('/', async (request, response) => {
//   const users = await User.find({}).populate('reviews', { title: 1, content: 1, date: 1, important: 1 })
//   response.json(users)
// })

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  const { email, username, password, question, answer, name, lastNames, profilePhoto } = req.body
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      email,
      username,
      passwordHash,
      question,
      answer,
      name,
      lastNames,
      profilePhoto
    })

    await user.validate()

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found.' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { email, username, passwordHash, question, name, lastNames, profilePhoto } = req.body
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        email,
        username,
        passwordHash,
        question,
        name,
        lastNames,
        profilePhoto
      },
      { new: true }
    )
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found.' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    if (user) {
      res.status(204).json({ message: 'User deleted successfully.' })
    } else {
      res.status(404).json({ error: 'User not found.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
}
