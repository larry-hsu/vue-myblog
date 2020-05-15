/**
 * 返回一个数组，表示分好的页面
 * @param {Number} cur
 * @param {Number} total
 * @param {Number} around
 */
const makePage = function (cur, total, around = 2) {
  cur = Number(cur)
  total = Number(total)

  var pages = []
  // 上一页下一页+首页尾页+省略号2个+当前页1个+当前页左右各两个
  const baseCount = 2 + 2 + 2 + 1 + around * 2
  // 首页+省略号代表的元素个数+当前页左边元素个数+1
  const startPos = 1 + 2 + around + 1
  // 总页数-省略号代表的元素个数-当前页右边元素个数-1
  const endPos = total - 2 - 2 - 1
  // 除去一定会出现的元素后，剩下需要动态变化的元素个数
  const surPlus = baseCount - 4

  // 全部显示，不出现省略号
  if (total <= baseCount - 2) {
    pages = Array.from({ length: total }, (v, i) => i + 1)
  } else { // 需要出现省略号
    if (cur < startPos) { // 只在后面出现省略号
      pages = [...Array.from({ length: surPlus }, (v, i) => i + 1), '...', total]
    } else if (cur > endPos) { // 只在前面出现省略号
      pages = [1, '...', ...Array.from({ length: surPlus }, (v, i) => total - surPlus + i + 1)]
    } else { // 两边都出现省略号
      pages = [1, '...', ...Array.from({ length: around * 2 + 1 }, (v, i) => cur - around + i), '...', total]
    }
  }

  return pages
}

export default makePage
