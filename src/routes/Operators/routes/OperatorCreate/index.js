import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'operators/add_operator',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      console.log('bannerCreate route')

      const OperatorCreate = require('./containers/OperatorCreateContainer').default
      const reducer = require('./modules/operatorCreate').default

      injectReducer(store, { key: 'operator_create', reducer })

      cb(null, OperatorCreate)
    }, 'operator_create')
  }
})
