const _get = (name: string) => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

const _set = (name: string, value: any, days?: number) => {
  const exp = new Date()
  exp.setTime(exp.getTime() + (days || 2) * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toUTCString()
}

const _remove = (name: string) => {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const val = _get(name)
  if (val !== null) {
    document.cookie = name + '=' + val + ';path=/;expires=' + exp.toUTCString()
  }
}

export default {
  get: _get,
  set: _set,
  remove: _remove
}
