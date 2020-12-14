import request from '../helpers/request'

// const API_PREFIX = '/api'

export const getAppInfo = (bundleID: string, os: string) => {
  const url = `/api/app/info?bundleID=${bundleID}&os=${os}`
  return request(url, {
    method: 'GET'
  })
}

export const getAppVersions = (bundleID: string, os: string, pageIndex: number, pageSize=20) => {
  const url = `/api/app/versions?bundleID=${bundleID}&os=${os}&pageIndex=${pageIndex}&pageSize=${pageSize}`
  return request(url, {
    method: 'GET'
  })
}