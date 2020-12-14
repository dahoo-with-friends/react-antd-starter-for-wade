import BiluIcon from '../../assets/bilu_230x230.png'


export enum OS {
    Android = 1,
    iOS = 2
}

/** 应用版本信息 */ 
export type VersionInfoModel = {
    fileSize: number,
    version: string,
    build: string,
    qrcodeURL: string,
    sha1: string,
    updated_at: string
}
export const mockVersionInfoModel: VersionInfoModel = {
  fileSize: 1024000,
  version: '1.2.5',
  build: '15',
  qrcodeURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  sha1: 'abcdefg',
  updated_at: '2020-10-10T01:00:03'
}


/** 应用信息 */ 
export type AppInfoModel = {
    appName: string,
    appBundleID: string,
    iconUrl: string,
    os: OS,
    currentVersionInfo: VersionInfoModel
}
export const mockAndroidAppInfoModel: AppInfoModel = {
  appName: 'Bilu Android',
  appBundleID: 'com.bilu.android',
  iconUrl: BiluIcon,
  os: OS.Android,
  currentVersionInfo: mockVersionInfoModel
}
export const mockIOSAppInfoModel: AppInfoModel = {
  appName: 'Bilu iOS',
  appBundleID: 'com.bilu.ios',
  iconUrl: BiluIcon,
  os: OS.iOS,
  currentVersionInfo: mockVersionInfoModel
}