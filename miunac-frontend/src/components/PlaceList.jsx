import { useMap } from 'react-leaflet'

function PlaceList({ places }) {
  const map = useMap()

  const handleFly = (place) => {
    const lat = place.latitude ?? place.lat ?? place.location?.coordinates?.[1]
    const lon = place.longitude ?? place.lon ?? place.location?.coordinates?.[0]
    if (!lat || !lon) return
    map.flyTo([lat, lon], 18, { duration: 0.75 })
  }

  return (
    <div className="place-list card">
      <h3>Lugares</h3>
      <div className="place-items">
        {places.length === 0 && <p className="muted">No hay lugares cargados.</p>}
        {places.map((place) => (
          <button key={place.id || place.name} className="pill place-pill" onClick={() => handleFly(place)}>
            {place.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PlaceList
