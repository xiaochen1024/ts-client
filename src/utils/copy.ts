const copy = (input: string) => {
  const el: HTMLTextAreaElement = document.createElement('textarea')

  el.value = input

  // Prevent keyboard from showing on mobile
  el.setAttribute('readonly', '')

  // el.style.contain = "strict";
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.fontSize = '12pt' // Prevent zooming on iOS

  const selection = document.getSelection()
  let originalRange
  if (selection !== null && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  document.body.appendChild(el)
  el.select()

  // Explicit selection workaround for iOS
  el.selectionStart = 0
  el.selectionEnd = input.length

  let success = false
  try {
    success = document.execCommand('copy')
  } catch (err) {
    console.log(err)
  }

  document.body.removeChild(el)

  if (selection !== null && originalRange) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  return success
}

export default copy
