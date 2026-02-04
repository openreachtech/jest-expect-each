'use strict'

require('../../../lib/setup')
  .setup()

describe('expect.each', () => {
  describe('#rejects', () => {
    test('#toBe()', async () => {
      const actualValues = [
        'first error',
        'second error',
        'third error',
        'fourth error',
      ]
      const actualErrors = actualValues.map(it => Error(it))
      const expectedValues = Array(actualValues.length)
        .fill('unknown error')

      await expect(Promise.reject(actualErrors[0]))
        .rejects
        .not
        .toThrowError(expectedValues[0])

      // @ts-expect-error
      await expect.each(actualErrors.map(it => Promise.reject(it)))
        .rejects
        .not
        .toThrowError(expectedValues)
    })
  })
})
