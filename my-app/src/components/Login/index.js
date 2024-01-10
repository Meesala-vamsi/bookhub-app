import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  submitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const requestDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(requestDetails),
    }

    const getDetails = jwtToken => {
      Cookies.set('jwt_token', jwtToken, {expires: 13})
      const {history} = this.props
      history.replace('/')
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      getDetails(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg, username, password} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/db0f83m76/image/upload/v1698385225/Ellipse_99mobile_login_image_lqggp4.png"
            className="mobile-login-image"
            alt="website login"
          />
          <img
            src="https://res.cloudinary.com/db0f83m76/image/upload/v1699326951/Rectangle_1467_kxwn8y.png"
            className="desktop-login-image"
            alt="website login"
          />
        </div>
        <div className="desktop-login-desc">
          <div className="container3">
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/db0f83m76/image/upload/v1698387125/Group_7730bookHub_logo_hmy1uo.svg"
                alt="login website logo"
                className="book-hub-logo"
              />
              <h1 className="logo-text">OOKHUB</h1>
            </div>

            <form className="form-container" onSubmit={this.submitDetails}>
              <div className="input-container">
                <label className="label-element" htmlFor="username">
                  Username*
                </label>
                <input
                  type="text"
                  className="input-element"
                  onChange={this.onChangeUsername}
                  id="username"
                  value={username}
                />
              </div>
              <div className="input-container">
                <label className="label-element" htmlFor="password">
                  Password*
                </label>
                <input
                  type="password"
                  className="input-element"
                  onChange={this.onChangePassword}
                  id="password"
                  value={password}
                />
                <p className="error-msg">{errorMsg}</p>
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
