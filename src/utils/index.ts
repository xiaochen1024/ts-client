type oType = {
  [k: string]: number
}

export function uuid() {
  let i
  let random
  let uuidStr: string = ''

  for (i = 0; i < 32; i++) {
    // tslint:disable-next-line:no-bitwise
    random = (Math.random() * 16) | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuidStr += '-'
    }
    // tslint:disable-next-line:no-bitwise
    uuidStr += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
      16
    )
  }

  return uuidStr
}

export function pluralize(count: number, word: string) {
  return count === 1 ? word : word + 's'
}

export const getQueryString = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

export const formatDate = (str: string, fmt: string) => {
  if (str) {
    const date = new Date(str)
    let format = fmt || 'yyyy-MM-dd hh:mm:ss'
    const o: oType = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? `${o[k]}`
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return format
  } else {
    return ''
  }
}
