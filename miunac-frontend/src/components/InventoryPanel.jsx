import { useState } from 'react'

function InventoryPanel({ items, onPublish }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', category: '', description: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onPublish(form.name, form.category, form.description)
    setForm({ name: '', category: '', description: '' })
    setShowForm(false)
  }

  return (
    <div className="inventory card">
      <div className="panel-header">
        <div>
          <h3>Inventario</h3>
          <p className="muted">Cosas que la comunidad comparte</p>
        </div>
        <button className="btn-secondary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cerrar' : '+ Publicar ítem'}
        </button>
      </div>

      {showForm && (
        <form className="inventory-form" onSubmit={handleSubmit}>
          <label className="form-label">Nombre</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <label className="form-label">Categoría</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <label className="form-label">Descripción</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <button className="btn-primary" type="submit">Publicar</button>
        </form>
      )}

      <div className="inventory-list">
        {items.length === 0 && <p className="muted">Aún no hay ítems publicados.</p>}
        {items.map((item) => (
          <div key={item.id || item.name} className="inventory-item">
            <div>
              <strong>{item.name}</strong>
              <p className="muted small">{item.category || 'General'}</p>
            </div>
            <p className="inventory-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InventoryPanel
