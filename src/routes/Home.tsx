import React from 'react'
import { Button, message, Card } from 'antd'

export default function Home() {
  function onClick() {
    message.info('Greetings~')
  }

  return (
    <div>
      <p>Home</p>
      <Button type="primary" onClick={onClick}>Button</Button>
    </div>
  )
}
