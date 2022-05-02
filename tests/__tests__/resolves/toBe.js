// @ts-check
'use strict'

require('../../../lib/setup').setup()

describe('expect.each', () => {
  describe('#resolves', () => {
    test('#toBe()', async () => {
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

      await expect(Promise.resolve(actualTable[0]))
        .resolves
        .toBe(expectedTable[0])

      // @ts-ignore
      await expect.each(
        actualTable.map(it => Promise.resolve(it))
      )
        .resolves
        .toBe(expectedTable)
    })
  })
})
