import axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/auth/login'

export const loginRequest = async (credentials) => {
  console.log('try to log in with credentials', credentials)
  const { data } = await axios.post(BASE_URL, credentials)
  return data
}
