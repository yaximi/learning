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

export {
  browserType
}
