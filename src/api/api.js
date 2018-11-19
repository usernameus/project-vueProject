import axios from 'axios'
 
axios.defaults.baseURL = 'http://192.168.0.157:8080';

let serverurl = axios.defaults.baseURL;

export const requestLogin = params => { return axios.post(serverurl+'/user/login', params).then(res => res.data) };

export const addApplication = params => { return axios.post(serverurl+'/system/application/add', params).then(res => res.data) };

export const queryApplication = params => { return axios.post(serverurl+'/jsdp-web/rbac/application/show').then(res => res.data) };
 
export const deleteApplication = params => { return axios.post(serverurl+'/system/application/delete', params).then(res => res.data) };
