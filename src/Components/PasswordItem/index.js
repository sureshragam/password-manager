import './index.css'

const stars =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

function PasswordItem(props) {
  const {passwordDetails, showPassword, onDeletePassword, id} = props
  const {website, username, password} = passwordDetails
  const onDelete = () => {
    onDeletePassword(id)
  }
  return (
    <li>
      <div className="profile">
        <p>{website.charAt(0)}</p>
      </div>
      <div className="content">
        <p>{website}</p>
        <p>{username}</p>
        {showPassword ? <p>{password}</p> : <img src={stars} alt="stars" />}
      </div>
      <button type="button" onClick={onDelete} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
