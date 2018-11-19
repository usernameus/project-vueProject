import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
 
import { LoginUsers, users } from './data/user'
import { applicationDatas } from './data/application'

export default {
 
    init() {
        let mock = new MockAdapter(axios)
            // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        })
 
        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        })
 
        // 登录
        mock.onPost('/user/login').reply(arg => {
            let { username, password } = JSON.parse(arg.data)
            return new Promise((resolve, reject) => {
                let token = null
 
 
                let hasUser = LoginUsers.some(u => {
                    if (u.username === username && u.password === password) {
                        token = 'adminXXXXXX'
                        return true
                    }
                })
 
                if (hasUser) {
                    resolve([200, { code: 200, msg: '请求成功', token: token }])
                } else {
                    resolve([200, { code: 500, msg: '账号或密码错误' }])
                }
 
            })
        })
        mock.onPost('/system/application/add').reply(arg => {
            let { loginname, nickname,email,cellphone } = JSON.parse(arg.data)
            return new Promise((resolve, reject) => {
                    resolve([200, { code: 200, msg: '请求成功',data:null}])
  
            })
        })   
         mock.onPost('/system/application/delete').reply(arg => {
            let { loginname, nickname,email,cellphone } = JSON.parse(arg.data)
            return new Promise((resolve, reject) => {
                    resolve([200, { code: 200, msg: '删除成功',data:null}])
  
            })
        })   
       mock.onPost('/system/application/querylist').reply(arg => { 
            let params = JSON.parse(arg.data)
            let {currentPage,pageNo} = params
            let datas = {
                total:500,
                list:applicationDatas.list.slice(0,pageNo)
            }
            return new Promise((resolve, reject) => {
                    resolve([200, { code: 200, msg: '请求成功',applicationData:datas}])
  
            })
        })
    }
 
}
