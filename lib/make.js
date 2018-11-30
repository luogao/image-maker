const sharp = require('sharp')
const path = require('path')
const ora = require('ora')

const { checkPathExisted, fileNameGenerator, makeDir } = require('../utils')
const { CUSTOMCONFIGPATH, DEFAULTOUTPUT } = require('../constants')
const defaultConfig = require('../imconfig')

if (!checkPathExisted(DEFAULTOUTPUT)) {
  makeDir(DEFAULTOUTPUT)
}
const config = checkPathExisted(CUSTOMCONFIGPATH)
  ? require(CUSTOMCONFIGPATH)
  : defaultConfig

const configIconSizeArr = config.iconSize || defaultConfig.iconSize

const handleGenerateFail = spinner => err => {
  spinner.text = `生成图片失败：\n\n${err}`
  spinner.fail()
}

const handleGenerateSucceed = spinner => _output => {
  spinner.text = `生成图片成功`
  spinner.succeed()
  console.log('\n查看', _output)
}

const setup = (target, output) => images => {
  const fileExtName = path.extname(target)
  const originalName = path.basename(target).replace(fileExtName, '')
  return images.map(image => {
    const outputName = fileNameGenerator(
      output,
      originalName,
      fileExtName,
      image
    )
    return sharp(target)
      .resize(image[0], image[1])
      .toFile(outputName)
  })
}

const make = async (dir, options) => {
  const spinner = ora(`生成图片中`).start()
  const failHandler = handleGenerateFail(spinner)
  const successHandler = handleGenerateSucceed(spinner)
  const _target = dir
  const _output = options.output || DEFAULTOUTPUT

  if (!checkPathExisted(_target)) {
    failHandler(`目标图片 ${_target} 不存在，请检查目标图片路径`)
    return false
  }
  if (!checkPathExisted(_output)) {
    failHandler(`输出路径错误, ${_output} 不存在`)
    return false
  }

  try {
    await Promise.all(setup(_target, _output)(configIconSizeArr))
    successHandler(_output)
  } catch (e) {
    failHandler(e)
  }
}

module.exports = (...arg) => {
  make(...arg)
}
