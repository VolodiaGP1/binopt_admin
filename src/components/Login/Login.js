import React, {Component, PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton'


class Login extends Component {
  static propTypes = {
    tryAuth: PropTypes.func
  };

  constructor (props) {
    super(props)
    this.state = {showPhoneLabel: true, showPassLabel: true}
  }

  handleSubmit (e, elem) {
    elem.preventDefault()
    this.props.tryAuth(this.refs.inputPhone.value, this.refs.inputPass.value)
  };

  handleInputChange (value) {
    if (value !== '') {
      this.setState({showPhoneLabel: false})
    } else {
      this.setState({showPhoneLabel: true})
    }
  }

  handlePasswordChange (value) {
    if (value !== '') {
      this.setState({showPassLabel: false})
    } else {
      this.setState({showPassLabel: true})
    }
  }

  render () {
    let showPhoneLabel = this.state.showPhoneLabel
    let showPassLabel = this.state.showPassLabel
    require('./Login.scss')
    return (
      <div className="login-page-content">
        <div className="login-background"></div>
        <form id='loginForm' onSubmit={this.handleSubmit.bind(this, 2)}>
          <div className="form-header">
            Вход в админку
          </div>
          <div className="login-fields">
            <div className='login-group' style={{marginBottom: '45px', position: 'relative'}}>
              <label>Логин : </label>
              <input ref='inputPhone' type='text' onChange={(e) => { this.handleInputChange(e.target.value) }} />
            </div>
            <div className="login-group" style={{marginBottom: '45px', position: 'relative'}}>
              <label>Пароль :</label>
              <input ref='inputPass' type='password' onChange={(e) => { this.handlePasswordChange(e.target.value) }} />
            </div>
            <div className="form-footer">
              <div>
                <button type='submit' label='Войти' className="login-button" primary>Войти</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
