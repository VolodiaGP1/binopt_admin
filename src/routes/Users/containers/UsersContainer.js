import { connect } from 'react-redux'
import { setUsers } from '../modules/users'
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

import UsersList from 'components/Users'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  onChildClick (pageNum = 1, limit = 10) {
    return (dispatch, getState) => {
      // get token from state
      dispatch({
        type: 'setUsers',
        [ pendingTask ]: begin
      })

      agent.Users.all(pageNum, limit).then(response => {
        let usersArr = []
        let dataArr = []
        response.data.forEach((item, key) => {
          usersArr[item.id] = item
        })

        dataArr = {meta: response.meta, data: usersArr}

        dispatch(setUsers(dataArr))
        dispatch({
          type: 'setUsers',
          [ pendingTask ]: end
        })
      })
    }
  }
}

const mapStateToProps = (state) => ({
  children: state.users
})

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)

