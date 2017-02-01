import React, {Component, PropTypes} from 'react'
import '../../styles/core.scss'
import Title from 'react-title-component'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import spacing from 'material-ui/styles/spacing'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors'
import MenuList from '../../components/MenuList'
import FullWidthSection from '../../components/FullWidthSection'
import withWidth from 'material-ui/utils/withWidth'
import {Spinner} from 'react-redux-spinner'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
require('./CoreLayout.scss')

class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    location: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static childContextTypes = {
    muiTheme: PropTypes.object
  };

  constructor (props) {
    super(props)

    this.state = {
      dataSource: []
    }
  }

  state = {
    navDrawerOpen: false
  };

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme
    }
  }

  componentWillMount () {
    this.setState({
      muiTheme: getMuiTheme()
    })
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme
    this.setState({
      muiTheme: newMuiTheme
    })
  }

  getStyles () {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400
      },
      content: {
        margin: spacing.desktopGutter
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        bottom: 0
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12
      },
      browserstackLogo: {
        margin: '0 3px'
      },
      iconButton: {
        color: darkWhite
      }
    }

    styles.content = Object.assign(styles.content, styles.contentWhenMedium)

    return styles
  }

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    })
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open
    })
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value)
    this.setState({
      navDrawerOpen: false
    })
  };

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme
    })
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value
      ]
    })
  };

  render () {
    const {
      location,
      children
    } = this.props

    let {
      navDrawerOpen
    } = this.state

    const {
      prepareStyles
    } = this.state.muiTheme

    const styles = this.getStyles()

    let title = 'Binopt Admin'

    let docked = true
    navDrawerOpen = true

    styles.navDrawer = {
      zIndex: 900,
      marginBottom: 100
    }
    styles.root.paddingLeft = 256
    styles.footer.paddingLeft = 256

    return (
      <div className='container text-center'>
        {this.props.location.pathname === '/login'
          ? <div className='empty-body login-page'>{children}</div>
          : <div>
            <Title render='Binopt Admin Panel' />
            <div className="menu-place">
              <MenuList style={styles.navDrawer} location={location} docked={docked}
                            onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer} onChangeList={this.handleChangeList}
                            open={navDrawerOpen} />
            </div>
            {title !== ''
              ? <div className="page-content">
                  {React.cloneElement(children, {
                    onChangeMuiTheme: this.handleChangeMuiTheme
                  })}
                </div>
              : <div className="page-content"> {children} </div>
            }
            <div className="header"></div>
          </div>
        }
      </div>
    )
  }
}

export default withWidth()(CoreLayout)
