const CookieUtil = {
  set: function (name, value, day, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' +
                     encodeURIComponent(value)

    if (day) {
      const date = new Date()
      date.setDate(date.getDate() + day) // 日期向后加上day天
      cookieText += '; expires=' + date
    }

    if (path) {
      cookieText += '; path=' + path
    }

    if (domain) {
      cookieText += '; domain=' + domain
    }

    if (secure) {
      cookieText += '; secure'
    }

    document.cookie = cookieText
  },

  get: function (name) {
    var cookieName = encodeURIComponent(name) + '='
    var cookieStart = document.cookie.indexOf(cookieName)
    var cookieValue = null

    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(document.cookie.substring(
        cookieStart + cookieName.length, cookieEnd
      ))
    }

    return cookieValue
  },

  remove: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure)
  }
}

export default CookieUtil
