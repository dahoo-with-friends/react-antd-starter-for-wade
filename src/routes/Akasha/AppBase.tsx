import { Row, Col } from 'antd'
import React from 'react'
import { AppInfoModel } from './types'
import {appInfoPath, toDateFormat} from './helper'
import { Link } from 'react-router-dom'

type AppBaseProps = {
  appInfo: AppInfoModel
}

export default function AppBase(props: AppBaseProps) {
  const appInfo = props.appInfo
  console.log(appInfo)
  return (
    <Row justify="center">
      <Col span={8} className="app-info">
        <div>{appInfo.name}</div>
        <img src={appInfo.current_version?.qrcode_image_url} alt=""/>
        <Link to={appInfoPath(appInfo.bundle_id, `${appInfo.os}`)}>bundle ID：{appInfo.bundle_id}</Link>
        <div>
            版本：{appInfo.current_version?.version} 
            (build {appInfo.current_version?.build}) 
        </div>
        <div>
          更新时间：{appInfo.current_version ? toDateFormat(appInfo.current_version.updated_at) : ''}
        </div>
      </Col>
    </Row>
  )
}