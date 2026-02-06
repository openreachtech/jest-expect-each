'use strict'

require('../../../lib/setup-expect-each')
  .setupExpectEach()

describe('expect.each()', () => {
  describe('#rejects', () => {
    test('#toBe()', async () => {
      const actualValues = [
        'first error',
        'second error',
        'third error',
        'fourth error',
      ]
      const actualErrors = actualValues.map(it => Error(it))
      const expectedValues = actualValues

      await expect(Promise.reject(actualErrors[0]))
        .rejects
        .toThrow(expectedValues[0])

      // @ts-expect-error
      await expect.each(actualErrors.map(it => Promise.reject(it)))
        .rejects
        .toThrow(expectedValues)
    })
  })
})
