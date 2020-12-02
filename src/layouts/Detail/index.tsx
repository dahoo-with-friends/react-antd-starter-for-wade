import './index.less'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import ScrollToTop from '../ScrollToTop'
import Footer from '../Footer'
import classnames from 'classnames'

const { Header, Content } = Layout

export interface DetailProps {
  title: string
  btnBackText?: string
  onBack?: () => void
  className?: string
  [key: string]: any
}

export function Detail (props: DetailProps) {
  const { title, btnBackText, children, onBack, className } = props
  const history = useHistory()

  return (
    <ScrollToTop>
      <Layout className={classnames('detail-layout', className)}>
        <Header className="detail-layout-header">
          <div className="detail-layout-header-wrapper">
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                if (typeof onBack === 'function') {
                  return onBack()
                }

                if (history.length > 2) {
                  history.goBack()
                } else {
                  // 默认返回到 /dashboard
                  history.push('/dashboard/home')
                }
              }}
            >
              {btnBackText || '返回'}
            </Button>
            <div className="title">{title}</div>
          </div>
        </Header>

        <Layout>
          <Content className="detail-layout-content">{children}</Content>
        </Layout>

        <Footer />
      </Layout>
    </ScrollToTop>
  )
}
