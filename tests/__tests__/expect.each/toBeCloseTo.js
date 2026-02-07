'use strict'

describe('expect.each()', () => {
  describe('.toBeCloseTo()', () => {
    /**
     * @type {Array<{
     *   values: Array<number>
     *   matchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     *   unmatchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     * }>}
     */
    const cases = [
      {
        values: [
          0.123011,
          0.123012,
          0.123013,
        ],
        matchedExpectedCases: [
          { expected: [0.123, 1] },
          { expected: [0.123, 2] },
          { expected: [0.123, 3] },
          { expected: [0.123, 4] },
          { expected: [0.12301, 5] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.1230, 5] },
          { expected: [0.12301, 6] },
        ],
      },
      {
        values: [
          0.1 + 0.2, // 0.30000000000000004
          0.4 - 0.1, // 0.30000000000000004
        ],
        matchedExpectedCases: [
          { expected: [0.3, 14] },
          { expected: [0.3, 15] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.3, 16] },
          { expected: [0.3, 17] },
        ],
      },
    ]

    describe.each(cases)('values: $values', ({ values, matchedExpectedCases, unmatchedExpectedCases }) => {
      describe('matched', () => {
        test.each(matchedExpectedCases)('expected: $expected', ({ expected }) => {
          expect.each(values)
            .toBeCloseTo(...expected)
        })
      })

      describe('unmatched to throw', () => {
        test.each(unmatchedExpectedCases)('expected: $expected', ({ expected }) => {
          expect(() =>
            expect.each(values)
              .toBeCloseTo(...expected)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.not.toBeCloseTo()', () => {
    /**
     * @type {Array<{
     *   values: Array<number>
     *   matchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     *   unmatchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     * }>}
     */
    const cases = [
      {
        values: [
          0.123011,
          0.123012,
          0.123013,
        ],
        matchedExpectedCases: [
          { expected: [0.1230, 5] },
          { expected: [0.12301, 6] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.123, 1] },
          { expected: [0.123, 2] },
          { expected: [0.123, 3] },
          { expected: [0.123, 4] },
          { expected: [0.12301, 5] },
        ],
      },
      {
        values: [
          0.1 + 0.2, // 0.30000000000000004
          0.4 - 0.1, // 0.30000000000000004
        ],
        matchedExpectedCases: [
          { expected: [0.3, 16] },
          { expected: [0.3, 17] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.3, 14] },
          { expected: [0.3, 15] },
        ],
      },
    ]

    describe.each(cases)('values: $values', ({ values, matchedExpectedCases, unmatchedExpectedCases }) => {
      describe('matched', () => {
        test.each(matchedExpectedCases)('expected: $expected', ({ expected }) => {
          expect.each(values)
            .not
            .toBeCloseTo(...expected)
        })
      })

      describe('unmatched to throw', () => {
        test.each(unmatchedExpectedCases)('expected: $expected', ({ expected }) => {
          expect(() =>
            expect.each(values)
              .not
              .toBeCloseTo(...expected)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.toBeCloseTo()', () => {
    /**
     * @type {Array<{
     *   values: Array<number>
     *   matchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     *   unmatchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     * }>}
     */
    const cases = [
      {
        values: [
          0.123011,
          0.123012,
          0.123013,
        ],
        matchedExpectedCases: [
          { expected: [0.123, 1] },
          { expected: [0.123, 2] },
          { expected: [0.123, 3] },
          { expected: [0.123, 4] },
          { expected: [0.12301, 5] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.1230, 5] },
          { expected: [0.12301, 6] },
        ],
      },
      {
        values: [
          0.1 + 0.2, // 0.30000000000000004
          0.4 - 0.1, // 0.30000000000000004
        ],
        matchedExpectedCases: [
          { expected: [0.3, 14] },
          { expected: [0.3, 15] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.3, 16] },
          { expected: [0.3, 17] },
        ],
      },
    ]

    describe.each(cases)('values: $values', ({ values, matchedExpectedCases, unmatchedExpectedCases }) => {
      describe('matched', () => {
        test.each(matchedExpectedCases)('expected: $expected', async ({ expected }) => {
          await expect.each(values.map(it => Promise.resolve(it)))
            .resolves
            .toBeCloseTo(...expected)
        })
      })

      describe('unmatched to throw', () => {
        test.each(unmatchedExpectedCases)('expected: $expected', async ({ expected }) => {
          await expect(() =>
            expect.each(values.map(it => Promise.resolve(it)))
              .resolves
              .toBeCloseTo(...expected)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.not.toBeCloseTo()', () => {
    /**
     * @type {Array<{
     *   values: Array<number>
     *   matchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     *   unmatchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     * }>}
     */
    const cases = [
      {
        values: [
          0.123011,
          0.123012,
          0.123013,
        ],
        matchedExpectedCases: [
          { expected: [0.1230, 5] },
          { expected: [0.12301, 6] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.123, 1] },
          { expected: [0.123, 2] },
          { expected: [0.123, 3] },
          { expected: [0.123, 4] },
          { expected: [0.12301, 5] },
        ],
      },
      {
        values: [
          0.1 + 0.2, // 0.30000000000000004
          0.4 - 0.1, // 0.30000000000000004
        ],
        matchedExpectedCases: [
          { expected: [0.3, 16] },
          { expected: [0.3, 17] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.3, 14] },
          { expected: [0.3, 15] },
        ],
      },
    ]

    describe.each(cases)('values: $values', ({ values, matchedExpectedCases, unmatchedExpectedCases }) => {
      describe('matched', () => {
        test.each(matchedExpectedCases)('expected: $expected', async ({ expected }) => {
          await expect.each(values.map(it => Promise.resolve(it)))
            .resolves
            .not
            .toBeCloseTo(...expected)
        })
      })

      describe('unmatched to throw', () => {
        test.each(unmatchedExpectedCases)('expected: $expected', async ({ expected }) => {
          await expect(() =>
            expect.each(values.map(it => Promise.resolve(it)))
              .resolves
              .not
              .toBeCloseTo(...expected)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.toBeCloseTo()', () => {
    /**
     * @type {Array<{
     *   values: Array<number>
     *   matchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     *   unmatchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     * }>}
     */
    const cases = [
      {
        values: [
          0.123011,
          0.123012,
          0.123013,
        ],
        matchedExpectedCases: [
          { expected: [0.123, 1] },
          { expected: [0.123, 2] },
          { expected: [0.123, 3] },
          { expected: [0.123, 4] },
          { expected: [0.12301, 5] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.1230, 5] },
          { expected: [0.12301, 6] },
        ],
      },
      {
        values: [
          0.1 + 0.2, // 0.30000000000000004
          0.4 - 0.1, // 0.30000000000000004
        ],
        matchedExpectedCases: [
          { expected: [0.3, 14] },
          { expected: [0.3, 15] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.3, 16] },
          { expected: [0.3, 17] },
        ],
      },
    ]

    describe.each(cases)('values: $values', ({ values, matchedExpectedCases, unmatchedExpectedCases }) => {
      describe('matched', () => {
        test.each(matchedExpectedCases)('expected: $expected', async ({ expected }) => {
          await expect.each(values.map(it => () => Promise.reject(it)))
            .rejects
            .toBeCloseTo(...expected)
        })
      })

      describe('unmatched to throw', () => {
        test.each(unmatchedExpectedCases)('expected: $expected', async ({ expected }) => {
          await expect(() =>
            expect.each(values.map(it => () => Promise.reject(it)))
              .rejects
              .toBeCloseTo(...expected)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.not.toBeCloseTo()', () => {
    /**
     * @type {Array<{
     *   values: Array<number>
     *   matchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     *   unmatchedExpectedCases: Array<{
     *     expected: [number, number]
     *   }>
     * }>}
     */
    const cases = [
      {
        values: [
          0.123011,
          0.123012,
          0.123013,
        ],
        matchedExpectedCases: [
          { expected: [0.1230, 5] },
          { expected: [0.12301, 6] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.123, 1] },
          { expected: [0.123, 2] },
          { expected: [0.123, 3] },
          { expected: [0.123, 4] },
          { expected: [0.12301, 5] },
        ],
      },
      {
        values: [
          0.1 + 0.2, // 0.30000000000000004
          0.4 - 0.1, // 0.30000000000000004
        ],
        matchedExpectedCases: [
          { expected: [0.3, 16] },
          { expected: [0.3, 17] },
        ],
        unmatchedExpectedCases: [
          { expected: [0.3, 14] },
          { expected: [0.3, 15] },
        ],
      },
    ]

    describe.each(cases)('values: $values', ({ values, matchedExpectedCases, unmatchedExpectedCases }) => {
      describe('matched', () => {
        test.each(matchedExpectedCases)('expected: $expected', async ({ expected }) => {
          await expect.each(values.map(it => () => Promise.reject(it)))
            .rejects
            .not
            .toBeCloseTo(...expected)
        })
      })

      describe('unmatched to throw', () => {
        test.each(unmatchedExpectedCases)('expected: $expected', async ({ expected }) => {
          await expect(() =>
            expect.each(values.map(it => () => Promise.reject(it)))
              .rejects
              .not
              .toBeCloseTo(...expected)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

// -----------------------------------------------------------------------------

describe('expect.each()', () => {
  describe('.toBeCloseTo.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   lackedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          lackedCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5]] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          lackedCases: [
            { expectedValues: [[0.3, 15]] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            expect.each(actualValues)
              .toBeCloseTo.each(expectedValues)
          )
            .toThrow(globalThis.LACKED_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('excess expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   excessCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
          ],
          excessCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5], [0.12301, 5]] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          excessCases: [
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13]] },
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13], [0.3, 12]] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            expect.each(actualValues)
              .toBeCloseTo.each(expectedValues)
          )
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   expectedValues: Array<[number, number]>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          expectedValues: [
            [0.123011, 6],
            [0.123012, 6],
            [0.123013, 6],
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          expectedValues: [
            [0.3, 14],
            [0.3, 15],
          ],
        },
      ]

      test.each(cases)('actual values: $actualValues', ({ actualValues, expectedValues }) => {
        expect.each(actualValues)
          .toBeCloseTo.each(expectedValues)
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.12301, 6], // ❌️
                [0.12301, 5],
                [0.12301, 5],
              ],
            },
            {
              expectedValues: [
                [0.12301, 5],
                [0.12301, 6], // ❌️
                [0.12301, 5],
              ],
            },
            {
              expectedValues: [
                [0.12301, 5],
                [0.12301, 5],
                [0.12301, 6], // ❌️
              ],
            },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.3, 16], // ❌️
                [0.3, 15],
              ],
            },
            {
              expectedValues: [
                [0.3, 14],
                [0.3, 16], // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            expect.each(actualValues)
              .toBeCloseTo.each(expectedValues)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.not.toBeCloseTo.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   lackedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          lackedCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5]] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          lackedCases: [
            { expectedValues: [[0.3, 15]] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            expect.each(actualValues)
              .not
              .toBeCloseTo.each(expectedValues)
          )
            .toThrow(globalThis.LACKED_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('excess expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   excessCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
          ],
          excessCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5], [0.12301, 5]] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          excessCases: [
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13]] },
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13], [0.3, 12]] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            expect.each(actualValues)
              .not
              .toBeCloseTo.each(expectedValues)
          )
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   matchedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          matchedCases: [
            {
              expectedValues: [
                [0.1230, 6], // ❌️
                [0.1230, 6], // ❌️
                [0.1230, 6], // ❌️
              ],
            },
            {
              expectedValues: [
                [0.12301, 6], // ❌️
                [0.12301, 6], // ❌️
                [0.12301, 6], // ❌️
              ],
            },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          matchedCases: [
            {
              expectedValues: [
                [0.3, 16], // ❌️
                [0.3, 16], // ❌️
              ],
            },
            {
              expectedValues: [
                [0.3, 17], // ❌️
                [0.3, 17], // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, matchedCases }) => {
        test.each(matchedCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect.each(actualValues)
            .not
            .toBeCloseTo.each(expectedValues)
        })
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   expectedValues: Array<[number, number]>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          expectedValues: [
            [0.123011, 6],
            [0.123012, 6],
            [0.123013, 6],
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          expectedValues: [
            [0.3, 14],
            [0.3, 15],
          ],
        },
      ]

      test.each(cases)('actual values: $actualValues', ({ actualValues, expectedValues }) => {
        expect(() =>
          expect.each(actualValues)
            .not
            .toBeCloseTo.each(expectedValues)
        )
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.toBeCloseTo.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   lackedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          lackedCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5]] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          lackedCases: [
            { expectedValues: [[0.3, 15]] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues)
              .resolves
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.LACKED_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('excess expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   excessCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
          ],
          excessCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5], [0.12301, 5]] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          excessCases: [
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13]] },
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13], [0.3, 12]] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues)
              .resolves
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   expectedValues: Array<[number, number]>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          expectedValues: [
            [0.123011, 6],
            [0.123012, 6],
            [0.123013, 6],
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          expectedValues: [
            [0.3, 14],
            [0.3, 15],
          ],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect.each(actualValues.map(it => Promise.resolve(it)))
          .resolves
          .toBeCloseTo.each(expectedValues)
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.1230, 6], // ❌️
                [0.1230, 5],
                [0.1230, 5],
              ],
            },
            {
              expectedValues: [
                [0.12301, 5],
                [0.12301, 6], // ❌️
                [0.12301, 5],
              ],
            },
            {
              expectedValues: [
                [0.12301, 5],
                [0.12301, 5],
                [0.12301, 6], // ❌️
              ],
            },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.3, 16], // ❌️
                [0.3, 15],
              ],
            },
            {
              expectedValues: [
                [0.3, 15],
                [0.3, 16], // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.not.toBeCloseTo.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   lackedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          lackedCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5]] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          lackedCases: [
            { expectedValues: [[0.3, 15]] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues)
              .resolves
              .not
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.LACKED_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('excess expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   excessCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
          ],
          excessCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5], [0.12301, 5]] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          excessCases: [
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13]] },
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13], [0.3, 12]] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues)
              .resolves
              .not
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   expectedValues: Array<[number, number]>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          expectedValues: [
            [0.12301, 6], // ❌️
            [0.12301, 6], // ❌️
            [0.12301, 6], // ❌️
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          expectedValues: [
            [0.3, 16], // ❌️
            [0.3, 17], // ❌️
          ],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect.each(actualValues.map(it => Promise.resolve(it)))
          .resolves
          .not
          .toBeCloseTo.each(expectedValues)
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.12301, 5], // ❌️
                [0.12301, 6],
                [0.12301, 6],
              ],
            },
            {
              expectedValues: [
                [0.1230, 5],
                [0.1230, 4], // ❌️
                [0.1230, 5],
              ],
            },
            {
              expectedValues: [
                [0.123, 5],
                [0.123, 5],
                [0.123, 4], // ❌️
              ],
            },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.3, 15], // ❌️
                [0.3, 16],
              ],
            },
            {
              expectedValues: [
                [0.3, 16],
                [0.3, 15], // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .not
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.toBeCloseTo.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   lackedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          lackedCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5]] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          lackedCases: [
            { expectedValues: [[0.3, 15]] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.LACKED_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('excess expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   excessCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
          ],
          excessCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5], [0.12301, 5], [0.12301, 5], [0.12301, 5]] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          excessCases: [
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13]] },
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13], [0.3, 12]] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   expectedValues: Array<[number, number]>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          expectedValues: [
            [0.12301, 5],
            [0.12301, 4],
            [0.12301, 3],
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          expectedValues: [
            [0.3, 14],
            [0.3, 15],
          ],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect.each(actualValues.map(it => () => Promise.reject(it)))
          .rejects
          .toBeCloseTo.each(expectedValues)
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.12301, 6], // ❌️
                [0.12301, 5],
                [0.12301, 5],
              ],
            },
            {
              expectedValues: [
                [0.1230, 4],
                [0.1230, 5], // ❌️
                [0.1230, 4],
              ],
            },
            {
              expectedValues: [
                [0.123, 3],
                [0.123, 4],
                [0.123, 5], // ❌️
              ],
            },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.3, 16], // ❌️
                [0.3, 15],
              ],
            },
            {
              expectedValues: [
                [0.3, 14],
                [0.3, 16], // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.not.toBeCloseTo.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   lackedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          lackedCases: [
            { expectedValues: [[0.12301, 5], [0.12301, 5]] },
            { expectedValues: [[0.12301, 5]] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          lackedCases: [
            { expectedValues: [[0.3, 15]] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .not
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.LACKED_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('excess expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   excessCases: Array<{
       *     expectedValues: Array<number | [number, number?]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          excessCases: [
            { expectedValues: [1, 2, 3, 4] },
            { expectedValues: [1, 2, 3, 4, 5] },
            { expectedValues: [1, 2, 3, 4, 5, 6] },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          excessCases: [
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13]] },
            { expectedValues: [[0.3, 15], [0.3, 14], [0.3, 13], [0.3, 12]] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .not
              .toBeCloseTo.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<[number, number]>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.12301, 6], // ❌️
                [0.12301, 6], // ❌️
                [0.12301, 6], // ❌️
              ],
            },
            {
              expectedValues: [
                [0.1230, 5], // ❌️
                [0.1230, 5], // ❌️
                [0.1230, 5], // ❌️
              ],
            },
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          unmatchedCases: [
            {
              expectedValues: [
                [0.3, 16], // ❌️
                [0.3, 17], // ❌️
              ],
            },
            {
              expectedValues: [
                [0.3, 17], // ❌️
                [0.3, 18], // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect.each(actualValues.map(it => () => Promise.reject(it)))
            .rejects
            .not
            .toBeCloseTo.each(expectedValues)
        })
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<number>
       *   expectedValues: Array<[number, number]>
       * }>}
       */
      const cases = [
        {
          actualValues: [
            0.123011,
            0.123012,
            0.123013,
          ],
          expectedValues: [
            [0.12301, 5],
            [0.12301, 4],
            [0.12301, 3],
          ],
        },
        {
          actualValues: [
            0.1 + 0.2, // 0.30000000000000004
            0.4 - 0.1, // 0.30000000000000004
          ],
          expectedValues: [
            [0.3, 14],
            [0.3, 15],
          ],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect(() =>
          expect.each(actualValues.map(it => () => Promise.reject(it)))
            .rejects
            .not
            .toBeCloseTo.each(expectedValues)
        )
          .rejects
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})
