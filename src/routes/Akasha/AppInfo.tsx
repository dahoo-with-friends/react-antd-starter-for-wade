import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Row, Col, List, Button, Divider, message } from 'antd'
import './appinfo.less'
import { mockAndroidAppInfoModel, VersionInfoModel } from './types'
import { DEFAULT_PAGE_SIZE } from '../../constants'
import {toDateFormat} from './helper'
import AppBase from './AppBase'
import {getAppInfo, getAppVersions} from '../../api'


type AppVersionState = {
    versionInfos: VersionInfoModel[]
    isLoading: boolean
    pageIndex: number
}

const defaultAppVersionInfoState: AppVersionState = {
  isLoading: true,
  pageIndex: 0,
  versionInfos: []
}
  
export default function AppInfo() {
  const location = useLocation()
  const {bundleID, os} = useParams<{bundleID: string, os: string}>()

  const [appInfo, setAppInfoState] = useState(mockAndroidAppInfoModel)
  const [appVersionState, setAppVersionState] = useState(defaultAppVersionInfoState)

  function updateAppInfo(bundleID: string, os: string) {
    getAppInfo(bundleID, os).then((res)=>{
      if (ENV === 'development') console.log(`appInfo ${res}`)
      console.log(res)
      setAppInfoState(res)
    }, ()=>{
      setAppInfoState(mockAndroidAppInfoModel)
    })
  }

  function updateAppVersions(bundleID: string, os: string, pageIndex: number, pageSize=DEFAULT_PAGE_SIZE) {
    getAppVersions(bundleID, os, pageIndex, pageSize).then((res)=>{
      if (ENV === 'development') console.log(`appInfo ${res}`)
      if (!res || res.length == 0) {
        message.warn('no more versions')
        console.log(appVersionState)
        setAppVersionState({
          ...appVersionState,
          isLoading: false
        })
        return
      }
      setAppVersionState({
        versionInfos:appVersionState.versionInfos.concat(res), 
        isLoading: false,
        pageIndex: pageIndex
      })
    }, ()=>{
      setAppVersionState({
        ...appVersionState,
        isLoading: false
      })
    })
  }

  function onLoadMore() {
    updateAppVersions(bundleID, os, appVersionState.pageIndex+1)
  }

  useEffect(() => {
    updateAppInfo(bundleID, os)
    updateAppVersions(bundleID, os, 1)
  }, [])

  const loadMore =
  !appVersionState.isLoading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  ) : null
  
  return (
    <div>
      {AppBase(appInfo)}
      <Divider orientation="center">Versions</Divider>
      <Row justify="center" >
        <Col span={10} className="app-versions">
          <List
            
            loading={appVersionState.isLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            size="small"
            dataSource={appVersionState.versionInfos}
            renderItem={(item: VersionInfoModel) => (
              <List.Item>
                <Link to={`${location.pathname}/${item.sha1}`} key={item.sha1} style={{width: '100%'}}>
                  <span style={{float: 'left'}}>{item.version}({item.build})</span> 
                  <span style={{float: 'right'}}>{toDateFormat(item.updated_at)}</span>
                </Link>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  )
}