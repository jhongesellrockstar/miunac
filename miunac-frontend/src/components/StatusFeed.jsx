import classNames from 'classnames'

const getApproxLocation = (status) => {
  if (status.near_place) return `Cerca de ${status.near_place}`
  if (status.place_name) return `Cerca de ${status.place_name}`
  if (status.latitude && status.longitude) return `${status.latitude.toFixed(4)}, ${status.longitude.toFixed(4)}`
  return 'Ubicación no especificada'
}

function StatusFeed({ statuses, onRefresh }) {
  const sorted = [...statuses].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  return (
    <div className="status-feed card">
      <div className="panel-header">
        <div>
          <h3>Estados en vivo</h3>
          <p className="muted">Lo que está pasando ahora mismo en el campus</p>
        </div>
        {onRefresh && (
          <button className="btn-secondary" onClick={onRefresh}>
            Refrescar
          </button>
        )}
      </div>

      {sorted.length === 0 && (
        <p className="muted empty-text">
          Aún nadie ha publicado su estado. ¡Sé la primera persona en aparecer en el mapa!
        </p>
      )}

      <div className="status-list">
        {sorted.map((status) => (
          <div key={status.id || status.created_at} className="status-card">
            <div className="status-card-header">
              <div className="avatar">
                {(status.nickname || 'N')[0]}
              </div>
              <div>
                <strong>{status.nickname || 'Estudiante anónimo'}</strong>
                <p className="muted small">{getApproxLocation(status)}</p>
              </div>
              <span className={classNames('pill', status.visibility)}>{status.visibility || 'public'}</span>
            </div>
            <p className="status-message">{status.message}</p>
            {status.created_at && (
              <p className="muted tiny">{new Date(status.created_at).toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusFeed
