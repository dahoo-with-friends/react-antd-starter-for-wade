import Storage from 'storage-js-iso'
import { KEY_UID, KEY_TOKEN, KEY_SIDER_COLLAPSED } from '../constants'
import cookie from './cookie'

export const getUid = () => Storage.get(KEY_UID)

export const getToken = () => Storage.get(KEY_TOKEN)

export const login = (uid: number, token: string) => {
  Storage.set(KEY_UID, uid)
  Storage.set(KEY_TOKEN, token)

  if (ENV === 'development') cookie.set(KEY_TOKEN, token)
}

export const logout = () => {
  Storage.remove(KEY_UID)
  Storage.remove(KEY_TOKEN)

  if (ENV === 'development') cookie.remove(KEY_TOKEN)
}

export const getSiderCollapsed = () => Storage.get(KEY_SIDER_COLLAPSED) || false

export const setSiderCollapsed = (collapsed: boolean) => Storage.set(KEY_SIDER_COLLAPSED, collapsed)

export default Storage
