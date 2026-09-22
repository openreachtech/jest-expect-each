import THROWN_MESSAGE_REGEX from '../lib/constants/thrown-message-regex.js'

import {
  setupExpectEach,
} from '../lib/setup-expect-each.js'

globalThis.THROWN_MESSAGE_REGEX = THROWN_MESSAGE_REGEX

setupExpectEach()
