import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'operators/:operatorId',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      console.log('banner route')

      const OperatorEdit = require('./containers/OperatorContainer').default
      const reducer = require('./modules/operator').default

      injectReducer(store, { key: 'operator_edit', reducer })

      cb(null, OperatorEdit)
    }, 'operator')
  }
})
