import './appinfo.less'
import { Card, ListView, Flex, Button } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import request from '../../helpers/request'

type BiluAndroidProps = {
  nothing?: any
}

type VersionInfo = {
  fileSize: number,
  version: string,
  build: string,
  qrcodeURL: string,
  sha1: string,
  updated_at: string
}

type AppInfoState = {
  appName: string,
  appBundleID: string,
  currentVersionInfo: VersionInfo
}

type AppVersionState = {
  versionInfos: VersionInfo[]
  isLoading: boolean
  datasource: any
}

type AppInfo = {
  appName: string,
  appBundleID: string,
  versionInfos: VersionInfo[]
}

export type AppInfoProps = {
  appBundleID: string,
  os: number
}

const defaultVersionInfo = {
  fileSize: 1024000,
  version: '1.2.5',
  build: '15',
  qrcodeURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  sha1: 'abcdefg',
  updated_at: ''
}

export function BiluAndroid(props: AppInfoProps) {

  let pageIndex = 0

  const defaultAppInfoState: AppInfoState = {
    appName: '',
    appBundleID: '',
    currentVersionInfo: defaultVersionInfo
  }

  const defaultAppVersionInfoState: AppVersionState = {
    isLoading: false,
    versionInfos: [
      defaultVersionInfo,
      defaultVersionInfo
    ],
    datasource: new ListView.DataSource({
      rowHasChanged: (row1: React.Component, row2: React.Component) => row1 !== row2,
    })
  }

  const [appInfo, setAppInfo] = useState(defaultAppInfoState)
  const [appVersion, setAppVersion] = useState(defaultAppVersionInfoState)

  const updateAppInfo = async () => {
    const bundleID = 'com.my.hashtag'
    const os = 2
    const url = `/api/app/info?bundleID=${bundleID}&os=${os}`
    const appInfo = await request(url, {
      method: 'GET'
    }) as AppInfoState
    if (ENV === 'development') console.log(`appInfo ${appInfo}`)
    setAppInfo(appInfo)
  }

  async function getAppVersion(bundleID: string, os: number, pageIndex: number, pageSize=20) {
    const bundleID = 'com.my.hashtag'
    const os = 2
    const url = `/api/app/versions?bundleID=${bundleID}&os=${os}`
    const versionInfos = await request(url, {
      method: 'GET'
    }) as VersionInfo[]
    if (ENV === 'development') console.log(`appVersion ${appVersion}`)
  }

  const updateAppVersion = async () => {
    const bundleID = 'com.my.hashtag'
    const os = 2
    const url = `/api/app/versions?bundleID=${bundleID}&os=${os}`
    const versionInfos = await request(url, {
      method: 'GET'
    }) as VersionInfo[]
    if (ENV === 'development') console.log(`appVersion ${appVersion}`)
    setAppVersion({
      versionInfos:versionInfos, 
      isLoading: false, 
      datasource: appVersion.datasource.cloneWithRows(versionInfos)
    })
    pageIndex++
  }

  useEffect(() => {
    updateAppInfo()
    updateAppVersion()
  }, [])

  function toDateFormat(t0: string) {
    const date = new Date(t0)
    const hour = date.getHours()
    const formatHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${hour}:${date.getMinutes()}:${date.getSeconds()}`
  }

  function onEndReached(event: Event) {
    console.log(`onEndReached ${event}`)
  }

  const row = (rowData: VersionInfo, sectionID: React.Key, rowID: React.Key) => {
    return (
      <Button key={rowID} className="appversion-row">
        <span style={{float: 'left'}}>{rowData.version}({rowData.build})</span> 
        <span style={{float: 'right'}}>{toDateFormat(rowData.updated_at)}</span>
      </Button>
    )
  }

  return (
    <div className="appinfo"> 
      <Card>
        <Card.Body className="appinfo-body">
          <div>{appInfo.appName}</div>
          <img src={appInfo.currentVersionInfo.qrcodeURL} alt=""/>
          <div>bundle ID：{appInfo.appBundleID}</div>
          <div>
            版本：{appInfo.currentVersionInfo.version} 
            (build {appInfo.currentVersionInfo.build}) 
          </div>
          <div>
          更新时间：{toDateFormat(appInfo.currentVersionInfo.updated_at)}
          </div>
        </Card.Body>
      </Card>
      <ListView
        dataSource={appVersion.datasource}
        renderHeader={() => <span>历史版本</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {appVersion.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        className="am-list"
        pageSize={10}
        useBodyScroll
        onScroll={() => { console.log('scroll') }}
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
      />
    </div>
  )
}
