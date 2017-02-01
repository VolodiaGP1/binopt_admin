import { connect } from 'react-redux'
import { editOperator } from '../modules/operator'
import agent from '../../../../../agent'
import { push } from 'react-router-redux'
import {
    pendingTask, // The action key for modifying loading state
    end // The action value if a "long" running task ended
} from 'react-redux-spinner'
/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import Operator from '../../../../../components/Operators/Operator'

/*  Object of action creators (can also be function that returns object)
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  onSubmit (e) {
    return (dispatch, getState) => {
      let arr = []
      arr[0] = e
      fetch(`http://binopt.com/api/v1/operators/${e.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(arr)
        }
      ).then( response => {
        dispatch(push('/operators'))
      })
    }
  },
  returnEditableUser(userID) {
    return (dispatch, getState) => {
      agent.Operators.get(userID).then(response => {
        console.log('returnEditableUser response', response)
        dispatch(editOperator(response.data[0]))
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    children: state.operator_edit,
    initialValues: state.operator_edit
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

export default connect(mapStateToProps, mapDispatchToProps)(Operator)
