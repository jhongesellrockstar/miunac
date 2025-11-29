import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  }
)

export const getMyProfile = () => api.get('/campus/profiles/')
export const updateProfile = (payload) => api.put('/campus/profiles/', payload)
export const getPlaces = () => api.get('/campus/places/')
export const getItems = () => api.get('/campus/items/')
export const createItem = (payload) => api.post('/campus/items/', payload)
export const getNearbyStatuses = (lat, lon, radius) =>
  api.get('/campus/statuses/nearby/', { params: { lat, lon, radius } })
export const createStatus = (message, lat, lon) =>
  api.post('/campus/statuses/', { message, latitude: lat, longitude: lon })

export default api
