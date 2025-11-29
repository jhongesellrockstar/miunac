import classNames from 'classnames'
import { useMemo } from 'react'

const categoryIcon = (category = '') => {
  const normalized = category.toLowerCase()
  if (normalized.includes('lab')) return '🧪'
  if (normalized.includes('aula')) return '🏫'
  if (normalized.includes('bibli')) return '📚'
  if (normalized.includes('cafe') || normalized.includes('cafeter')) return '☕'
  return '📍'
}

const PlacesPanel = ({ places, onFocusPlace }) => {
  const sortedPlaces = useMemo(
    () => [...(places || [])].sort((a, b) => a.name.localeCompare(b.name)),
    [places]
  )

  return (
    <div className="panel-card scrollable">
      <h3>Lugares del Campus</h3>
      {sortedPlaces.map((place) => (
        <button
          key={place.id || place.name}
          className={classNames('list-row', 'ghost')}
          onClick={() => onFocusPlace(place)}
        >
          <span className="icon-circle">{categoryIcon(place.category)}</span>
          <div className="list-content">
            <strong>{place.name}</strong>
            <p className="muted tiny">{place.category || 'Lugar'}</p>
          </div>
        </button>
      ))}
      {sortedPlaces.length === 0 && <p className="muted">No hay lugares cargados.</p>}
    </div>
  )
}

export default PlacesPanel
