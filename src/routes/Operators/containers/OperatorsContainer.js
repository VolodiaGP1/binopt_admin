import { connect } from 'react-redux'
// import { setBanners, setOperators } from '../modules/operators'
import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end // The action value if a "long" running task ended
} from 'react-redux-spinner'
import agent from '../../../agent'
import { setOperatorsData, setOperatorsMeta, setOperators, filterOperators, filteredOperators } from '../modules/operators'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import OperatorsList from 'components/Operators'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  onChildClick (pageNum = 0, limit = 10) {
    debugger;
    return (dispatch, getState) => {
      let filter = ''
      if (getState() && getState().operators && getState().operators.filter) {
        filter = getState().operators.filter
        filter += '&'
      }
      debugger;
      fetch(`http://binopt.com/api/v1/operators/?${filter}limit=${limit}&offset=${pageNum ? pageNum * limit : 0}`,
        {
          method: 'GET'
        }
      ).then( response => {
        let promise = response.json()
        promise
        .then( result => {
          let bannersArr = []
          let dataArr = []
          console.log('result.data', result.data)
          bannersArr = result.data
          if (!Array.isArray(result.data)) {
            bannersArr = [result.data]
          }
          dataArr = {meta: result.meta, data: bannersArr, filter: getState().operators.filter}
          debugger;
          dispatch(setOperatorsData(dataArr))
          mapStateToProps(getState())
          // }
        })
      }).then(() => {})
    }
  },
  deleteCurrentBanner (argument) {
    return (dispatch, getState) => {
      fetch(`http://binopt.com/api/v1/operators/${argument}`,
        {
          method: 'DELETE'
        }
      ).then( response => {
        dispatch(push('/operators'))
      })
    }
  },
  onSubmit(e) {
    return (dispatch, getState) => {
      console.log('submiting operatorsContainer')
      var paramValues = ''
      for (var key in e) {
        if (e[key] !== null) {
          if (paramValues !== '') {
            paramValues += '&'
          }
          paramValues += key + '=' + encodeURIComponent(e[key])
        }
      }
      dispatch(filterOperators(paramValues))
      mapDispatchToProps.onChildClick(1, 10)
    }
  }
}

const mapStateToProps = (state) => {
  debugger;
  return (
  {
    children: state.operators,
    operators: state.operators
  })
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

export default connect(mapStateToProps, mapDispatchToProps)(OperatorsList)

