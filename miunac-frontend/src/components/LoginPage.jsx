import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import useAppStore from '../store/useAppStore'

const LoginPage = () => {
  const navigate = useNavigate()
  const { setSession } = useAppStore()
  const [codigoUnac, setCodigoUnac] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(codigoUnac, password)
      await setSession(codigoUnac, password)
      navigate('/')
    } catch (err) {
      const message =
        err.response?.data?.detail || err.message ||
        'No se pudo iniciar sesión. Intenta nuevamente.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="auth-screen">
      <div className="auth-card glass">
        <p className="muted tiny">MiUNAC</p>
        <h2>Inicio de sesión</h2>
        <form className="stacked" onSubmit={handleSubmit}>
          <label className="muted tiny">Código UNAC</label>
          <input
            value={codigoUnac}
            onChange={(e) => setCodigoUnac(e.target.value)}
            required
          />
          <label className="muted tiny">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
          {error && <p className="miunac-login-error">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginPage
