import module from 'module'
const require = module.createRequire(import.meta.url)

const setupExpectEach = require('./setup-expect-each.js')

export default setupExpectEach
