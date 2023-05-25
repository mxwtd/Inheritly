import axios from 'axios'
const API_URL = '/'

let token = null

export const setToken = (newToken) => {
  console.log('setting token', newToken)
  token = `bearer ${newToken}`
}

export const getToken = () => {
  return token
}

// export const getAllProperties = async () => {
//   const config = {
//     headers: { Authorization: token }
//   }

//   const response = await axios.get(`${API_URL}api/properties`, config)
//   return response.data
// }

export const getPropertyById = async (id) => {
  const response = await axios.get(`${API_URL}api/properties/${id}`)
  return response.data
}

export const createProperty = async (newProperty) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${API_URL}api/properties`, newProperty, config)
  return response.data
}
