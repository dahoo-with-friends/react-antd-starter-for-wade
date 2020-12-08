import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.less'
import { AuthorizedRoute, redirectTo } from './layouts/AuthorizedRoute'
import { Avatar } from 'antd'
import ManAvatar from './assets/man.png'
// import WomanAvatar from './assets/woman.png'

import Login from './routes/Login'
import Home from './routes/Home'
import About from './routes/About'

import { Dashboard } from './layouts/Dashboard'
import { MobileDashboard } from './layouts/MobileDashBoard'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons'
import { BiluAndroid } from './routes/Bilu/BiluAndroid'
import { BiluIOS } from './routes/Bilu/BiluIOS'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          
          {/* Pages in Dashboard */}
          <Route path='/dashboard' component={() => (
            <MobileDashboard 
              nav={[
                {
                  label: 'Bilu Android',
                  icon: <AndroidOutlined />,
                  path: '/bilu/android',
                  component: BiluAndroid,
                  title: 'Bilu Android'
                },
                {
                  label: 'Bilu iOS',
                  icon: <AppleOutlined />,
                  path: '/bilu/ios',
                  component: BiluIOS,
                  title: 'Bilu iOS'
                }
              ]}
            />
            // <Dashboard
            //   nav={[
            //     {
            //       label: '首页',
            //       icon: <HomeOutlined />,
            //       path: '/home',
            //       component: Home
            //     },
            //     {
            //       label: '视频',
            //       icon: <VideoCameraOutlined />,
            //       path: '/video'
            //     },
            //     {
            //       label: '上传',
            //       icon: <UploadOutlined />,
            //       path: '/upload'
            //     }
            //   ]}
            //   userInfo={() => <><Avatar src={ManAvatar} /><span style={{ marginLeft: 10 }}>王大虎</span></>}
            //   actions={[
            //     {
            //       name: 'action-1',
            //       label: 'Action 1'
            //     },
            //     {
            //       name: 'action-2',
            //       label: 'Action 2'
            //     }
            //   ]} 
            // />
          )} />
          {redirectTo()}
        </Switch>
      </Router>
    </div>
  )
}

export default App
