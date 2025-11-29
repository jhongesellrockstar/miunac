import apiClient from './client'

export async function login({ codigoUnac, password }) {
  const response = await apiClient.post('/api/login/', {
    codigo_unac: codigoUnac,
    password
  })
  return response.data
}
