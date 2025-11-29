import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: false
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  }
)

export const getMyProfile = () => apiClient.get('/api/campus/profiles/')
export const updateProfile = (payload) => apiClient.put('/api/campus/profiles/', payload)
export const getPlaces = () => apiClient.get('/api/campus/places/')
export const getItems = () => apiClient.get('/api/campus/items/')
export const createItem = (payload) => apiClient.post('/api/campus/items/', payload)
export const getNearbyStatuses = (lat, lon, radius) =>
  apiClient.get('/api/campus/statuses/nearby/', { params: { lat, lon, radius } })
export const createStatus = (message, lat, lon) =>
  apiClient.post('/api/campus/statuses/', { message, latitude: lat, longitude: lon })

export default apiClient
