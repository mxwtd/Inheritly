import axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/login'

export const login = async (credentials) => {
  const { data } = await axios.post(BASE_URL, credentials)
  return data
}
