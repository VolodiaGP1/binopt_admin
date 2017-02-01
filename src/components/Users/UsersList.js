import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import { Link } from 'react-router'
import { UserIsAuthenticated } from '../Auth/Auth'
import CodeExample from '../CodeExample'
import IconButton from 'material-ui/IconButton'
import CodeIcon from 'material-ui/svg-icons/action/autorenew'
import ListPagination from '../ListPagination'

class UsersList extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    onChildClick: PropTypes.func
  };

  componentDidMount () {
    this.props.onChildClick(0)
  };

  render () {
    console.log(this.props.children)
    let userItems = []
    let usersCount = 0
    let page = 0

    if (this.props.children.data !== undefined && this.props.children.meta !== undefined) {
      userItems = this.props.children.data
      usersCount = this.props.children.meta.total
      page = this.props.children.meta.offset / this.props.children.meta.limit
    }
    return (
      <div>
        <CodeExample title={'Список користувачів'}
          buttons={<IconButton onClick={this.props.onChildClick} touch tooltip='Оновити'>
            <CodeIcon />
          </IconButton>}>
          <Table multiSelectable>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Телефон</TableHeaderColumn>
                <TableHeaderColumn>Ім'я</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userItems.map(user =>
                <TableRow key={user.id}>
                  <TableRowColumn><Link to={{pathname: `/users/${user.id}`, state: {user: user}}}
                                        >{user.id}</Link></TableRowColumn>
                  <TableRowColumn><Link to={{pathname: `/users/${user.id}`, state: {user: user}}}
                    >{user.phone}</Link></TableRowColumn>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CodeExample>
        <ListPagination
          totalItems={usersCount}
          currentPage={page}
          onPageClick={this.props.onChildClick}
          itemsPerPage={10}
        />
      </div>
    )
  }
}

export default UserIsAuthenticated(UsersList)
