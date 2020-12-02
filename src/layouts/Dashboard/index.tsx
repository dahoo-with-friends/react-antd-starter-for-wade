import './index.less'
import React, { useState } from 'react'
import { useHistory, useLocation, Switch } from 'react-router-dom'
import { Layout, Menu, Empty } from 'antd'
import ScrollToTop from '../ScrollToTop'
import UserDropdown, { UserDropdownProps } from './UserDropdown'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { uniqBy } from 'lodash'
import { AuthorizedRoute } from '../AuthorizedRoute'

const { Sider, Header, Content } = Layout

export type NavItem = {
  path: string
  label: string
  icon: React.ReactElement | HTMLElement
  component?: React.Component | React.FC
}

export type DashboardProps = {
  logo?: React.ReactElement
  base?: string
  nav: NavItem[]
} & Pick<UserDropdownProps, 'userInfo' | 'actions'>

function trim(path: string) {
  return path.replace(/^\/+|\/+$/gm, '')
}

export function Dashboard(props: DashboardProps) {
  const {
    base = 'dashboard',
    userInfo,
    actions
  } = props

  const nav = uniqBy(props.nav, 'path')
    .map(i => ({...i, path: `/${trim(base)}/${trim(i.path)}`, component: i.component || Empty }))
  const [collapsed, setCollapsed] = useState(false)
  const history = useHistory()
  const location = useLocation()

  function getDefaultActiveNavItemKeys () {
    return nav.reduce((ret, i) => {
      if (location.pathname === i.path) {
        ret.push(i.path)
      }

      return ret
    }, [] as string[])
  }

  return (
    <ScrollToTop>
      <Layout>
        <Sider className="dashboard-sider" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={getDefaultActiveNavItemKeys()}>
            {nav.map(({ path, icon, label }) => (
              <Menu.Item key={path} icon={icon} onClick={() => history.push(path)}>
                {label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="dashboard-layout">
          <Header className="dashboard-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}

            <UserDropdown userInfo={userInfo} actions={actions} />
          </Header>
          <Content
            className="dashboard-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              height: 'calc(100% - 48px -64px)',
            }}
          >
            <Switch>
              {nav.map(({ path, component }) => (<AuthorizedRoute key={path} path={path} component={component} />))}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </ScrollToTop>
  )
}
