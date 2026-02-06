'use strict'

const THROWN_MESSAGE_REGEX = require('../lib/constants/thrown-message-regex')

globalThis.THROWN_MESSAGE_REGEX = THROWN_MESSAGE_REGEX

const {
  setup,
} = require('../lib/setup')

setup()
