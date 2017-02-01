import React, { Component, PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, MakeSelectable } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { spacing, typography, zIndex } from 'material-ui/styles'
import { cyan500 } from 'material-ui/styles/colors'
import FontIcon from 'material-ui/FontIcon'
import { connect } from 'react-redux'

const SelectableList = MakeSelectable(List)

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16
  },
  icon: {
    float: 'left',
    marginTop: '-5px',
    marginRight: '10px'
  },
  iconText: {
    // lineHeight: '26px'
    fontSize: '15px'
  }
}

class MenuList extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
    auth: PropTypes.object
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  state = {
    muiVersions: []
  };

  render () {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      open,
      style
    } = this.props

    const items = [
      <ListItem key='main' primaryText={
        <div>
          <FontIcon className='muidocs-icon-action-home' style={styles.icon} />
          <span style={styles.iconText}>Панель керування</span>
        </div>
      } value='/' />,
      <ListItem key='users' primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>computer</FontIcon><span
          style={styles.iconText}>Користувачі</span></div>
      } value='/users' />,
      <ListItem key='orders' disabled primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>shopping_cart</FontIcon><span
          style={styles.iconText}>Замовлення</span></div>
      } value='/orders' />,
      <ListItem key='goods' primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>computer</FontIcon><span
          style={styles.iconText}>Товари і пропозиції</span></div>
      } value='/goods' nestedItems={[
        <ListItem primaryText='Дерево категорій' value='/categories' />,
        <ListItem disabled primaryText='Виробники' value='/goods/manufacturers' />
      ]} />,
      <ListItem key='locations' disabled primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>my_location</FontIcon><span
          style={styles.iconText} value='/locations'>Адреси</span></div>
      } />,
      <ListItem key='import' disabled primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>archive</FontIcon><span
          style={styles.iconText}>Імпорт</span></div>
      } />,
      <ListItem key='promotions' primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>stars</FontIcon><span
          style={styles.iconText}>Акції</span></div>
      } value='/promotions' nestedItems={[
        <ListItem disabled primaryText='Комплекти' value='/sets' />,
        <ListItem primaryText='Пересікання' value='/intersections' />,
        <ListItem primaryText='Блокування' value='/locks' />
      ]} />,
      <ListItem key='loyalty' disabled primaryText={
        <div>
          <FontIcon className='material-icons' style={styles.icon}>loyalty</FontIcon>
          <span style={styles.iconText}>Лояльність</span>
        </div>
      } nestedItems={[
        <ListItem primaryText='Історія покупок' value='/loyalty/orders/list' />,
        <ListItem disabled primaryText='Захист ціни' value='' />,
        <ListItem disabled primaryText='Зворотній звязок' value='' />
      ]} />,
      <ListItem key='pages' disabled primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>note</FontIcon><span
          style={styles.iconText}>Сторінки сайту</span></div>
      } />,
      <ListItem key='vacancies' disabled primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>folder_shared</FontIcon><span
          style={styles.iconText}>Вакансії</span></div>
      } />,
      <ListItem key='buys' disabled primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>assignment_returned</FontIcon><span
          style={styles.iconText}>Закупки</span></div>
      } />,
      <ListItem key='access' disabled primaryText={
        <div>
          <FontIcon className='material-icons' style={styles.icon}>lock</FontIcon>
          <span style={styles.iconText}>Доступи</span>
        </div>
      } />,
      <ListItem key='banners' primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>view_carousel</FontIcon><span
          style={styles.iconText}>Банера</span></div>
      } value='/banners' />,
      <ListItem key='articles' primaryText={
        <div><FontIcon className='material-icons' style={styles.icon}>picture_in_picture</FontIcon><span
          style={styles.iconText}>Статті</span></div>
      } value='/articles' />
    ]

    return (
      <div>
        {this.props.auth != null
        ? <SelectableList value={location.pathname} onChange={onChangeList}>
          <ListItem key='main' primaryText={
            <div>
              <FontIcon className='muidocs-icon-action-home' style={styles.icon} />
              <span style={styles.iconText}>Панель керування</span>
            </div>
          } value='/' />
          <ListItem key='banners' primaryText={
            <div><FontIcon className='material-icons' style={styles.icon}>view_carousel</FontIcon><span
              style={styles.iconText}>Оператори</span></div>
          } value='/operators' />
        </SelectableList>
        : <span />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(MenuList)

