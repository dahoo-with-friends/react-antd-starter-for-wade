import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'antd'
import './applist.less'
import { AppInfoModel, EmptyAppInfoModel } from './types'
import { useHistory } from 'react-router-dom'
import { appInfoPath } from './helper'
import { getAppList } from '../../api'

const { Meta } = Card

type AppListState = {
  list: AppInfoModel[]
}

const defaultAppList: AppListState = {
  list: [
    EmptyAppInfoModel
  ]
}

export default function AppList() {
  const [appListState, setAppListState] = useState(defaultAppList)
  const history = useHistory()

  useEffect(()=>{
    // 请求应用列表
    getAppList().then((res: AppInfoModel[])=>{
      setAppListState({
        list: res
      })
    })
  }, [])

  return (
    <Row gutter={48}>
      {appListState.list.map((app)=>(
        <Col key={app.bundle_id} onClick={()=>history.push(appInfoPath(app.bundle_id, `${app.os}`))}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img src={app.icon_url} />}
          >
            <Meta title={app.name} description={`版本：${app.bundle_id}`} />
          </Card>
        </Col>
      ))}
    </Row>
  )
}