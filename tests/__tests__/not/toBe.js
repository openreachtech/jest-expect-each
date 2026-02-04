'use strict'

require('../../../lib/setup')
  .setup()

describe('expect.each()', () => {
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
    const expectedValues = Array(actualValues.length)
      .fill(-1000)

    // @ts-expect-error
    expect.each(actualValues)
      .not
      .toBe(expectedValues)
  })
})
