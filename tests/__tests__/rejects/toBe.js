// @ts-check
'use strict'

require('../../../lib/setup').setup()

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
      const expectedTable = actualValues

      await expect(Promise.reject(actualErrors[0]))
        .rejects
        .toThrowError(expectedTable[0])

      // @ts-ignore
      await expect.each(actualErrors.map(it => Promise.reject(it)))
        .rejects
        .toThrowError(expectedTable)
    })
  })
})
