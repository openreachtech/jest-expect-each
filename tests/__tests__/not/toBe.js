// @ts-check
'use strict'

require('../../../lib/setup').setup()

describe('expect.each', () => {
  test('#toBe()', () => {
    const actualTable = [
      undefined,
      null,
      false,
      true,
      'string',
      0,
      100,
    ]
    const expectedTable = Array(actualTable.length).fill(-1000)

    // @ts-ignore
    expect.each(actualTable).not.toBe(expectedTable)
  })
})
