import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const appLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'

const usernameLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'

const passwordLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'

const passwordManagerImgL =
  'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'

const noPasswordLogo =
  'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png '

const search =
  'https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    showPassword: false,
    searchInput: '',
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  onUserChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onDeletePassword = id => {
    this.setState(prevState => {
      const filteredList = prevState.passwordList.filter(
        eachPassword => eachPassword.id !== id,
      )
      return {passwordList: filteredList}
    })
  }

  onAddPassword = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const id = uuidV4()
    this.setState(prevState => {
      const passwordObj = {id, website, username, password}
      return {
        passwordList: [...prevState.passwordList, passwordObj],
        website: '',
        username: '',
        password: '',
      }
    })
  }

  toggleShowPasswords = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSearch = event => {
    const {value} = event.target
    this.setState({searchInput: value})
  }

  render() {
    const {
      passwordList,
      website,
      username,
      password,
      showPassword,
      searchInput,
    } = this.state
    const filteredList = passwordList.filter(eachPassword =>
      eachPassword.website.toUpperCase().includes(searchInput.toUpperCase()),
    )
    return (
      <div className="main-container">
        <img src={appLogo} alt="app logo" />
        <div className="form-row">
          <div className="col-1">
            <h1>Add New Password</h1>
            <form onSubmit={this.onAddPassword}>
              <div>
                <img src={websiteLogo} alt="website" />
                <input
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onWebsiteChange}
                  value={website}
                />
              </div>
              <div>
                <img src={usernameLogo} alt="username" />
                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onUserChange}
                  value={username}
                />
              </div>
              <div>
                <img src={passwordLogo} alt="password" />
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onPasswordChange}
                  value={password}
                />
              </div>
              <div className="button-row">
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
          <div className="col-2">
            <img src={passwordManagerImgL} alt="password manager" />
          </div>
        </div>
        <div className="passwords-row">
          <div className="row-1">
            <div className="password-col-1">
              <h1 className="heading">Your Passwords</h1>
              <p>{passwordList.length}</p>
            </div>

            <div className="search-container">
              <img src={search} alt="search" />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearch}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="row-2">
            <input
              type="checkbox"
              id="check"
              onChange={this.toggleShowPasswords}
            />
            <label htmlFor="check">Show Passwords</label>
          </div>
          {filteredList.length < 1 ? (
            <div className="password-row-image">
              <img src={noPasswordLogo} alt="no passwords" />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul>
              {filteredList.map(eachPassword => (
                <PasswordItem
                  passwordDetails={eachPassword}
                  key={eachPassword.id}
                  id={eachPassword.id}
                  showPassword={showPassword}
                  onDeletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
