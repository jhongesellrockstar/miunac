import { useState } from 'react'
import InventoryPanel from './InventoryPanel'
import LiveStatusPanel from './LiveStatusPanel'
import PlacesPanel from './PlacesPanel'
import ProfilePanel from './ProfilePanel'
import useAppStore from '../store/useAppStore'

const Sidebar = ({ onFocusPlace, currentLocation }) => {
  const { places, items, liveStatuses } = useAppStore()
  const [active, setActive] = useState('perfil')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div>
          <p className="muted tiny">MiUNAC</p>
          <h2>Mapa Vivo</h2>
        </div>
        <button className="btn ghost" onClick={() => setCollapsed((v) => !v)}>
          {collapsed ? '≫' : '≪'}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="tabs">
            <button className={active === 'perfil' ? 'active' : ''} onClick={() => setActive('perfil')}>
              Mi Perfil
            </button>
            <button className={active === 'lugares' ? 'active' : ''} onClick={() => setActive('lugares')}>
              Lugares
            </button>
            <button className={active === 'inventario' ? 'active' : ''} onClick={() => setActive('inventario')}>
              Inventario
            </button>
            <button className={active === 'estados' ? 'active' : ''} onClick={() => setActive('estados')}>
              En Vivo
            </button>
          </div>

          {active === 'perfil' && <ProfilePanel />}
          {active === 'lugares' && <PlacesPanel places={places} onFocusPlace={onFocusPlace} />}
          {active === 'inventario' && (
            <InventoryPanel
              items={items}
              onAddItem={(item) => {
                useAppStore.getState().addItem(item)
              }}
            />
          )}
          {active === 'estados' && (
            <LiveStatusPanel liveStatuses={liveStatuses} currentLocation={currentLocation} />
          )}
        </>
      )}
    </aside>
  )
}

export default Sidebar
