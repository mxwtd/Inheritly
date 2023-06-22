const User = require('../../models/User')
const bcrypt = require('bcrypt')

const createUser = async () => {
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({
    username: 'root',
    name: 'root',
    email: 'root@gmail.com',
    passwordHash,
    question: 'question',
    answer: 'answer',
    lastNames: 'lastNames'
  })

  await user.save()

  return `user ${user.email}`
}

module.exports = {
  createUser
}
