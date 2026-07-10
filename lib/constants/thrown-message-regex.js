'use strict'

// -----------------------------------------------------------------------------

const COLOR_DEFAULT = String.raw `\x1B\[39m` // means '\\x1B\\[39m'
const COLOR_WHITE = String.raw `\x1B\[22m`
const COLOR_GRAY = String.raw `\x1B\[2m`
const COLOR_RED = String.raw `\x1B\[31m`

const pattern = String.raw `^(?:${COLOR_GRAY})?expect\((?:${COLOR_WHITE}${COLOR_RED})?received(?:${COLOR_DEFAULT}${COLOR_GRAY})?\)`

const INTENTIONAL_THROWN_MESSAGE_REGEX = new RegExp(pattern, 'u')

// -----------------------------------------------------------------------------

const LACKED_ARRAY_THROWN_MESSAGE_REGEX = /^expect\.each\(\) received lacked array/u
const EXCESS_ARRAY_THROWN_MESSAGE_REGEX = /^expect\.each\(\) received excess array/u

// -----------------------------------------------------------------------------

const THROWN_MESSAGE_REGEX = {
  INTENTIONAL: INTENTIONAL_THROWN_MESSAGE_REGEX,
  LACKED_ARRAY: LACKED_ARRAY_THROWN_MESSAGE_REGEX,
  EXCESS_ARRAY: EXCESS_ARRAY_THROWN_MESSAGE_REGEX,
}

module.exports = THROWN_MESSAGE_REGEX
