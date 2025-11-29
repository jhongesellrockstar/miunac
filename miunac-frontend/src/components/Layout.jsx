import { useEffect, useState } from 'react'
import TopBar from './TopBar'
import MapView from './MapView'
import StatusFeed from './StatusFeed'
import StatusForm from './StatusForm'
import InventoryPanel from './InventoryPanel'
import FloatingActionButton from './FloatingActionButton'

function Layout({
  places,
  statuses,
  inventory,
  isLoading,
  error,
  onRefreshStatuses,
  onPublishStatus,
  onPublishItem,
  defaultCenter,
  lastQuery
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('status')

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isMobile) setPanelOpen(true)
  }, [isMobile])

  const togglePanel = () => setPanelOpen((v) => !v)
  const handleRefresh = () => onRefreshStatuses(lastQuery.lat, lastQuery.lon, lastQuery.radius)

  return (
    <div className="app-shell">
      <TopBar />
      <div className="content">
        <div className="map-column">
          <MapView places={places} statuses={statuses} center={defaultCenter} />
        </div>

        <div className={`panel-column ${panelOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
          {isMobile && (
            <div className="tab-selector card">
              <button className={activeTab === 'status' ? 'active' : ''} onClick={() => setActiveTab('status')}>
                Estados
              </button>
              <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
                Inventario
              </button>
            </div>
          )}

          {error && <div className="alert">{error}</div>}
          {isLoading && <div className="alert ghost">Cargando datos...</div>}

          {!isMobile && (
            <>
              <StatusFeed statuses={statuses} onRefresh={handleRefresh} />
              <StatusForm onPublish={onPublishStatus} lastQuery={lastQuery} />
              <InventoryPanel items={inventory} onPublish={onPublishItem} />
            </>
          )}

          {isMobile && panelOpen && activeTab === 'status' && (
            <div className="stacked">
              <StatusFeed statuses={statuses} onRefresh={handleRefresh} />
              <StatusForm onPublish={onPublishStatus} lastQuery={lastQuery} />
            </div>
          )}

          {isMobile && panelOpen && activeTab === 'inventory' && (
            <InventoryPanel items={inventory} onPublish={onPublishItem} />
          )}
        </div>
      </div>

      {isMobile && <FloatingActionButton open={panelOpen} onToggle={togglePanel} />}
    </div>
  )
}

export default Layout
