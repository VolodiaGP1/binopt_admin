import { injectReducer } from '../../store/reducers'
import OperatorCreate from './routes/OperatorCreate'
import OperatorEdit from './routes/Operator'

export default (store) => ({
  path: 'operators',
  childRoutes: [
    OperatorCreate(store),
    OperatorEdit(store)
  ],
  /* Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    console.log('banners-route (/src/routes/Operators/index.js)')
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Operators = require('./containers/OperatorsContainer').default
      const reducer = require('./modules/operators').default

      /*  Add the reducer to the store on key 'users'  */
      injectReducer(store, { key: 'operators', reducer })

      /*  Return getComponent   */
      cb(null, Operators)

    /* Webpack named bundle   */
    }, 'operators')
  }
})
