import useAppStore from '../store/useAppStore'

const ProfilePanel = () => {
  const { user, saveProfile } = useAppStore()

  const handleEdit = () => {
    const nickname = prompt('Nuevo nickname', user?.nickname || '')
    if (nickname) {
      saveProfile({ nickname })
    }
  }

  if (!user) return <p className="muted">Sin perfil cargado.</p>

  return (
    <div className="panel-card">
      <div className="profile-header">
        <img
          src={
            user.avatar_sprite ||
            'https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/132.png'
          }
          alt="avatar"
          className="avatar-img"
        />
        <div>
          <p className="muted tiny">Código UNAC</p>
          <h3>{user.code || '000000'}</h3>
          <p className="muted">{user.nickname || 'Estudiante UNAC'}</p>
        </div>
      </div>
      <div className="chips">
        {(user.skills || []).map((skill) => (
          <span key={skill} className="pill small">
            {skill}
          </span>
        ))}
      </div>
      <div className="chips">
        {(user.interests || []).map((interest) => (
          <span key={interest} className="pill ghost small">
            {interest}
          </span>
        ))}
      </div>
      <button className="btn" onClick={handleEdit}>
        Editar perfil
      </button>
    </div>
  )
}

export default ProfilePanel
