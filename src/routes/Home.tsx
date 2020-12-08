import './Home.less'
import React from 'react'
import { Button, message } from 'antd'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'

export default function Home() {
  function onClick() {
    message.info('Greetings~')
  }

  const sidebar = (
    <List>
      <List.Item key={1}
        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        multipleLine
      >Category</List.Item>
    </List>
  )

  return (
    <div>
      <p>Home</p>
      <Button type="primary" onClick={onClick}>Button</Button>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={onClick}>Basic</NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={false}
        onOpenChange={onClick}
      >
        Click upper-left corner
      </Drawer>
    </div>
  )
}
