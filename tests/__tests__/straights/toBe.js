'use strict'

require('../../../lib/setup')
  .setup()

describe('expect.each()', () => {
  describe('#toBe()', () => {
    describe('same length of array', () => {
      const table = [
        { actualValues: [undefined, null, false, true, 'string', 0] },
        { actualValues: [undefined, null, false, true, 'string'] },
        { actualValues: [undefined, null, false, true] },
        { actualValues: [undefined, null, false] },
        { actualValues: [undefined, null] },
        { actualValues: [undefined] },
        { actualValues: [] },
      ]

      test.each(table)('length: $actualValues.length', ({ actualValues }) => {
        const expectedValues = actualValues

        // @ts-expect-error
        expect.each(actualValues)
          .toBe(expectedValues)
      })
    })

    describe('different length of array', () => {
      describe('received.length < expected.length', () => {
        const table = [
          { actualValues: [undefined, null, false, true, 'string', 0] },
          { actualValues: [undefined, null, false, true, 'string'] },
          { actualValues: [undefined, null, false, true] },
          { actualValues: [undefined, null, false] },
          { actualValues: [undefined, null] },
          { actualValues: [undefined] },
          { actualValues: [] },
        ]
        const expectedValues = [
          undefined,
          null,
          false,
          true,
          'string',
          0,
          100,
        ]
        const errorMessage = 'expect.each() received lacked array'

        test.each(table)(`actual[$actualValues.length] < expected[${expectedValues.length}]`, ({ actualValues }) => {
          expect(
            // @ts-expect-error
            () => expect.each(actualValues)
              .toBe(expectedValues)
          )
            .toThrow(errorMessage)
        })
      })

      describe('different length of array', () => {
        describe('received.length > expected.length', () => {
          const table = [
            { expectedValues: [undefined, null, false, true, 'string', 0] },
            { expectedValues: [undefined, null, false, true, 'string'] },
            { expectedValues: [undefined, null, false, true] },
            { expectedValues: [undefined, null, false] },
            { expectedValues: [undefined, null] },
            { expectedValues: [undefined] },
            { expectedValues: [] },
          ]
          const actualValues = [
            undefined,
            null,
            false,
            true,
            'string',
            0,
            100,
          ]
          const errorMessage = 'expect.each() received excess array'

          test.each(table)(`actual[${actualValues.length}] < expected[$expectedValues.length]`, ({ expectedValues }) => {
            // @ts-expect-error
            expect(() => expect.each(actualValues).toBe(expectedValues))
              .toThrow(errorMessage)
          })
        })
      })
    })
  })
})
