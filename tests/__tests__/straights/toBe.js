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
    const expectedTable = actualValues

    // @ts-ignore
    expect.each(actualValues).toBe(expectedTable)
  })
})
