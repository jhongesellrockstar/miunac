import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import { useCampusStore } from './api/campus'

const DEFAULT_CENTER = {
  lat: -12.0625,
  lon: -77.135
}

function App() {
  const {
    places,
    statuses,
    inventory,
    isLoading,
    error,
    fetchPlaces,
    fetchStatusesNearby,
    fetchInventory,
    publishStatus,
    publishItem
  } = useCampusStore()

  const [lastQuery, setLastQuery] = useState({
    lat: DEFAULT_CENTER.lat,
    lon: DEFAULT_CENTER.lon,
    radius: 300
  })

  useEffect(() => {
    fetchPlaces()
    fetchInventory()
  }, [fetchPlaces, fetchInventory])

  useEffect(() => {
    if (!navigator.geolocation) {
      fetchStatusesNearby(DEFAULT_CENTER.lat, DEFAULT_CENTER.lon, lastQuery.radius)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        setLastQuery((prev) => ({ ...prev, lat, lon }))
        fetchStatusesNearby(lat, lon, lastQuery.radius)
      },
      () => {
        fetchStatusesNearby(DEFAULT_CENTER.lat, DEFAULT_CENTER.lon, lastQuery.radius)
      }
    )
  }, [fetchStatusesNearby, lastQuery.radius])

  const handleRefreshStatuses = (lat, lon, radius) => {
    setLastQuery({ lat, lon, radius })
    fetchStatusesNearby(lat, lon, radius)
  }

  const handlePublishStatus = async (message, lat, lon, radius) => {
    await publishStatus(message, lat, lon, radius)
    handleRefreshStatuses(lat, lon, radius)
  }

  const handlePublishItem = async (name, category, description) => {
    await publishItem(name, category, description)
    fetchInventory()
  }

  return (
    <Layout
      places={places}
      statuses={statuses}
      inventory={inventory}
      isLoading={isLoading}
      error={error}
      onRefreshStatuses={handleRefreshStatuses}
      onPublishStatus={handlePublishStatus}
      onPublishItem={handlePublishItem}
      defaultCenter={DEFAULT_CENTER}
      lastQuery={lastQuery}
    />
  )
}

export default App
