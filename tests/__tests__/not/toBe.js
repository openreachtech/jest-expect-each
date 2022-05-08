// @ts-check
'use strict'

require('../../../lib/setup').setup()

describe('expect.each', () => {
  test('#toBe()', () => {
    const actualValues = [
      undefined,
      null,
      false,
      true,
      'string',
      0,
      100,
    ]
    const expectedTable = Array(actualValues.length).fill(-1000)

    // @ts-ignore
    expect.each(actualValues).not.toBe(expectedTable)
  })
})
