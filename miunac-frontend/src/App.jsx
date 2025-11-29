import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import BottomButtons from './components/BottomButtons'
import LoginPage from './components/LoginPage'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'
import useAppStore from './store/useAppStore'

const CAMPUS_CENTER = { lat: -12.06135, lon: -77.15656, zoom: 17 }

const MainApp = () => {
  const mapRef = useRef(null)
  const navigate = useNavigate()
  const {
    isLogged,
    user,
    places,
    liveStatuses,
    currentLocation,
    setCurrentLocation,
    loadPlaces,
    loadItems,
    addLiveStatus,
    loadLiveStatuses,
    loadProfile
  } = useAppStore()

  useEffect(() => {
    if (!navigator.geolocation) {
      setCurrentLocation({ lat: CAMPUS_CENTER.lat, lon: CAMPUS_CENTER.lon })
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      },
      () => setCurrentLocation({ lat: CAMPUS_CENTER.lat, lon: CAMPUS_CENTER.lon })
    )
  }, [setCurrentLocation])

  useEffect(() => {
    if (!isLogged) return
    loadProfile()
    loadPlaces()
    loadItems()
  }, [isLogged, loadItems, loadPlaces, loadProfile])

  useEffect(() => {
    if (!isLogged) return
    const { lat, lon } = currentLocation || CAMPUS_CENTER
    loadLiveStatuses(lat, lon, 200)
    const interval = setInterval(() => loadLiveStatuses(lat, lon, 200), 5000)
    return () => clearInterval(interval)
  }, [currentLocation, isLogged, loadLiveStatuses])

  const handleFocusPlace = (place) => {
    if (!place || !mapRef.current) return
    mapRef.current.setView([place.latitude || place.lat, place.longitude || place.lon], 18, {
      animate: true
    })
  }

  const handleCenter = () => {
    const target = currentLocation || CAMPUS_CENTER
    if (mapRef.current) {
      mapRef.current.flyTo([target.lat, target.lon], CAMPUS_CENTER.zoom)
    }
  }

  const handleNewStatus = async () => {
    const message = prompt('¿Qué está pasando en el campus?')
    if (!message) return
    const coords = currentLocation || CAMPUS_CENTER
    await addLiveStatus(message, coords.lat, coords.lon)
  }

  useEffect(() => {
    if (!isLogged) navigate('/login')
  }, [isLogged, navigate])

  return (
    <div className="app-layout">
      <Sidebar onFocusPlace={handleFocusPlace} currentLocation={currentLocation} />
      <main className="main-panel">
        <MapView
          places={places}
          liveStatuses={liveStatuses}
          currentUser={user}
          currentLocation={currentLocation}
          onMapReady={(map) => (mapRef.current = map)}
        />
        <BottomButtons onCenter={handleCenter} onNewStatus={handleNewStatus} />
      </main>
    </div>
  )
}

const ProtectedRoute = () => {
  const { isLogged } = useAppStore()
  return isLogged ? <MainApp /> : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<ProtectedRoute />} />
    </Routes>
  )
}

export default App
