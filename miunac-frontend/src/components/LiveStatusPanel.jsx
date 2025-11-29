import { useMemo } from 'react'

const toRad = (value) => (value * Math.PI) / 180

const distanceMeters = (origin, target) => {
  if (!origin || !target) return null
  const R = 6371e3
  const φ1 = toRad(origin.lat)
  const φ2 = toRad(target.lat)
  const Δφ = toRad(target.lat - origin.lat)
  const Δλ = toRad(target.lon - origin.lon)

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

const formatDistance = (meters) => {
  if (meters === null || meters === undefined) return '¿distancia?'
  if (meters < 1000) return `${meters} m`
  return `${(meters / 1000).toFixed(1)} km`
}

const LiveStatusPanel = ({ liveStatuses, currentLocation }) => {
  const sorted = useMemo(() => {
    return [...(liveStatuses || [])]
      .map((status) => ({
        ...status,
        distance: distanceMeters(currentLocation, {
          lat: status.latitude || status.lat,
          lon: status.longitude || status.lon
        })
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
  }, [currentLocation, liveStatuses])

  return (
    <div className="panel-card scrollable">
      <div className="header-row">
        <h3>Estados en Vivo</h3>
        <span className="pill small">{sorted.length}</span>
      </div>
      <div className="stacked">
        {sorted.map((status) => (
          <div key={status.id || status.message} className="status-row">
            <div className="avatar-circle">{status.nickname?.[0] || 'U'}</div>
            <div className="list-content">
              <div className="header-row">
                <strong>{status.nickname || 'Anónimo'}</strong>
                {status.visibility && <span className="pill tiny">{status.visibility}</span>}
              </div>
              <p className="status-text">{status.message}</p>
              <p className="muted tiny">{formatDistance(status.distance)}</p>
            </div>
          </div>
        ))}
        {sorted.length === 0 && <p className="muted">Sin estados cercanos.</p>}
      </div>
    </div>
  )
}

export default LiveStatusPanel
