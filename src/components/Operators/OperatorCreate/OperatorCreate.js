import React, { Component, PropTypes } from 'react'
import CodeExample from '../../CodeExample'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
import DateTimeField from '../../Fields/DateTimeField'
import {
  RadioButtonGroup,
  TextField,
  SelectField
} from 'redux-form-material-ui'
import { UserIsAuthenticated } from '../../Auth/Auth'

const validate = values => {
  const errors = {}
  const requiredFields = ['name']
  const numericFields = ['output_position', 'order_number']
  const href = ['banner_href']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Це поле обов\'язкове для заповнення'
    }
  })
  numericFields.forEach(field => {
    if (values[field] && !values[field].match(/^\d+$/)) {
      errors[field] = 'Це поле має бути числом'
    }
  })
  if (values[href] && !values[href].match(/^http:\/\/\S+$/)) {
    errors[href] = 'Посилання має мати вигляд \'http://...\''
  }
  return errors
}

/**
 * @TODO : Fix datetime (wrong date in DB). Fields validation.
 */

class OperatorCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      begin: null,
      end: null
    }
  }

  static propTypes = {
    handleSubmit: PropTypes.func,
    setInitialUserData: PropTypes.func,
    pristine: PropTypes.boolean,
    reset: PropTypes.obj,
    submitting: PropTypes.boolean,
    onSubmit: PropTypes.func
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.begin !== this.state.begin || nextState.end !== this.state.end) {
      return false
    }
    return true
  };

  setInformation (a, b, arg) {
    if (arg === 'begin') {
      this.setState({begin: b})
    }
    if (arg === 'end') {
      this.setState({end: b})
    }
  }

  render () {
    const {handleSubmit, pristine, reset, submitting} = this.props
    return (
      <div>
        <CodeExample title={'Створення оператора'}>
          <form onSubmit={handleSubmit((e) => this.props.onSubmit(e))}>
            <div className='form-section'>
              <Field name='name' component={TextField} value='YO' hintText='Ім"я оператора'
                     floatingLabelText='Ім"я оператора' ref='name' withRef className='form-field' />
            </div>
            <div className='form-section'>
              <Field name='password' component={TextField} value='YO' hintText='Пароль оператора'
                     floatingLabelText='Пароль оператора' ref='name' withRef className='form-field' />
            </div>
            <div className='form-section'>
              <Field name='emailsuffix' component={TextField} value='YO' hintText='Суфікс пошти'
                     floatingLabelText='Суфікс пошти' ref='name' withRef className='form-field' />
            </div>
            <div className='form-section'>
              <Field name='ip' component={TextField} value='YO' hintText='IP'
                     floatingLabelText='IP' ref='name' withRef className='form-field' />
            </div>
            <div className='form-section'>
              <Field name='regdate' component={TextField} value='YO' hintText='Дата реєстрації'
                     floatingLabelText='Дата реєстрації' ref='name' withRef className='form-field' />
            </div>
            <div>
              <RaisedButton type='submit' label='Створити' className='button-submit' primary
                disabled={pristine || submitting} />
              <RaisedButton type='button' label='Стерти' className='button-default' primary
                disabled={pristine || submitting} onClick={reset} />
            </div>
          </form>
        </CodeExample>
      </div>
    )
  }
}

// Decorate with redux-form
let OperatorCreateRedux = reduxForm({
  form: 'OperatorCreateForm',
  enableReinitialize: true,
  validate
}, state => ({
  initialValues: state
}))(OperatorCreate)

export default UserIsAuthenticated(OperatorCreateRedux)
