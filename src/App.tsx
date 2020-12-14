import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.less'
import { AuthorizedRoute, redirectTo } from './layouts/AuthorizedRoute'
import { Avatar } from 'antd'
import ManAvatar from './assets/man.png'
// import WomanAvatar from './assets/woman.png'

import Login from './routes/Login'
import AppRouter from './routes/Akasha/AppRouter'
import About from './routes/About'

import { Dashboard } from './layouts/Dashboard'
import { HomeOutlined } from '@ant-design/icons'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          
          {/* Pages in Dashboard */}
          <Route path='/dashboard' component={() => (
            <Dashboard
              nav={[
                {
                  label: '应用列表',
                  icon: <HomeOutlined />,
                  path: '/app',
                  component: AppRouter
                }
              ]}
              userInfo={() => <><Avatar src={ManAvatar} /><span style={{ marginLeft: 10 }}>User</span></>}
              actions={[]} 
            />
          )} />

          {/* 关于 */}
          <AuthorizedRoute path="/about" component={About} />
          
          {redirectTo()}
        </Switch>
      </Router>
    </div>
  )
}

export default App
