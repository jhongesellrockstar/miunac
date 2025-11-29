import { create } from 'zustand'
import {
  createItem,
  createStatus,
  getItems,
  getMyProfile,
  getNearbyStatuses,
  getPlaces,
  updateProfile
} from '../api/client'
import { login } from '../api/auth'

const CAMPUS_CENTER = { lat: -12.06135, lon: -77.15656 }

export const useAppStore = create((set, get) => ({
  isLogged: false,
  user: null,
  places: [],
  items: [],
  liveStatuses: [],
  currentLocation: CAMPUS_CENTER,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setPlaces: (places) => set({ places }),
  setItems: (items) => set({ items }),
  setLiveStatuses: (liveStatuses) => set({ liveStatuses }),
  setCurrentLocation: (coords) => set({ currentLocation: coords }),

  setSession: async (codigo_unac, password, profile = null) => {
    const sessionData = profile ?? (await login(codigo_unac, password))
    const userProfile = sessionData?.user ?? sessionData ?? {}
    set({ isLogged: true, user: { ...userProfile, codigo_unac } })
    return sessionData
  },

  logout: () => set({ isLogged: false, user: null }),

  loadProfile: async () => {
    try {
      const response = await getMyProfile()
      const data = response?.data
      if (Array.isArray(data) && data.length > 0) {
        set({ user: data[0], isLogged: true })
      } else if (data) {
        set({ user: data, isLogged: true })
      }
    } catch (error) {
      console.warn('No se pudo cargar el perfil, usando perfil local', error)
    }
  },

  saveProfile: async (payload) => {
    const { user } = get()
    const merged = { ...user, ...payload }
    try {
      await updateProfile(merged)
      set({ user: merged })
    } catch (error) {
      console.warn('No se pudo actualizar el perfil en el backend', error)
      set({ user: merged })
    }
  },

  loadPlaces: async () => {
    try {
      const { data } = await getPlaces()
      set({ places: data })
    } catch (error) {
      console.error('Error cargando lugares', error)
    }
  },

  loadItems: async () => {
    try {
      const { data } = await getItems()
      set({ items: data })
    } catch (error) {
      console.error('Error cargando inventario', error)
    }
  },

  addItem: async (item) => {
    try {
      await createItem(item)
      await get().loadItems()
    } catch (error) {
      console.error('No se pudo crear ítem', error)
    }
  },

  loadLiveStatuses: async (lat, lon, radius = 200) => {
    try {
      const { data } = await getNearbyStatuses(lat, lon, radius)
      set({ liveStatuses: data })
    } catch (error) {
      console.error('Error cargando estados en vivo', error)
    }
  },

  addLiveStatus: async (message, lat, lon) => {
    try {
      await createStatus(message, lat, lon)
      await get().loadLiveStatuses(lat, lon)
    } catch (error) {
      console.error('No se pudo publicar estado', error)
    }
  }
}))

export default useAppStore
