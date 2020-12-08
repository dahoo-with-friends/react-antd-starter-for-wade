import './index.less'
import React, { useState } from 'react'
import { Drawer, List, NavBar, Flex } from 'antd-mobile'
import { useHistory, useLocation, Switch } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { uniqBy } from 'lodash'
import { Empty } from 'antd'
import { AuthorizedRoute } from '../AuthorizedRoute'
import {logout} from '../../helpers/storage'

export type NavItem = {
    title: string
    path: string
    label: string
    icon: React.ReactElement | HTMLElement
    component?: React.Component | React.FC
}

export type MobileDashboardProps = {
    nav: NavItem[]
}

function trim(path: string) {
  return path.replace(/^\/+|\/+$/gm, '')
}

export function MobileDashboard(props: MobileDashboardProps) {
  const base = 'dashboard'
  const nav = uniqBy(props.nav, 'path')
    .map(i => ({...i, path: `/${trim(base)}/${trim(i.path)}`, component: i.component || Empty }))

  const [opened, setOpened] = useState(false)
  const [navtitle, setNavTitle] = useState('Home')
  const history = useHistory()

  function onOpenChange() {
    console.log('opened:' + opened)
    setOpened(!opened)
  }

  function logoutUser() {
    logout()
    window.location.href = '/login'
  }

  const sidebar = (<List>
    {nav.map(({path, icon, label, title}) => (
      <List.Item 
        key={path} 
        onClick={() => {
          console.log('go path: ' + path)
          history.push(path)
          onOpenChange()
          setNavTitle(title)
        }}
        thumb={icon}
        multipleLine
      >{label}</List.Item>
    ))}
  </List>)

  return (
    <div className="mobile-dashboard">
      <NavBar 
        icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />} 
        onLeftClick={onOpenChange}
        rightContent={[ <LogoutOutlined key="logout" onClick={logoutUser}/>]}
      >
        {navtitle}
      </NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        sidebar={sidebar}
        open={opened}
        onOpenChange={onOpenChange}
      >
        <Flex justify="center" className="mobile-dashboard-background">
          <Switch>
            {nav.map(({ path, component }) => (<AuthorizedRoute key={path} path={path} component={component} />))}
          </Switch>
        </Flex>
      </Drawer>
    </div>
  )
}
