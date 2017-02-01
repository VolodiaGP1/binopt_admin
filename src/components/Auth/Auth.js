import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

// Redirects to /login by default
export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

export const UserIsAdmin = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: auth => auth.groupId === 1,
  allowRedirectBack: false
})

// Admin Authorization, redirects non-admins to /app and don't send a redirect param
export const UserIsService = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsService',
  predicate: auth => auth.groupId <= 3,
  allowRedirectBack: false
})
