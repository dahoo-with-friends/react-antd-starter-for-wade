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
export const EmptyVersionInfoModel: VersionInfoModel = {
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
    icon_url: string,
    os: OS,
    current_version?: VersionInfoModel,
}
export const EmptyAppInfoModel: AppInfoModel = {
  name: '...',
  bundle_id: '...',
  icon_url: 'https://qlab-space.oss-cn-hangzhou.aliyuncs.com/develop/assets/bilu_230x230.png',
  os: OS.Android,
  current_version: EmptyVersionInfoModel
}
