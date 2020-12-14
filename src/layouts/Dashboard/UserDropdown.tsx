import React from 'react'
import { Dropdown, Menu } from 'antd'
import { DownOutlined, InfoCircleFilled } from '@ant-design/icons'
import { logout } from '../../helpers/storage'

export interface UserDropdownAction {
  name: string
  label: string
  render?: () => React.ReactElement
  onAction?: (name: string) => void
}

export interface UserDropdownProps {
  userInfo: () => React.ReactElement | string
  actions: UserDropdownAction[]
}

const makeMenuFromActions = (actions: UserDropdownAction[]) => {
  function onLogout() {
    console.log('logout')
    logout()
  }

  return (
    <Menu>
      {actions.map((action, actionIndex) => {
        const onAction = action.onAction || console.info

        return (
          <Menu.Item key={actionIndex} onClick={() => onAction(action.name)}>
            {action.label}
          </Menu.Item>
        )
      })}
      <Menu.Item danger onClick={onLogout}>退 出</Menu.Item>
    </Menu>
  )
}

export default function UserDropdown (props: UserDropdownProps) {
  const menu = makeMenuFromActions(props.actions)

  return (
    <div style={{ float: 'right', marginRight: 24 }}>
      <a className="ant-link" href="/about" style={{ marginRight: 24 }}>
        <InfoCircleFilled /> 关于我们
      </a>

      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {props.userInfo()} <DownOutlined />
        </a>
      </Dropdown>
    </div>
  )
}
