import React, { Component, PropTypes } from 'react'
import CodeExample from '../../CodeExample'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
import {
  RadioButtonGroup,
  TextField,
  SelectField,
  DatePicker,
  TimePicker
} from 'redux-form-material-ui'
import areIntlLocalesSupported from 'intl-locales-supported'
import { UserIsAuthenticated } from '../../Auth/Auth'
import agent from '../../../agent'

let DateTimeFormat                                            // Variable for setting datetime format for datepicker

if (areIntlLocalesSupported(['uk', 'uk-UA'])) {
  DateTimeFormat = global.Intl.DateTimeFormat
} else {
  const IntlPolyfill = require('intl')
  DateTimeFormat = IntlPolyfill.DateTimeFormat
  require('intl/locale-data/jsonp/uk')
  require('intl/locale-data/jsonp/uk-UA')
}

const validate = values => {
  const errors = {}
  const requiredFields = ['name']
  const dateFields = ['regdate']
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
  // dateFields.forEach( field => {
  //   debugger;
    // if (values[field] && !values[field].match(/^(\d{4})\-(\d{2})\-(\d{4}) (\d{2}):(\d{2}):(\d{2})$/)) {
    //   errors[field] = 'Це поле ма213123є бути числом'
    // }
  // })
  if (values[href] && !values[href].match(/^https{0,1}:\/\/\S+$/)) {
    errors[href] = 'Посилання має мати вигляд \'http(s)://...\''
  }
  return errors
}

/**
 * @TODO : Datetime input. Fields validation.
 */

class Operator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      files: 1,
      preview: 0,
      banner: 0
    }
  };

  static propTypes = {
    handleSubmit: PropTypes.func,
    onChildClick: PropTypes.func,
    setInitialBannerData: PropTypes.func,
    deleteCurrentBanner: PropTypes.func,
    getInitialData: PropTypes.func,
    loadFileToApi: PropTypes.func,
    toBannersList: PropTypes.func,
    onSubmit: PropTypes.func,
    location: PropTypes.oneOfType([
      PropTypes.boolean,
      PropTypes.func,
      PropTypes.obj
    ]),
    pristine: PropTypes.oneOfType([
      PropTypes.boolean,
      PropTypes.func
    ]),
    reset: PropTypes.oneOfType([
      PropTypes.boolean,
      PropTypes.func,
      PropTypes.obj
    ]),
    submitting: PropTypes.oneOfType([
      PropTypes.boolean,
      PropTypes.func
    ]),
    params: PropTypes.oneOfType([
      PropTypes.boolean,
      PropTypes.func,
      PropTypes.obj
    ]),
    checker: PropTypes.oneOfType([
      PropTypes.boolean,
      PropTypes.func,
      PropTypes.obj
    ])
  };

  componentWillMount() {
    this.props.returnEditableUser(this.props.params.operatorId)
  }

  render () {
    const {handleSubmit, pristine, reset, submitting, children} = this.props
    return (
      <div>
        <CodeExample title={`Редагування оператора #${children && children.id ? children.id : ''} :
         ${children && children.name ? children.name : ''}`}>
          <form onSubmit={handleSubmit((e, e2) => this.props.onSubmit(e, this.refs))}>
            <div className='form-section'>
              <Field name='name' component={TextField} value='YO' hintText='Ім"я оператора'
                floatingLabelText='Ім"я оператора' ref='name' withRef className='form-field' />
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
            {/*
             <Field name='output_place' component={SelectField} hintText='Select a plan'
             floatingLabelText='Місце виведення' className='form-field' >
             <MenuItem value='main' primaryText='Головна сторінка' />
             <MenuItem value='node' primaryText='Узлова сторінка' />
             <MenuItem value='catalog' primaryText='Каталог' />
             </Field>
             <div className='form-section'>
             <h4>Статус:</h4>
             <Field name='status' component={RadioButtonGroup} className='form-field'>
             <RadioButton value={'1'} label='Показується' />
             <RadioButton value={'0'} label='Не показується' />
             </Field>
             </div><br />
            */}
            <div>
              <RaisedButton type='submit' label='Зберегти' className='button-submit'
                primary onClick={() => this.props.loadFileToApi(this.state.files, banner.id)} />
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
let OperatorRedux = reduxForm({
  form: 'OperatorEditForm',
  enableReinitialize: true,
  validate
}, state => ({
  initialValues: this.props.location.state.operators
}))(Operator)

export default UserIsAuthenticated(OperatorRedux)
