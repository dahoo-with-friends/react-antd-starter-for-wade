import request from '../helpers/request'

// const API_PREFIX = '/api'

export const getAppInfo = (bundleID: string, os: string) => {
  const url = `/api/app/info?bundle_id=${bundleID}&os=${os}`
  return request(url, {
    method: 'GET'
  })
}

export const getAppVersions = (bundleID: string, os: string, pageIndex: number, pageSize=20) => {
  const url = `/api/app/versions?bundle_id=${bundleID}&os=${os}&page=${pageIndex}&page_size=${pageSize}`
  return request(url, {
    method: 'GET'
  })
}

export const getAppVersion = (versionID: string) => {
  const url = `/api/app/version?id=${versionID}`
  return request(url, {
    method: 'GET'
  })
}

export const getAppList = () => {
  const url = '/api/app/list'
  return request(url, {
    method: 'GET'
  })
}
