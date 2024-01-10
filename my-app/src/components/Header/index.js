import {withRouter, Link} from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {Component} from 'react'

import {GrFormClose} from 'react-icons/gr'

import './index.css'

class Header extends Component {
  state = {clickMenuStatus: false}

  onClickLogOut = () => {
    const removeToken = Cookies.remove('jwt_token')
    const {history} = this.props

    if (removeToken === undefined) {
      history.replace('/login')
    }
  }

  onClickMenu = () => {
    this.setState({clickMenuStatus: true})
  }

  onClickCloseMenu = () => {
    this.setState({clickMenuStatus: false})
  }

  showMenuDetails = () => (
    <nav>
      <ul className="header-list">
        <li className="header-option">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="header-option">
          <Link to="/shelf" className="nav-link">
            Bookshelves
          </Link>
        </li>

        <li className="header-option">
          <button
            type="button"
            className="logout-btn"
            onClick={this.onClickLogOut}
          >
            Logout
          </button>
        </li>
        <li>
          <GrFormClose onClick={this.onClickCloseMenu} className="close-icon" />
        </li>
      </ul>
    </nav>
  )

  render() {
    const {clickMenuStatus} = this.state
    return (
      <div>
        <div className="header-container">
          <Link to="/" className="nav-link logo-image">
            <img
              src="https://res.cloudinary.com/db0f83m76/image/upload/v1700136140/Group_7732_kkg2j0.jpg"
              alt="website logo"
              className="logo-image"
            />
          </Link>
          <nav className="wrap-container">
            <ul className="header-list">
              <li className="header-option">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="header-option">
                <Link to="/shelf" className="nav-link">
                  Bookshelves
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-btn"
              onClick={this.onClickLogOut}
            >
              Logout
            </button>
          </nav>
        </div>
        <div className="mobile-header-container">
          <div className="header-logo-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/db0f83m76/image/upload/v1700136140/Group_7732_kkg2j0.jpg"
                alt="website logo"
                className="logo-image"
              />
            </Link>
          </div>

          <div>
            <AiOutlineMenu onClick={this.onClickMenu} className="menu-logo" />
          </div>
        </div>
        {clickMenuStatus && this.showMenuDetails()}
      </div>
    )
  }
}

export default withRouter(Header)
