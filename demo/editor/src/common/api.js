const baseUrl = 'http://10.176.168.77:8888'

const upload = formData => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/upload`, {
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

export {
  upload
}
