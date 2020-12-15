import dayjs from 'dayjs'

export function toDateFormat(t0: number) {
  return dayjs(t0*1000).format('YYYY-MM-DD HH:mm:ss')
}

export function appInfoPath(bundleID: string, os: string) {
  return `/dashboard/app/${bundleID}/${os}`
}