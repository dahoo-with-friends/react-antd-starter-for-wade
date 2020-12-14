import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getUid } from '../helpers/storage'

function authorizedRoute (authorized: () => boolean) {
  return function AuthorizedRoute (props: any) {
    return authorized() ? <Route {...props} /> : <Redirect to={{
      pathname: '/login',
      state: {
        from: ''
      }
    }} />
  }
}

export const AuthorizedRoute = authorizedRoute(
  () => !!getUid()
)

export function redirectTo(
  authorized?: () => boolean
) {
  if (!authorized) {
    authorized = () => !!getUid()
  }

  return authorized && authorized() ? <Redirect to={'/dashboard/app'} /> : <Redirect to={'/login'} />
}
