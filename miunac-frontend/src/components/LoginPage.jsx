import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAppStore()
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(code, password)
    navigate('/')
  }

  return (
    <div className="auth-screen">
      <div className="auth-card glass">
        <p className="muted tiny">MiUNAC</p>
        <h2>Inicio de sesión</h2>
        <form className="stacked" onSubmit={handleSubmit}>
          <label className="muted tiny">Código UNAC</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} required />
          <label className="muted tiny">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn primary" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
