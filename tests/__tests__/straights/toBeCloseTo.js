// @ts-check
'use strict'

require('../../../lib/setup').setup()

describe('expect.each', () => {
  test('#toBeCloseTo()', () => {
    const actualTable = [
      0.1 + 0.2,
    ]
    const expectedTable = [
      0.3,
    ]

    expect(actualTable[0])
      .toBe(0.30000000000000004)
    expect(actualTable[0]).not // <---- !!!!
      .toBe(expectedTable[0])

    expect(actualTable[0])
      .toBeCloseTo(expectedTable[0], 15)
    expect(actualTable[0]).not // <---- !!!!
      .toBeCloseTo(expectedTable[0], 16)

    // @ts-ignore
    expect.each(actualTable)
      .toBeCloseTo(
        expectedTable.map(it => [it, 15])
      )
  })
})
