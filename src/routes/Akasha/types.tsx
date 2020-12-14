import BiluIcon from '../../assets/bilu_230x230.png'


export enum OS {
    Android = 1,
    iOS = 2
}

/** 应用版本信息 */ 
export type VersionInfoModel = {
    id: number,
    file_size: number,
    version: string,
    build: string,
    qrcode_image_url: string,
    sha1: string,
    updated_at: string
}
export const mockVersionInfoModel: VersionInfoModel = {
  id: 1,
  file_size: 1024000,
  version: '1.2.5',
  build: '15',
  qrcode_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  sha1: 'abcdefg',
  updated_at: '2020-10-10T01:00:03'
}


/** 应用信息 */ 
export type AppInfoModel = {
    name: string,
    bundle_id: string,
    iconUrl: string,
    os: OS,
    last_version: VersionInfoModel
}
export const mockAndroidAppInfoModel: AppInfoModel = {
  name: 'Bilu Android',
  bundle_id: 'com.my.hashtag',
  iconUrl: BiluIcon,
  os: OS.Android,
  last_version: mockVersionInfoModel
}
export const mockIOSAppInfoModel: AppInfoModel = {
  name: 'Bilu iOS',
  bundle_id: 'com.biluapp.cn',
  iconUrl: BiluIcon,
  os: OS.iOS,
  last_version: mockVersionInfoModel
}