import './index.less'
import React from 'react'
import { Layout } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import { Form, FormItem, FormItemType, FormValues } from '@wangdahoo/antd-easy-form'
import trademark from '../../assets/trademark.png'
import bg from '../../assets/bg_login_page.svg'
// import request from '../../helpers/request'
import { login } from '../../helpers/storage'

const { Content } = Layout

function Login () {
  async function onSubmit (form: FormValues) {
    console.log('LoginForm =>', form)

    // const { token, uid, authority } = await request('/api/login', {
    //   method: 'POST',
    //   body: form
    // })
    // console.log(authority)
    // login(uid, token)

    login(1, 'this\'s not a token')
    window.location.href = '/home'
  }

  const loginFormItems: FormItem[] = [
    {
      name: 'username',
      itemType: FormItemType.INPUT,
      labelText: '用户名',
      placeholder: '请输入用户名',
      defaultValue: 'user',
      required: true,
      re: /^[A-Za-z\d]{4,20}$/,
      prefix: <UserOutlined />
    },
    {
      name: 'password',
      itemType: FormItemType.PASSWORD,
      labelText: '密码',
      placeholder: '请输入密码',
      defaultValue: 'password',
      required: true,
      re: /^[A-Za-z\d_,.?/!@#$%^&*()-=+~|\\]{4,20}$/,
      prefix: <KeyOutlined />
    }
  ]

  return (
    <Layout className='page-login' style={{ backgroundImage: `url(${bg})` }}>
      <Content>
        <div className='login-form-wrapper'>
          <div className='logo'>
            <img src={trademark} alt="trademark"/>
            <span className='app-name'>{APP_NAME}</span>
          </div>

          <Form
            style={{
              margin: '0 auto',
              padding: 25,
              borderRadius: 8
            }}
            formWidth={500}
            formWidthUnit={'px'}
            items={loginFormItems}
            labelWidth={80}
            submitText={'登录'}
            onSubmit={onSubmit}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default Login
