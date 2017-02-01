import React from 'react'
import classes from './Users.scss'

export const Users = (props) => (
  <div>
    <h2 className={classes.counterContainer}>
      USERS!
    </h2>
  </div>
)

Users.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Users
