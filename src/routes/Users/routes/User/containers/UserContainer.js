import { connect } from 'react-redux'
import { setUser } from '../modules/user'
import { setChangedUser } from '../../../modules/users'
import {
  pendingTask, // The action key for modifying loading state
  begin, // The action value if a "long" running task begun
  end // The action value if a "long" running task ended
} from 'react-redux-spinner'
import agent from '../../../../../agent'

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import User from '../../../../../components/Users/User'

/*  Object of action creators (can also be function that returns object)
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  setInitialUserData (user) {
    return (dispatch, getState) => {
      dispatch(setUser(user))
    }
  },
  onSubmit (e) {
    return (dispatch, getState) => {
      dispatch({
        type: 'formSubmitUser',
        [ pendingTask ]: begin
      })

      var paramValues = ''
      for (var key in e) {
        if (e[key] !== null) {
          if (paramValues !== '') {
            paramValues += '&'
          }
          paramValues += key + '=' + encodeURIComponent(e[key])
        }
      }

      agent.Users.put(paramValues).then(response => {
        dispatch(setUser(e))
        dispatch(setChangedUser(e))
        dispatch({
          type: 'formSubmitUser',
          [ pendingTask ]: end
        })
        console.log('User submit result', response)
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    children: state.user,
    initialValues: state.user
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const counter = (state) => state.counter
 const tripleCount = createSelector(counter, (count) => count * 3)
 const mapStateToProps = (state) => ({
 counter: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(User)
