'use strict'

require('../../../lib/setup').setup()

describe('expect.each', () => {
  test('#toBeCloseTo()', () => {
    const actualValues = [
      0.1 + 0.2,
    ]
    const expectedValues = [
      0.3,
    ]

    expect(actualValues[0])
      .toBe(0.30000000000000004)
    expect(actualValues[0]).not // <---- !!!!
      .toBe(expectedValues[0])

    expect(actualValues[0])
      .toBeCloseTo(expectedValues[0], 15)
    expect(actualValues[0]).not // <---- !!!!
      .toBeCloseTo(expectedValues[0], 16)

    // @ts-expect-error
    expect.each(actualValues)
      .toBeCloseTo(
        expectedValues.map(it => [it, 15])
      )
  })
})
