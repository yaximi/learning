import axios from 'axios'
const baseUrl = 'http://localhost:8888'

const upload = (formData) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/api/upload`, formData, {
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

const mysubmit = params => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/api/submit`, {
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
  mysubmit
}
