const path = require('path')
const DEFAULTOUTPUTBASENAME = 'im-output'
exports.DEFAULTOUTPUTBASENAME
exports.CUSTOMCONFIGPATH = path.resolve(
  process.cwd(),
  path.join('imconfig.json')
)
exports.DEFAULTOUTPUT = path.resolve(
  process.cwd(),
  path.join('.', DEFAULTOUTPUTBASENAME)
)
