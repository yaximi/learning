import axios from 'axios'
const baseUrl = 'http://10.176.168.77:8888'

const upload = formData => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/api/upload`, {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.error === '0') {
        resolve(res.data)
      } else {
        reject(res)
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
        reject(res)
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
