import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAppVersion } from '../../api'
import { AppInfoModel, EmptyAppInfoModel } from './types'
import AppBase from './AppBase'


type AppVersionInfoState = {
  appInfo: AppInfoModel
}

const defaultAppInfoState: AppVersionInfoState = {
  appInfo: EmptyAppInfoModel
}

export default function AppVersionInfo() {
  const {versionID} = useParams<{bundleID: string, os: string, versionID: string}>()
  const [appInfoState, setAppInfoState] = useState(defaultAppInfoState)

  useEffect(()=>{
    getAppVersion(versionID).then((res)=>{
      setAppInfoState({
        appInfo: res
      })
    })
  }, [])

  return (
    <div>
      <AppBase appInfo={appInfoState.appInfo} />
    </div>
  )
}