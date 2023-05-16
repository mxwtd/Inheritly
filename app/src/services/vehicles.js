import axios from 'axios'
const API_URL = '/'

let token = null

export const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export const getAllVehicles = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(`${API_URL}api/vehicles`, config)
  return response.data
}

export const getVehicleById = async (id) => {
  const response = await axios.get(`${API_URL}api/vehicles/${id}`)
  return response.data
}

export const createVehicle = async (newVehicle) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${API_URL}api/vehicles`, newVehicle, config)
  return response.data
}
