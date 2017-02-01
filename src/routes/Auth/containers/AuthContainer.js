import { connect } from 'react-redux'
import { loginUser } from '../modules/auth'
import { push } from 'react-router-redux'
import {
  pendingTask, // The action key for modifying loading state
  begin, // The action value if a "long" running task begun
  end // The action value if a "long" running task ended
} from 'react-redux-spinner'
import agent from '../../../agent'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Login from 'components/Login'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    tryAuth: (login, pass) => {
      dispatch({
        type: 'login',
        [ pendingTask ]: begin
      })
        agent.Operators.get(1)
        .then(response => {
          console.log('response', response)
          console.log('ownProps', ownProps)
          dispatch(loginUser(response.data))
          dispatch(push(ownProps.location.query.redirect))
          // if (response.status >= 200 && response.status < 300) {
          //   let promise = response.json()
          //
          //   promise.then(result => {
          //     console.log('result', result)
          //     // let token = result.data.access.token
          //     // let expireDate = new Date(result.data.access.expire_date.replace(' ', 'T')).getTime()
          //     // let groupId = result.data.roles.id
          //     // let groupName = result.data.roles.name
          //     //
          //     // if (token && expireDate) {
          //     //   if (expireDate > new Date().getTime() && result.data.roles.active === '1') {
          //     //     dispatch(setAuthToken(
          //     //       {
          //     //         token: token,
          //     //         expire: expireDate,
          //     //         groupId: groupId,
          //     //         groupName: groupName
          //     //       }
          //     //       )
          //     //     )
          //     //     agent.setToken(token)
          //     //     dispatch({
          //     //       type: 'login',
          //     //       [ pendingTask ]: end
          //     //     })
          //     //     dispatch(push(ownProps.location.query.redirect))
          //     //   }
          //     // }
          //   })
          // } else {
          //   const error = new Error(response.statusText)
          //   error.response = response
          //   throw error
          // }
        })
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
