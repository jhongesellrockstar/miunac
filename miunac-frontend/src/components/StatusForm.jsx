import { useState } from 'react'

function StatusForm({ onPublish, defaultRadius = 300, lastQuery }) {
  const [message, setMessage] = useState('')
  const [radius, setRadius] = useState(defaultRadius)
  const [manualCoords, setManualCoords] = useState({ lat: '', lon: '' })
  const [needManual, setNeedManual] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const sendStatus = async (lat, lon) => {
      await onPublish(message, lat, lon, Number(radius))
      setMessage('')
    }

    if (!needManual && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await sendStatus(pos.coords.latitude, pos.coords.longitude)
          setIsSubmitting(false)
        },
        async () => {
          setNeedManual(true)
          setIsSubmitting(false)
        }
      )
      return
    }

    if (manualCoords.lat && manualCoords.lon) {
      await sendStatus(Number(manualCoords.lat), Number(manualCoords.lon))
    }

    setIsSubmitting(false)
  }

  return (
    <form className="status-form card" onSubmit={handleSubmit}>
      <h3>Publicar estado</h3>
      <label className="form-label">Mensaje</label>
      <textarea
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Estoy en la biblioteca y hay enchufes libres..."
        required
      />

      <label className="form-label">Radio de alcance</label>
      <select value={radius} onChange={(e) => setRadius(e.target.value)}>
        <option value={100}>100 m</option>
        <option value={300}>300 m</option>
        <option value={500}>500 m</option>
      </select>

      {(needManual || !navigator.geolocation) && (
        <div className="manual-coords">
          <label className="form-label">Latitud</label>
          <input
            type="number"
            step="0.0001"
            value={manualCoords.lat}
            onChange={(e) => setManualCoords({ ...manualCoords, lat: e.target.value })}
            placeholder={lastQuery?.lat}
          />
          <label className="form-label">Longitud</label>
          <input
            type="number"
            step="0.0001"
            value={manualCoords.lon}
            onChange={(e) => setManualCoords({ ...manualCoords, lon: e.target.value })}
            placeholder={lastQuery?.lon}
          />
        </div>
      )}

      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Publicando...' : 'Publicar estado'}
      </button>
    </form>
  )
}

export default StatusForm
