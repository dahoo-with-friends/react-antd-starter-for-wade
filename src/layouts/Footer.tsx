import React from 'react'
import { Layout } from 'antd'

export default function FooterContent() {
  return (
    <Layout.Footer style={{ textAlign: 'center', lineHeight: '20px' }}>
      <b>{APP_NAME} © 2020</b> powered by <b>{APP_TEAM}</b>
    </Layout.Footer>
  )
}
