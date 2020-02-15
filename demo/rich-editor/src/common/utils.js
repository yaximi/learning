const browserType = () => {
  let userAgent = navigator.userAgent
  let isOpera = false
  if (userAgent.includes('Edge')) {
    return 'Edge'
  }
  if (userAgent.includes('.NET')) {
    return 'IE'
  }
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    isOpera = true
    return 'Opera'
  }
  if (userAgent.includes('Firefox')) {
    return 'FF'
  }
  if (userAgent.includes('Chrome')) {
    return 'Chrome'
  }
  if (userAgent.includes('Safari')) {
    return 'Safari'
  }
  if (userAgent.includes('compatible') && userAgent.includes('MSIE') && !isOpera) {
    return 'IE'
  }
}

const deepClone = obj => {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj[key] === obj) {
        continue
      }
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

export {
  browserType,
  deepClone
}
