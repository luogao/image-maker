const tinify = require('tinify')
const path = require('path')
const ora = require('ora')
const config = require('../imconfig.json')
const { checkPathExisted, fileNameGenerator, makeDir } = require('../utils')

tinify.key = config.tinifyKey

const handleGenerateFail = spinner => err => {
  spinner.text = `压缩图片失败：\n\n${err}`
  spinner.fail()
}

const handleGenerateSucceed = spinner => _output => {
  spinner.text = `压缩图片成功`
  spinner.succeed()
  console.log('\n查看', _output)
}

const spinner = ora(`图片压缩中`).start()
const failHandler = handleGenerateFail(spinner)
const successHandler = handleGenerateSucceed(spinner)

const tiny = (dir, options) => {
  if (!dir) return failHandler('请输入源图片路径！')
  const _target = dir
  const originalName = path.basename(_target)
  const _output =
    options.output || path.resolve(path.dirname(_target), path.join(`test-${originalName}`))

  if (!checkPathExisted(_target)) {
    failHandler(`目标图片 ${_target} 不存在，请检查目标图片路径`)
    return false
  }
  
  const source = tinify.fromFile(_target)
  source.toFile(_output, (err) => {
    if (err) {
      return failHandler(err)
    }
    successHandler(_output)
  })
}

module.exports = (...arg) => {
  tiny(...arg)
}
