import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'users/:userId',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      console.log('user route')

      const User = require('./containers/UserContainer').default
      const reducer = require('./modules/user').default

      injectReducer(store, { key: 'user', reducer })

      cb(null, User)
    }, 'user')
  }
})
