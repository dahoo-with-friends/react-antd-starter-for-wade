import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAppInfo } from '../../api'
import { mockAndroidAppInfoModel } from './types'
import AppBase from './AppBase'


export default function AppVersionInfo() {
  const {bundleID, os} = useParams<{bundleID: string, os: string, versionID: string}>()

  const [appInfo, setAppInfoState] = useState(mockAndroidAppInfoModel)

  useEffect(()=>{
    getAppInfo(bundleID, os).then((res)=>{
      if (ENV === 'development') console.log(`appInfo ${res}`)
      console.log(res)
      setAppInfoState(res)
    }, ()=>{
      setAppInfoState(mockAndroidAppInfoModel)
    })
  })

  return (
    <div>
      {AppBase(appInfo)}
    </div>
  )
}