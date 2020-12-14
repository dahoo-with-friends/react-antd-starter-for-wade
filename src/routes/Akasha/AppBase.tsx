import { Row, Col } from 'antd'
import React from 'react'
import { AppInfoModel } from './types'
import {appInfoPath, toDateFormat} from './helper'
import { Link } from 'react-router-dom'

export default function AppBase(appInfo: AppInfoModel) {
  return (
    <Row justify="center">
      <Col span={4} className="app-info">
        <div>{appInfo.appName}</div>
        <img src={appInfo.currentVersionInfo.qrcodeURL} alt=""/>
        <Link to={appInfoPath(appInfo.appBundleID, `${appInfo.os}`)}>bundle ID：{appInfo.appBundleID}</Link>
        <div>
            版本：{appInfo.currentVersionInfo.version} 
            (build {appInfo.currentVersionInfo.build}) 
        </div>
        <div>
          更新时间：{toDateFormat(appInfo.currentVersionInfo.updated_at)}
        </div>
      </Col>
    </Row>
  )
}