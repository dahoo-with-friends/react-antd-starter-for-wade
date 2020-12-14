import { Row, Col } from 'antd'
import React from 'react'
import { AppInfoModel } from './types'
import {appInfoPath, toDateFormat} from './helper'
import { Link } from 'react-router-dom'

export default function AppBase(appInfo: AppInfoModel) {
  return (
    <Row justify="center">
      <Col span={4} className="app-info">
        <div>{appInfo.name}</div>
        <img src={appInfo.last_version.qrcode_image_url} alt=""/>
        <Link to={appInfoPath(appInfo.bundle_id, `${appInfo.os}`)}>bundle ID：{appInfo.bundle_id}</Link>
        <div>
            版本：{appInfo.last_version.version} 
            (build {appInfo.last_version.build}) 
        </div>
        <div>
          更新时间：{toDateFormat(appInfo.last_version.updated_at)}
        </div>
      </Col>
    </Row>
  )
}