function FloatingActionButton({ open, onToggle }) {
  return (
    <button className="fab" onClick={onToggle} aria-label="Abrir paneles">
      {open ? '✕' : '＋'}
    </button>
  )
}

export default FloatingActionButton
