const fs = require('fs')
const path = require('path')

exports.checkPathExisted = path => {
  let ret = false
  try {
    ret = fs.existsSync(path)
  } catch (e) {
    ret = false
  }
  return ret
}

exports.fileNameGenerator = (output, originalName, type, size) => {
  return path.join(output, `${originalName}-${size[0]}x${size[1]}${type}`)
}

exports.makeDir = dir => {
  try {
    //是否能访问到这个文件，如果能访问到，说明这个文件已经存在，进入循环的下一步。
    //accessSync的第二个参数就是用来判断该文件是否能被读取
    fs.accessSync(dir, fs.constants.R_OK)
  } catch (e) {
    fs.mkdirSync(dir)
  }
}

exports.getFileInfo = file => {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

exports.getImagePrefix = dir => {
  const fileExtName = path.extname(dir).replace('.', '')
  switch (fileExtName) {
    case 'png':
      return 'data:image/png;base64,'
    case 'jpeg':
      return 'data:image/jpeg;base64,'
    case 'jpg':
      return 'data:image/jpg;base64,'
    case 'gif':
      return 'data:image/gif;base64,'
    default:
      return 'data:image/jpg;base64,'
  }
}
