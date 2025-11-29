import { useEffect, useState } from 'react'
import { getHealth } from '../api/campus'
import logo from '../assets/logo-miunac.svg'

const Indicator = ({ online }) => (
  <div className="status-indicator">
    <span className={`dot ${online ? 'online' : 'offline'}`}></span>
    <span>{online ? 'Online' : 'Offline'}</span>
  </div>
)

function TopBar() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await getHealth()
        setOnline(true)
      } catch (err) {
        setOnline(false)
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 20000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="topbar card">
      <div className="topbar-left">
        <img src={logo} alt="MiUNAC" className="logo" />
        <div>
          <h1>MiUNAC</h1>
          <p className="muted">Mapa vivo del campus</p>
        </div>
      </div>
      <Indicator online={online} />
    </header>
  )
}

export default TopBar
