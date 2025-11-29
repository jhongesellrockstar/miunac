import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAppStore()
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
  e.preventDefault();

  // 🚧 Login simulado: acepta cualquier código UNAC y contraseña
  // Más adelante conectaremos esto al backend de Django.
  if (!code || !password) {
    alert("Por favor ingresa código UNAC y contraseña.");
    return;
  }

  // Guardamos algo mínimo en el store / localStorage si se usa
  try {
    localStorage.setItem(
      "miunac_user",
      JSON.stringify({
        code,
        name: "Usuario MiUNAC",
      })
    );
  } catch (err) {
    console.warn("No se pudo guardar en localStorage:", err);
  }

  // Redirige a la pantalla principal (ajusta si tu ruta principal es otra)
  navigate("/");
};


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
