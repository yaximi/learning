import axios from 'axios'
import Constant from 'common/constant'

const upload = (formData) => new Promise((resolve, reject) => {
  axios.post(`${Constant.LINKAGE.serverAddress}/api/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      if (res.data.error === '0') {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
    .catch(err => {
      reject(err)
    })
})

const submit = params => new Promise((resolve, reject) => {
  axios.post(`${Constant.LINKAGE.serverAddress}/api/submit`, {
    'user_code': (params.userCode || '') + '',
    'nickname': (params.nickname || '') + '',
    'rich_text': (params.richText || '') + ''
  })
    .then(res => {
      if (res.data.error === '0') {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
    .catch(err => {
      reject(err)
    })
})

export {
  upload,
  submit
}
