const deBounceThrottle = {
  throttle: function (fun, delay) {
    var last = 0
    return function () {
      var args = arguments
      // new Date()参与运算会自动转换为毫秒数
      var now = +new Date()
      var _this = this
      // 时间间隔大于延迟时间才执行
      if (now - last > delay) {
        fun.apply(_this, args)
        last = now
      }
    }
  },

  deBounce: function (fun, delay) {
    return function () {
      var args = arguments
      clearTimeout(fun.id)
      fun.id = setTimeout(() => {
        fun.apply(this, args)
      }, delay)
    }
  }
}

export default deBounceThrottle
