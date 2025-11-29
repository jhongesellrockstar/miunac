import { useState } from 'react'

const InventoryPanel = ({ items, onAddItem }) => {
  const [form, setForm] = useState({ name: '', category: '', description: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name) return
    onAddItem(form)
    setForm({ name: '', category: '', description: '' })
  }

  return (
    <div className="panel-card scrollable">
      <div className="header-row">
        <h3>Mi Inventario</h3>
        <span className="pill ghost small">{items?.length || 0} ítems</span>
      </div>
      <div className="stacked">
        {items?.map((item) => (
          <div key={item.id || item.name} className="list-row">
            <span className="icon-circle ghost">🎒</span>
            <div className="list-content">
              <strong>{item.name}</strong>
              <p className="muted tiny">{item.category}</p>
              {item.description && <p className="tiny">{item.description}</p>}
            </div>
          </div>
        ))}
        {(!items || items.length === 0) && <p className="muted">Aún no tienes ítems.</p>}
      </div>
      <form className="stacked form" onSubmit={handleSubmit}>
        <h4 className="muted">Agregar ítem</h4>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="Categoría"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        />
        <textarea
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
        <button className="btn" type="submit">
          Agregar ítem
        </button>
      </form>
    </div>
  )
}

export default InventoryPanel
