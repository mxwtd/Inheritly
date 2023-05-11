import axios from 'axios'
const API_URL = '/'

export const getAllProperties = async () => {
  const response = await axios.get(`${API_URL}api/properties`)
  return response.data
}

export const getPropertyById = async (id) => {
  const response = await axios.get(`${API_URL}api/properties/${id}`)
  return response.data
}

export const createProperty = async (newProperty) => {
  const response = await axios.post(`${API_URL}api/properties`, newProperty)
  return response.data
}
