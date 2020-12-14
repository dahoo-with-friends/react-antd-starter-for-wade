import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AppInfo from './AppInfo'
import AppList from './AppList'
import AppVersionInfo from './AppVersionInfo'


export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/dashboard/app">
        <AppList />
      </Route>
      <Route exact path="/dashboard/app/:bundleID/:os">
        <AppInfo />
      </Route>
      <Route path="/dashboard/app/:bundleID/:os/:versionID">
        <AppVersionInfo />
      </Route>
    </Switch>
  )
}