function createXHR () {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest()
  } else {
    throw new Error('No XHR object available.')
  }
}

const myAjax = {
  // data is an Object
  get: function (url, data) {
    return new Promise((resolve, reject) => {
      if (!url) {
        console.error('请输入请求地址')
        return
      }

      let query = []

      for (var key in data) {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      }

      query = query.join('&')

      const xhr = createXHR()

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          const status = xhr.status
          if (status >= 200 && status < 300) {
            resolve(xhr.responseText)
          } else {
            reject(status)
          }
        }
      }

      if (query) {
        url = `${url}?${query}`
      }

      xhr.open('GET', url, true)
      xhr.send(null)
    })
  },

  post: function (url, data) {
    return new Promise((resolve, reject) => {
      if (!url) {
        console.error('请输入请求地址')
        return
      }

      let query = []

      if (typeof data !== 'undefined') {
        for (var key in data) {
          query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        }
        query = query.join('&')
      }

      const xhr = createXHR()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          const status = xhr.status
          if (status >= 200 && status < 300) {
            resolve(xhr.responseText)
          } else {
            reject(status)
          }
        }
      }

      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(query)
    })
  }
}

export default myAjax
