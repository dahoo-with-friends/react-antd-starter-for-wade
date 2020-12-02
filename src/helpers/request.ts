import _ from 'lodash'
import { notification } from 'antd'
import { getToken } from './storage'

const codeMessage: {[key: number]: string} = {
  201: '已保存',
  204: '已删除',
  400: '表单校验错误',
  401: '没有权限',
  403: '请先登录',
  500: '出错了',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时'
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const message = codeMessage[response.status] || response.statusText
  const err = new Error(message) as (Error & { response: any })
  err.response = response
  throw err
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url: string, options: any): Promise<any> {
  // ie 浏览器不支持fetch 防止浏览器缓存GET请求结果
  url += (_.indexOf(url, '?') > -1 ? '&' : '?') + `t=${Date.now()}`

  const defaultOptions = {
    // credentials: 'include',
  }

  // 取自定义的 option
  const customErrorHandler = options && options.customErrorHandler

  const newOptions = {
    ...defaultOptions,
    ..._.omit(options, ['customErrorHandler'])
  } as any

  if (!newOptions.headers) newOptions.headers = {
    Accept: 'application/json'
  }

  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'PATCH') {
    if (!(newOptions.body instanceof FormData)) {
      if (_.isObject(newOptions.body)) {
        // 这里 post 请求默认按 application/json 方式提交
        newOptions.headers['Content-Type'] = 'application/json; charset=utf-8'
        newOptions.headers['Accept'] = 'application/json'
        newOptions.body = JSON.stringify(newOptions.body)
      } else {
        newOptions.headers['Content-Type'] = 'text/plain'
      }
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers
      }
    }
  }

  const customHeaders = {
    ...(() => {
      const token = getToken()
      return token ? {
        [JWT_HEADER]: token
      }: {}
    })()
  }
  // 这里可以加自定义头
  newOptions.headers = { ...newOptions.headers, ...customHeaders }

  const notify = (e: Error & { status: number } | { status?: any, message?: string }, cb?: (e: Error) => void) => {
    const { status = 0, message } = e

    notification.error({
      message: `请求失败 ${status || ''}`,
      description: message || codeMessage[status] || ''
    })

    if (cb) cb(e as Error)
  }

  return new Promise((resolve, reject) => {
    fetch(`${BACKEND}${url}`, newOptions)
      .then(checkStatus)
      .then(response => {
        if (response.status === 204) {
          resolve({})
        } else {
          resolve(response.json())
        }
      })
      .catch(e => {
        if (e.response) {
          const status = e.response.status

          if (status === 403) { // 请先登录
            notify({ status }, () => setTimeout(() => window.location.href = '/', 1000))
          } else if (status === 400) {
            e.response
              .json()
              .then((res: any) => {
                if (customErrorHandler) {
                  customErrorHandler(res)
                  console.error(e)
                  return
                }

                notify({ ...res, status }, reject)
              })
              .catch(() => notify({ status }, reject))
          } else {
            notify({ status }, reject)
          }
        } else {
          console.error(e)
          notify({ message: '连接失败，请检查网络' })
        }
      })
  })
}

export const makeForm = (obj: {[key: string]: any}) => {
  const form = new FormData()
  for (const k in obj) {
    form.append(k, obj[k])
  }
  return form
}
