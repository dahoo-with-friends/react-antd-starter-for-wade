import React, { useEffect, useState } from 'react'
import BiluIcon from '../../assets/bilu_230x230.png'
import { Card, Row, Col } from 'antd'
import './applist.less'
import { mockAndroidAppInfoModel, mockIOSAppInfoModel } from './types'
import { useHistory } from 'react-router-dom'
import { appInfoPath } from './helper'

const { Meta } = Card

const defaultAppList = [
  mockAndroidAppInfoModel,
  mockIOSAppInfoModel
]

export default function AppList() {
  const [appList, setAppListState] = useState(defaultAppList)
  const history = useHistory()

  useEffect(()=>{
    // 请求应用列表
    // setAppListState(defaultAppList)
  })

  return (
    <Row gutter={48}>
      {appList.map((app)=>(
        <Col key={app.appBundleID} onClick={()=>history.push(appInfoPath(app.appBundleID, `${app.os}`))}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img src={app.iconUrl} />}
          >
            <Meta title={app.appName} description={`版本：${app.currentVersionInfo.version} (build ${app.currentVersionInfo.build})`} />
          </Card>
        </Col>
      ))}
    </Row>
  )
}