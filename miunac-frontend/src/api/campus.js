import { create } from 'zustand'
import client from './client'

export const getHealth = () => client.get('/api/health/')
export const getPlaces = () => client.get('/api/campus/places/')
export const getStatuses = (params = {}) =>
  client.get('/api/campus/statuses/', { params })
export const createStatus = (payload) => client.post('/api/campus/statuses/', payload)
export const getInventory = () => client.get('/api/campus/items/')
export const createItem = (payload) => client.post('/api/campus/items/', payload)

export const useCampusStore = create((set, get) => ({
  places: [],
  statuses: [],
  inventory: [],
  isLoading: false,
  error: null,

  fetchPlaces: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await getPlaces()
      set({ places: data, isLoading: false })
    } catch (err) {
      set({ error: 'No se pudieron cargar los lugares.', isLoading: false })
    }
  },

  fetchStatusesNearby: async (lat, lon, radius = 300) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await getStatuses({ lat, lon, radius })
      set({ statuses: data, isLoading: false })
    } catch (err) {
      set({ error: 'No se pudieron cargar los estados.', isLoading: false })
    }
  },

  fetchInventory: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await getInventory()
      set({ inventory: data, isLoading: false })
    } catch (err) {
      set({ error: 'No se pudo cargar el inventario.', isLoading: false })
    }
  },

  publishStatus: async (message, lat, lon, radius = 300) => {
    try {
      await createStatus({ message, latitude: lat, longitude: lon, radius })
    } catch (err) {
      set({ error: 'No se pudo publicar el estado.' })
      throw err
    }
  },

  publishItem: async (name, category, description) => {
    try {
      await createItem({ name, category, description })
    } catch (err) {
      set({ error: 'No se pudo publicar el ítem.' })
      throw err
    }
  }
}))
