const BottomButtons = ({ onCenter, onNewStatus }) => {
  return (
    <div className="bottom-buttons">
      <button className="btn circle" onClick={onCenter} title="Centrar en mi ubicación">
        📍
      </button>
      <button className="btn primary" onClick={onNewStatus}>
        Publicar estado
      </button>
    </div>
  )
}

export default BottomButtons
