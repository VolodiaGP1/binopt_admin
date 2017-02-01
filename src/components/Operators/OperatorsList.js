import React, {Component, PropTypes} from 'react'
// import Paper from 'material-ui/Paper'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import { Link } from 'react-router'
import { UserIsAuthenticated } from '../Auth/Auth'
import FontIcon from 'material-ui/FontIcon'
import ListPagination from '../ListPagination'
// import CodeExample from '../CodeExample'
// import IconButton from 'material-ui/IconButton'
// import CodeIcon from 'material-ui/svg-icons/action/autorenew'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton } from 'material-ui/RadioButton'
import {
  RadioButtonGroup,
  TextField,
  SelectField,
  DatePicker,
  TimePicker
} from 'redux-form-material-ui'
require('./Operators.scss')

class OperatorsList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedBannerId: null,    // Currently selected banner
      deletingBanner: false,
      bannerItems: {},
      copyItems: {},
      bannerName: null,
      changePagination: false
    }
  }

  static propTypes = {
    // children: PropTypes.array,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    onChildClick: PropTypes.func,
    deleteCurrentBanner: PropTypes.func
  };

  /**
   * Get initial banners
   */
  componentDidMount () {
    this.props.onChildClick(0)
    // this.setState({bannerItems: this.props.children.data})
    // this.setState({copyItems: this.props.children.data})
  };

  componentWillReceiveProps(nextProps) {
    debugger;
    // console.log('here');
    // if (nextProps !== this.props) {
    //   console.log('in if');
    // }
  }

  /**
   * Set selected banner, when on table row is selected
   *
   * @param element
   */
  selectBannerId (element) {
    if (element.length !== 0) {                                 // If row was selected
      let bannerItems = this.props.children.data.data
      var iteration = 0
      bannerItems.map(currentBanner => {                        // Searching banner which is selected in table
        if (iteration === element[0]) {
          this.setState({selectedBannerId: currentBanner.id})   // Set selected banner
        }
        iteration++
      })
    }
  };

  /**
   * Get initial information from server
   */
  downloadInformation () {
    this.props.onChildClick(0)
    // console.log('this.props', this.props)
    this.setState({bannerItems: this.props.children.data})
    this.setState({copyItems: this.props.children.data})
  }

  /**
   * Set not to update component if state, which show us selected banner is updated
   *
   * @param nextProps
   * @param nextState
   * @returns {boolean}
   */
  shouldComponentUpdate (nextProps, nextState) {
    // console.log('shouldComponentUpdate')
    // if (nextState.selectedBannerId !== this.state.selectedBannerId) {
    //   return false
    // }
    return true
  };

  /**
   * Function to delete current banner
   *
   * @param page
   */
  deleteCurrentBanner (page) {
    this.props.onChildClick(page, 10)
    this.props.deleteCurrentBanner(this.state.selectedBannerId)
    this.setState({deletingBanner: !this.state.deletingBanner})
  }

  /**
   * On click of submit button setState({bannerItems: this.state.copyItems})
   * DO filters like a form, then submit result is a 
   * @returns {XML}
   */
  render () {
    debugger;
    console.log('this.props.operators', this.props.operators)
    let operatorsItems = []                                            // Array of banner
    let operatorsCount = 0                                            // Full number of banners
    let page = 0                                                    // Current page
    // console.log('this.props.children', this.props.children)
    if (this.props.children.data !== undefined && this.props.children.data !== undefined && this.props.children.meta !== undefined) {
      // console.log('this.props.children in if', this.props.children)
      operatorsItems = this.props.children.data
      operatorsCount = this.props.children.meta.total
      page = this.props.children.meta.offset / this.props.children.meta.limit
    }
    // if (this.props.children.data.data && !this.state.bannerItems.data) {
    //   this.downloadInformation()
    // }
    const {handleSubmit, pristine, reset, submitting, children} = this.props
    // console.log('rendering BannersList')
    // console.log('bannerItems', this.state.bannerItems)
    return (
      <div>
        <div className="list-instruments">
          <Link to={{pathname: '/operators/add_operator'}}>
            <button label='Створити' className='btn btn-default'>
              <i className="fa fa-plus"/>  Добавити оператора
            </button>
          </Link>
          <button label='Створити' className='btn btn-default' onClick={() => this.deleteCurrentBanner(page)}>
            <i className="fa fa-trash-o"/>  Видалити оператора
          </button>
          <button label='Створити' className='btn btn-default' onClick={() => this.downloadInformation()}>
            <i className="fa fa-trash-o"/>  Оновити дані
          </button>
        </div>
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
          <div>
            <RaisedButton type='submit' label='Зберегти' className='button-submit'
                          primary onClick={() => {this.props.onChildClick()}} />
            <RaisedButton type='button' label='Відновити' className='button-default' primary
                          disabled={pristine || submitting} onClick={reset} />
          </div>
        </form>
        <Table onRowSelection={(a, b, c) => this.selectBannerId(a)}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Ім"я</TableHeaderColumn>
              <TableHeaderColumn>Суфікс пошти</TableHeaderColumn>
              <TableHeaderColumn>IP</TableHeaderColumn>
              <TableHeaderColumn>Дата реєстрації</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operatorsItems.map(operator =>
              <TableRow key={operator.id} >
                <TableRowColumn><Link to={{pathname: `/operators/${operator.id}`, state: {operator: operator}}}
                    >{operator.id}</Link></TableRowColumn>
                <TableRowColumn><Link to={{pathname: `/operators/${operator.id}`, state: {operator: operator}}}
                    >{operator.name}</Link></TableRowColumn>
                <TableRowColumn>{operator.emailsuffix}</TableRowColumn>
                <TableRowColumn>{operator.ip}</TableRowColumn>
                <TableRowColumn>{operator.regdate}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ListPagination
          totalItems={operatorsCount}
          currentPage={page}
          onPageClick={(arg, arg2) => {this.props.onChildClick(arg, arg2);}}
          itemsPerPage={10}
        />
      </div>
    )
  }
}

let OperatorsListRedux = reduxForm({
  form: 'OperatorsListForm',
  enableReinitialize: true,
  // validate
}, state => ({
  initialValues: this.props.location.state.operators
}))(OperatorsList)

export default UserIsAuthenticated(OperatorsListRedux)
