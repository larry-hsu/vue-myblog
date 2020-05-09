const browserInfo = (function () {
  var pageWidth = window.innerWidth
  var pageHeight = window.innerHeight

  if (typeof pageWidth !== 'number') {
    if (document.compatMode === 'CSS1Compat') {
      pageWidth = document.documentElement.clientWidth
      pageHeight = document.documentElement.clientHeight
    } else {
      pageWidth = document.body.clientWidth
      pageHeight = document.body.clientHeight
    }
  }

  return {
    pageWidth,
    pageHeight
  }
}())

export default browserInfo
