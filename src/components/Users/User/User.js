import React, { Component, PropTypes } from 'react'
import CodeExample from '../../CodeExample'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton } from 'material-ui/RadioButton'
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import {
  RadioButtonGroup,
  TextField,
  Toggle,
  AutoComplete
} from 'redux-form-material-ui'
import { UserIsAuthenticated } from '../../Auth/Auth'

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'email', 'driver', 'when']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Це поле обов\'язкове для заповнення'
    }
  })
  if (values.pizzas > 15) {
    errors.pizzas = 'Are you mad?'
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class User extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onChildClick: PropTypes.func,
    setInitialUserData: PropTypes.func,
    location: PropTypes.object,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool
  };

  componentWillMount () {
    this.props.setInitialUserData(this.props.location.state.user)
  };

  render () {
    const {handleSubmit, pristine, reset, submitting} = this.props

    let user = this.props.location.state.user

    return (
      <div>
        <CodeExample title={'Редагування користувача #' + user.id + ': ' + user.name}>
          <form onSubmit={handleSubmit}>
            <div className='form-section'>
              <Field name='name' component={TextField} value='YO' hintText='Імя' floatingLabelText='Імя' ref='name'
                withRef className='form-field' />
            </div>
            <div className='form-section'>
              <Field name='email' component={TextField} hintText='Email'
                floatingLabelText='Email' className='form-field' />
            </div>
            <div className='form-section'>
              <Field name='phone' component={TextField} hintText='Телефон'
                floatingLabelText='Телефон' className='form-field' />
            </div>
            <div className='form-section'>
              <h4>Група:</h4>
              <Field name='group_id' component={RadioButtonGroup} className='form-field'>
                <RadioButton value={'1'} label='Адмін' />
                <RadioButton value={'2'} label='Користувач' />
              </Field>
            </div>
            <div className='form-section'>
              <Field name='status' component={Toggle} label='Активований'
                labelPosition='right' className='form-field' />
            </div>
            <div className='form-section'>
              <Field name='created_at' component={TextField} hintText='Створено'
                floatingLabelText='Створено' className='form-field' disabled />
            </div>
            <div className='form-section'>
              <Field name='updated_at' component={TextField} hintText='Змінено'
                floatingLabelText='Змінено' className='form-field' disabled />
            </div>
            <div>
              <Field name='notes' component={TextField} hintText='Notes' floatingLabelText='Notes' rows={2} />
            </div>
            <div>
              <Field name='cheese' component={AutoComplete} floatingLabelText='Cheese' openOnFocus
                filter={MUIAutoComplete.fuzzyFilter}
                dataSource={['Cheddar', 'Mozzarella', 'Parmesan', 'Provolone']} />
            </div>
            <br />
            <br />
            <div>
              <RaisedButton type='submit' label='Зберегти' className='button-submit' primary
                disabled={pristine || submitting} />
              <RaisedButton type='button' label='Відновити' className='button-default' primary
                disabled={pristine || submitting} onClick={reset} />
            </div>
          </form>
        </CodeExample>
      </div>
    )
  }
}

// Decorate with redux-form
let UserRedux = reduxForm({
  form: 'UserEditForm',
  enableReinitialize: true,
  validate
}, state => ({
  initialValues: state.user
}))(User)

export default UserIsAuthenticated(UserRedux)
