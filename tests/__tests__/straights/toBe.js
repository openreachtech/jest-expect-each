// @ts-check
'use strict'

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
    const expectedTable = actualTable

    // @ts-ignore
    expect.each(actualTable).toBe(expectedTable)
  })
})
