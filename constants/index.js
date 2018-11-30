const path = require('path')

exports.DEFAULTOUTPUTBASENAME = 'im-output'
exports.CUSTOMCONFIGPATH = path.resolve(
  process.cwd(),
  path.join('imconfig.json')
)
exports.DEFAULTOUTPUT = path.resolve(
  process.cwd(),
  path.join('.', DEFAULTOUTPUTBASENAME)
)
