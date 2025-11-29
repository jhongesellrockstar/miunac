import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import PlaceList from './PlaceList'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet's default icon path when bundling with Vite
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const visibilityColors = {
  public: '#22c55e',
  friends: '#3b82f6',
  private: '#f59e0b'
}

const placeEmoji = {
  facultad: '🏛️',
  biblioteca: '📚',
  comedor: '🍽️',
  laboratorio: '🧪',
  deporte: '🏟️'
}

const getStatusIcon = (visibility = 'public') =>
  L.divIcon({
    className: 'status-icon',
    html: `<div style="background:${visibilityColors[visibility] || '#22c55e'}"></div>`,
    iconSize: [24, 24]
  })

const getPlaceIcon = (type = 'default') =>
  L.divIcon({
    className: 'place-icon',
    html: `<div>${placeEmoji[type] || '📍'}</div>`,
    iconSize: [28, 28]
  })

function MapView({ places, statuses, center }) {
  return (
    <div className="map-wrapper card">
      <MapContainer center={[center.lat, center.lon]} zoom={17} scrollWheelZoom className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => {
          const lat = place.latitude ?? place.lat ?? place.location?.coordinates?.[1]
          const lon = place.longitude ?? place.lon ?? place.location?.coordinates?.[0]
          if (!lat || !lon) return null
          return (
            <Marker key={place.id || place.name} position={[lat, lon]} icon={getPlaceIcon(place.type || place.category)}>
              <Popup>
                <div>
                  <strong>{place.name}</strong>
                  {place.description && <p className="muted">{place.description}</p>}
                </div>
              </Popup>
            </Marker>
          )
        })}

        {statuses.map((status) => {
          const lat = status.latitude ?? status.lat ?? status.location?.coordinates?.[1]
          const lon = status.longitude ?? status.lon ?? status.location?.coordinates?.[0]
          if (!lat || !lon) return null
          const visibility = status.visibility || status.scope || 'public'
          return (
            <Marker key={status.id || status.created_at} position={[lat, lon]} icon={getStatusIcon(visibility)}>
              <Popup>
                <div className="status-popup">
                  <div className="status-popup-header">
                    <span className="pill small">{visibility}</span>
                    <strong>{status.nickname || 'Estudiante'}</strong>
                  </div>
                  <p>{status.message}</p>
                  {status.expires_at && <p className="muted">Expira: {new Date(status.expires_at).toLocaleTimeString()}</p>}
                </div>
              </Popup>
            </Marker>
          )
        })}

        <PlaceList places={places} />
      </MapContainer>
    </div>
  )
}

export default MapView
