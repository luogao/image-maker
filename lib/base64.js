const path = require('path')
const fs = require('fs')
const ora = require('ora')

const { checkPathExisted, getFileInfo, getImagePrefix } = require('../utils')
const { BASE64MAXSIZE } = require('../constants')

const handleGenerateFail = spinner => err => {
  spinner.text = `生成base64失败：\n\n${err}`
  spinner.fail()
}

const handleGenerateSucceed = spinner => _output => {
  spinner.text = `生成base64成功`
  spinner.succeed()
  console.log('\n查看：', _output)
}

const base64 = async dir => {
  const spinner = ora(`生成base64中`).start()
  const failHandler = handleGenerateFail(spinner)
  const successHandler = handleGenerateSucceed(spinner)
  let _output = ''

  if (!checkPathExisted(dir)) {
    failHandler(`目标图片 ${dir} 不存在，请检查目标图片路径`)
    return false
  }

  try {
    const fileInfo = await getFileInfo(dir)
    if (fileInfo.size > BASE64MAXSIZE) {
      return failHandler('图片体积大于500 KB')
    }
    const imageData = fs.readFileSync(dir)
    const imageBase64Data = imageData.toString('base64')
    const imagePrefix = getImagePrefix(dir)
    _output = path.resolve(path.dirname(dir), path.join(`base64-result.txt`))
    fs.writeFile(_output, imagePrefix + imageBase64Data, 'utf8', err => {
      if (err) {
        failHandler(e)
        return false
      }
      successHandler(_output)
    })
  } catch (e) {
    failHandler(e)
  }
}

module.exports = (...arg) => {
  base64(...arg)
}
