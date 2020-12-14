export function toDateFormat(t0: string) {
  function fmt0(num: number) {return num<10? `0${num}` : num}
  const date = new Date(t0)
  return `${date.getFullYear()}-${fmt0(date.getMonth())}-${fmt0(date.getDay())} ${fmt0(date.getHours())}:${fmt0(date.getMinutes())}:${fmt0(date.getSeconds())}`
}

export function appInfoPath(bundleID: string, os: string) {
  return `/dashboard/app/${bundleID}/${os}`
}