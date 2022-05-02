// @ts-check
'use strict'

require('../../../lib/setup').setup()

describe('expect.each', () => {
  describe('#rejects', () => {
    test('#toBe()', async () => {
      const actualTable = [
        'first error',
        'second error',
        'third error',
        'fourth error',
      ]
      const actualErrors = actualTable.map(it => Error(it))
      const expectedTable = actualTable

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
