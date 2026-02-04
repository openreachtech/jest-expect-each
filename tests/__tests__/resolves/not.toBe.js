'use strict'

require('../../../lib/setup')
  .setup()

describe('expect.each', () => {
  describe('#resolves', () => {
    test('#toBe()', async () => {
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

      await expect(Promise.resolve(actualValues[0]))
        .resolves
        .not
        .toBe(expectedValues[0])

      // @ts-expect-error
      await expect.each(
        actualValues.map(it => Promise.resolve(it))
      )
        .resolves
        .not
        .toBe(expectedValues)
    })
  })
})
