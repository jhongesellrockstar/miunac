import { useEffect, useMemo, useRef } from 'react'
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap
} from 'react-leaflet'
import L from 'leaflet'

const CAMPUS_CENTER = { lat: -12.06135, lon: -77.15656, zoom: 17 }

const createPlaceIcon = (category) =>
  L.divIcon({
    className: 'marker-icon place',
    html: `<div class="place-dot ${category || 'default'}"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28]
  })

const statusIcon = L.divIcon({
  className: 'marker-icon status',
  html: '<div class="status-bubble">💬</div>',
  iconSize: [36, 36],
  iconAnchor: [18, 34]
})

const createAvatarIcon = (sprite) =>
  L.icon({
    iconUrl:
      sprite ||
      'https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/132.png',
    iconSize: [42, 42],
    iconAnchor: [21, 38],
    popupAnchor: [0, -24]
  })

const MapUpdater = ({ center }) => {
  const map = useMap()
  const initial = useRef(false)

  useEffect(() => {
    if (!center) return
    if (!initial.current) {
      map.setView([center.lat, center.lon], CAMPUS_CENTER.zoom)
      initial.current = true
      return
    }
    map.flyTo([center.lat, center.lon], map.getZoom(), { duration: 0.5 })
  }, [center, map])

  return null
}

const MapView = ({ places, liveStatuses, currentUser, currentLocation, onMapReady }) => {
  const position = currentLocation || { lat: CAMPUS_CENTER.lat, lon: CAMPUS_CENTER.lon }

  const userIcon = useMemo(() => createAvatarIcon(currentUser?.avatar_sprite), [
    currentUser?.avatar_sprite
  ])

  return (
    <div className="map-shell">
      <MapContainer
        center={[CAMPUS_CENTER.lat, CAMPUS_CENTER.lon]}
        zoom={CAMPUS_CENTER.zoom}
        className="map"
        whenCreated={onMapReady}
      >
        <MapUpdater center={position} />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Carto Dark">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Carto Voyager">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          </LayersControl.BaseLayer>
        </LayersControl>

        {places?.map((place) => (
          <Marker
            key={place.id || place.name}
            position={[place.latitude || place.lat, place.longitude || place.lon]}
            icon={createPlaceIcon(place.category)}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              <span className="muted tiny">{place.category || 'Lugar'}</span>
            </Popup>
          </Marker>
        ))}

        {liveStatuses?.map((status) => (
          <Marker
            key={status.id || `${status.nickname}-${status.message}`}
            position={[status.latitude || status.lat, status.longitude || status.lon]}
            icon={statusIcon}
          >
            <Popup>
              <div className="status-popup">
                <strong>{status.nickname || 'Anonimo'}</strong>
                <p className="status-text">{status.message}</p>
                {status.visibility && <span className="pill small">{status.visibility}</span>}
              </div>
            </Popup>
          </Marker>
        ))}

        {position && (
          <Marker position={[position.lat, position.lon]} icon={userIcon}>
            <Popup>
              <div className="status-popup">
                <strong>{currentUser?.nickname || 'Yo'}</strong>
                <p className="muted tiny">Tu ubicación actual</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default MapView
