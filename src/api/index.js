import axios from 'axios'
import qs from 'query-string'
import config from '@/config'

function ajax(method, path, data) {
  const url = config.API_HOST + path
  if(method == 'get'){
    return axios({
      method,
      url,
      params:data,
    }).then(res => {
      return res.data
    })
  }
  if(method == 'post'){
    return axios({
      method,
      url,
      data:qs.stringify(data),
    }).then(res => {
      return res.data
    })
  }
}

export function enroll (data) {
  return ajax('post','BaContacts/save',data)
}
