'use strict'

describe('expect.each()', () => {
  describe('.toBe()', () => {
    const objectTally = {}
    const arrayTally = []

    const cases = [
      { tally: undefined },
      { tally: null },
      { tally: false },
      { tally: true },
      { tally: 0 },
      { tally: 100 },
      { tally: -200 },
      { tally: 1.001 },
      { tally: -2.002 },
      { tally: 0n },
      { tally: 1000000000000000000000000n },
      { tally: -2000000000000000000000000n },
      { tally: 'tally' },
      { tally: Symbol('tally') },
      { tally: objectTally },
      { tally: arrayTally },
    ]

    describe.each(cases)('value: $tally', ({ tally }) => {
      const lengthCases = [
        { values: [tally, tally, tally] },
        { values: [tally, tally] },
        { values: [tally] },
      ]

      describe('matched', () => {
        test.each(lengthCases)('length: $values.length', ({ values }) => {
          // @ts-expect-error
          expect.each(values)
            .toBe(tally)
        })
      })

      describe('unmatched to throw', () => {
        const unmatchedValue = Symbol('unmatchedValue')

        test.each(lengthCases)('length: $values.length', ({ values }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(values)
              .toBe(unmatchedValue)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.not.toBe()', () => {
    const objectTally = {}
    const arrayTally = []

    const cases = [
      { tally: undefined },
      { tally: null },
      { tally: false },
      { tally: true },
      { tally: 0 },
      { tally: 100 },
      { tally: -200 },
      { tally: 1.001 },
      { tally: -2.002 },
      { tally: 0n },
      { tally: 1000000000000000000000000n },
      { tally: -2000000000000000000000000n },
      { tally: 'tally' },
      { tally: Symbol('tally') },
      { tally: objectTally },
      { tally: arrayTally },
    ]

    describe.each(cases)('value: $tally', ({ tally }) => {
      const lengthCases = [
        { values: [tally, tally, tally] },
        { values: [tally, tally] },
        { values: [tally] },
      ]

      describe('matched', () => {
        const unmatchedValue = Symbol('unmatchedValue')

        test.each(lengthCases)('length: $values.length', ({ values }) => {
          // @ts-expect-error
          expect.each(values)
            .not
            .toBe(unmatchedValue)
        })
      })

      describe('unmatched to throw', () => {
        test.each(lengthCases)('length: $values.length', ({ values }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(values)
              .not
              .toBe(tally)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.toBe()', () => {
    const objectTally = {}
    const arrayTally = []

    const cases = [
      { tally: undefined },
      { tally: null },
      { tally: false },
      { tally: true },
      { tally: 0 },
      { tally: 100 },
      { tally: -200 },
      { tally: 1.001 },
      { tally: -2.002 },
      { tally: 0n },
      { tally: 1000000000000000000000000n },
      { tally: -2000000000000000000000000n },
      { tally: 'tally' },
      { tally: Symbol('tally') },
      { tally: objectTally },
      { tally: arrayTally },
    ]

    describe.each(cases)('value: $tally', ({ tally }) => {
      describe('matched', () => {
        const lengthCases = [
          {
            values: [
              Promise.resolve(tally),
              Promise.resolve(tally),
              Promise.resolve(tally),
            ],
          },
          {
            values: [
              Promise.resolve(tally),
              Promise.resolve(tally),
            ],
          },
          {
            values: [
              Promise.resolve(tally),
            ],
          },
        ]

        test.each(lengthCases)('length: $values.length', async ({ values }) => {
          // @ts-expect-error
          await expect.each(values)
            .resolves
            .toBe(tally)
        })
      })

      describe('unmatched to throw', () => {
        const unmatchedValue = Symbol('unmatchedValue')

        const lengthCases = [
          {
            values: [
              Promise.resolve(tally),
              Promise.resolve(tally),
              Promise.resolve(tally),
            ],
          },
          {
            values: [
              Promise.resolve(tally),
              Promise.resolve(tally),
            ],
          },
          {
            values: [
              Promise.resolve(tally),
            ],
          },
        ]

        test.each(lengthCases)('length: $values.length', async ({ values }) => {
          await expect(
            // @ts-expect-error
            expect.each(values)
              .resolves
              .toBe(unmatchedValue)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.not.toBe()', () => {
    const objectTally = {}
    const arrayTally = []

    const cases = [
      { tally: undefined },
      { tally: null },
      { tally: false },
      { tally: true },
      { tally: 0 },
      { tally: 100 },
      { tally: -200 },
      { tally: 1.001 },
      { tally: -2.002 },
      { tally: 0n },
      { tally: 1000000000000000000000000n },
      { tally: -2000000000000000000000000n },
      { tally: 'tally' },
      { tally: Symbol('tally') },
      { tally: objectTally },
      { tally: arrayTally },
    ]

    describe.each(cases)('value: $tally', ({ tally }) => {
      describe('matched', () => {
        const unmatchedValue = Symbol('unmatchedValue')

        const lengthCases = [
          {
            values: [
              Promise.resolve(tally),
              Promise.resolve(tally),
              Promise.resolve(tally),
            ],
          },
          {
            values: [
              Promise.resolve(tally),
              Promise.resolve(tally),
            ],
          },
          {
            values: [
              Promise.resolve(tally),
            ],
          },
        ]

        test.each(lengthCases)('length: $values.length', async ({ values }) => {
          // @ts-expect-error
          await expect.each(values)
            .resolves
            .not
            .toBe(unmatchedValue)
        })
      })

      describe('unmatched to throw', () => {
        const lengthCases = [
          {
            values: [
              Promise.resolve(tally),
              Promise.resolve(tally),
              Promise.resolve(tally),
            ],
          },
          {
            values: [
              Promise.resolve(tally),
              Promise.resolve(tally),
            ],
          },
          {
            values: [
              Promise.resolve(tally),
            ],
          },
        ]

        test.each(lengthCases)('length: $values.length', async ({ values }) => {
          await expect(
            // @ts-expect-error
            expect.each(values)
              .resolves
              .not
              .toBe(tally)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.toBe()', () => {
    const objectTally = {}
    const arrayTally = []

    const cases = [
      { tally: undefined },
      { tally: null },
      { tally: false },
      { tally: true },
      { tally: 0 },
      { tally: 100 },
      { tally: -200 },
      { tally: 1.001 },
      { tally: -2.002 },
      { tally: 0n },
      { tally: 1000000000000000000000000n },
      { tally: -2000000000000000000000000n },
      { tally: 'tally' },
      { tally: Symbol('tally') },
      { tally: objectTally },
      { tally: arrayTally },
    ]

    describe.each(cases)('value: $tally', ({ tally }) => {
      describe('matched', () => {
        const lengthCases = [
          {
            values: () => [
              Promise.reject(tally),
              Promise.reject(tally),
              Promise.reject(tally),
            ],
          },
          {
            values: () => [
              Promise.reject(tally),
              Promise.reject(tally),
            ],
          },
          {
            values: () => [
              Promise.reject(tally),
            ],
          },
        ]

        test.each(lengthCases)('length: $values().length', async ({ values }) => {
          // @ts-expect-error
          await expect.each(values())
            .rejects
            .toBe(tally)
        })
      })

      describe('unmatched to throw', () => {
        const unmatchedValue = Symbol('unmatchedValue')

        const lengthCases = [
          {
            values: () => [
              Promise.reject(tally),
              Promise.reject(tally),
              Promise.reject(tally),
            ],
          },
          {
            values: () => [
              Promise.reject(tally),
              Promise.reject(tally),
            ],
          },
          {
            values: () => [
              Promise.reject(tally),
            ],
          },
        ]

        test.each(lengthCases)('length: $values().length', async ({ values }) => {
          await expect(
            // @ts-expect-error
            expect.each(values())
              .rejects
              .toBe(unmatchedValue)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.not.toBe()', () => {
    const objectTally = {}
    const arrayTally = []

    const cases = [
      { tally: undefined },
      { tally: null },
      { tally: false },
      { tally: true },
      { tally: 0 },
      { tally: 100 },
      { tally: -200 },
      { tally: 1.001 },
      { tally: -2.002 },
      { tally: 0n },
      { tally: 1000000000000000000000000n },
      { tally: -2000000000000000000000000n },
      { tally: 'tally' },
      { tally: Symbol('tally') },
      { tally: objectTally },
      { tally: arrayTally },
    ]

    describe.each(cases)('value: $tally', ({ tally }) => {
      describe('matched', () => {
        const unmatchedValue = Symbol('unmatchedValue')

        const lengthCases = [
          {
            values: () => [
              Promise.reject(tally),
              Promise.reject(tally),
              Promise.reject(tally),
            ],
          },
          {
            values: () => [
              Promise.reject(tally),
              Promise.reject(tally),
            ],
          },
          {
            values: () => [
              Promise.reject(tally),
            ],
          },
        ]

        test.each(lengthCases)('length: $values().length', async ({ values }) => {
          // @ts-expect-error
          await expect.each(values())
            .rejects
            .not
            .toBe(unmatchedValue)
        })
      })

      describe('unmatched to throw', () => {
        const lengthCases = [
          {
            values: () => [
              Promise.reject(tally),
              Promise.reject(tally),
              Promise.reject(tally),
            ],
          },
          {
            values: () => [
              Promise.reject(tally),
              Promise.reject(tally),
            ],
          },
          {
            values: () => [
              Promise.reject(tally),
            ],
          },
        ]

        test.each(lengthCases)('length: $values().length', async ({ values }) => {
          await expect(
            // @ts-expect-error
            expect.each(values())
              .rejects
              .not
              .toBe(tally)
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
  describe('.toBe.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   lackedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          lackedCases: [
            { expectedValues: [1, 2] },
            { expectedValues: [1] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          lackedCases: [
            { expectedValues: ['alpha', 'beta', 'gamma'] },
            { expectedValues: ['alpha', 'beta'] },
            { expectedValues: ['alpha'] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .toBe.each(expectedValues)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.LACKED_ARRAY)
        })
      })
    })

    describe('excess expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   excessCases: Array<{
       *     expectedValues: Array<*>
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
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          excessCases: [
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta'] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .toBe.each(expectedValues)
          )
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   expectedValues: Array<*>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          expectedValues: [1, 2, 3],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          expectedValues: ['alpha', 'beta', 'gamma', 'delta'],
        },
      ]

      test.each(cases)('actual values: $actualValues', ({ actualValues, expectedValues }) => {
        // @ts-expect-error
        expect.each(actualValues)
          .toBe.each(expectedValues)
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          unmatchedCases: [
            {
              expectedValues: [
                100, // ❌️
                2,
                3,
              ],
            },
            {
              expectedValues: [
                1,
                -2, // ❌️
                3,
              ],
            },
            {
              expectedValues: [
                1,
                2,
                null, // ❌️
              ],
            },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          unmatchedCases: [
            {
              expectedValues: [
                'ALPHA', // ❌️
                'beta',
                'gamma',
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'BETA', // ❌️
                'gamma',
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'beta',
                'GAMMA', // ❌️
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'beta',
                'gamma',
                'DELTA', // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .toBe.each(expectedValues)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.not.toBe.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   lackedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          lackedCases: [
            { expectedValues: [1, 2] },
            { expectedValues: [1] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          lackedCases: [
            { expectedValues: ['alpha', 'beta', 'gamma'] },
            { expectedValues: ['alpha', 'beta'] },
            { expectedValues: ['alpha'] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .not
              .toBe.each(expectedValues)
          )
            .toThrow(globalThis.LACKED_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('excess expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   excessCases: Array<{
       *     expectedValues: Array<*>
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
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          excessCases: [
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta'] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .not
              .toBe.each(expectedValues)
          )
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          unmatchedCases: [
            {
              expectedValues: [
                100, // ❌️
                200, // ❌️
                300, // ❌️
              ],
            },
            {
              expectedValues: [
                -1, // ❌️
                -2, // ❌️
                -3, // ❌️
              ],
            },
            {
              expectedValues: [
                null, // ❌️
                null, // ❌️
                null, // ❌️
              ],
            },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          unmatchedCases: [
            {
              expectedValues: [
                'ALPHA', // ❌️
                'BETA', // ❌️
                'GAMMA', // ❌️
                'DELTA', // ❌️
              ],
            },
            {
              expectedValues: [
                'omega', // ❌️
                'omega', // ❌️
                'omega', // ❌️
                'omega', // ❌️
              ],
            },
            {
              expectedValues: [
                null, // ❌️
                null, // ❌️
                null, // ❌️
                null, // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', ({ expectedValues }) => {
          // @ts-expect-error
          expect.each(actualValues)
            .not
            .toBe.each(expectedValues)
        })
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   expectedValues: Array<*>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          expectedValues: [1, 2, 3], // ❌️ all are to be
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          expectedValues: ['alpha', 'beta', 'gamma', 'delta'], // ❌️ all are to be
        },
      ]

      test.each(cases)('actual values: $actualValues', ({ actualValues, expectedValues }) => {
        expect(() =>
          // @ts-expect-error
          expect.each(actualValues)
            .not
            .toBe.each(expectedValues)
        )
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.toBe.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   lackedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          lackedCases: [
            { expectedValues: [1, 2] },
            { expectedValues: [1] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          lackedCases: [
            { expectedValues: ['alpha', 'beta', 'gamma'] },
            { expectedValues: ['alpha', 'beta'] },
            { expectedValues: ['alpha'] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .toBe.each(expectedValues)
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
       *     expectedValues: Array<*>
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
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          excessCases: [
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta'] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .toBe.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   expectedValues: Array<*>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          expectedValues: [1, 2, 3],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          expectedValues: ['alpha', 'beta', 'gamma', 'delta'],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        // @ts-expect-error
        await expect.each(actualValues.map(it => Promise.resolve(it)))
          .resolves
          .toBe.each(expectedValues)
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          unmatchedCases: [
            {
              expectedValues: [
                100, // ❌️
                2,
                3,
              ],
            },
            {
              expectedValues: [
                1,
                -2, // ❌️
                3,
              ],
            },
            {
              expectedValues: [
                1,
                2,
                null, // ❌️
              ],
            },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          unmatchedCases: [
            {
              expectedValues: [
                'ALPHA', // ❌️
                'beta',
                'gamma',
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'BETA', // ❌️
                'gamma',
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'beta',
                'GAMMA', // ❌️
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'beta',
                'gamma',
                'DELTA', // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .toBe.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.not.toBe.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   lackedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          lackedCases: [
            { expectedValues: [1, 2] },
            { expectedValues: [1] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          lackedCases: [
            { expectedValues: ['alpha', 'beta', 'gamma'] },
            { expectedValues: ['alpha', 'beta'] },
            { expectedValues: ['alpha'] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .not
              .toBe.each(expectedValues)
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
       *     expectedValues: Array<*>
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
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          excessCases: [
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta'] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .not
              .toBe.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   matchedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          matchedCases: [
            {
              expectedValues: [
                100, // ❌️
                200, // ❌️
                300, // ❌️
              ],
            },
            {
              expectedValues: [
                -1, // ❌️
                -2, // ❌️
                -3, // ❌️
              ],
            },
            {
              expectedValues: [
                null, // ❌️
                null, // ❌️
                null, // ❌️
              ],
            },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          matchedCases: [
            {
              expectedValues: [
                'ALPHA', // ❌️
                'BETA', // ❌️
                'GAMMA', // ❌️
                'DELTA', // ❌️
              ],
            },
            {
              expectedValues: [
                'omega', // ❌️
                'omega', // ❌️
                'omega', // ❌️
                'omega', // ❌️
              ],
            },
            {
              expectedValues: [
                null, // ❌️
                null, // ❌️
                null, // ❌️
                null, // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, matchedCases }) => {
        test.each(matchedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          // @ts-expect-error
          await expect.each(actualValues.map(it => Promise.resolve(it)))
            .resolves
            .not
            .toBe.each(expectedValues)
        })
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   expectedValues: Array<*>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          expectedValues: [1, 2, 3], // ❌️ all are to be
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          expectedValues: ['alpha', 'beta', 'gamma', 'delta'], // ❌️ all are to be
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect(() =>
          // @ts-expect-error
          expect.each(actualValues.map(it => Promise.resolve(it)))
            .resolves
            .not
            .toBe.each(expectedValues)
        )
          .rejects
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.toBe.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   lackedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          lackedCases: [
            { expectedValues: [1, 2] },
            { expectedValues: [1] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          lackedCases: [
            { expectedValues: ['alpha', 'beta', 'gamma'] },
            { expectedValues: ['alpha', 'beta'] },
            { expectedValues: ['alpha'] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .toBe.each(expectedValues)
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
       *     expectedValues: Array<*>
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
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          excessCases: [
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta'] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .toBe.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   expectedValues: Array<*>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          expectedValues: [1, 2, 3],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          expectedValues: ['alpha', 'beta', 'gamma', 'delta'],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        // @ts-expect-error
        await expect.each(actualValues.map(it => () => Promise.reject(it)))
          .rejects
          .toBe.each(expectedValues)
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   unmatchedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          unmatchedCases: [
            {
              expectedValues: [
                100, // ❌️
                2,
                3,
              ],
            },
            {
              expectedValues: [
                1,
                -2, // ❌️
                3,
              ],
            },
            {
              expectedValues: [
                1,
                2,
                null, // ❌️
              ],
            },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          unmatchedCases: [
            {
              expectedValues: [
                'ALPHA', // ❌️
                'beta',
                'gamma',
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'BETA', // ❌️
                'gamma',
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'beta',
                'GAMMA', // ❌️
                'delta',
              ],
            },
            {
              expectedValues: [
                'alpha',
                'beta',
                'gamma',
                'DELTA', // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, unmatchedCases }) => {
        test.each(unmatchedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .toBe.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
        })
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.not.toBe.each()', () => {
    describe('lacked expected values', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   lackedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          lackedCases: [
            { expectedValues: [1, 2] },
            { expectedValues: [1] },
            { expectedValues: [] },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          lackedCases: [
            { expectedValues: ['alpha', 'beta', 'gamma'] },
            { expectedValues: ['alpha', 'beta'] },
            { expectedValues: ['alpha'] },
            { expectedValues: [] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .not
              .toBe.each(expectedValues)
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
       *     expectedValues: Array<*>
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
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          excessCases: [
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'] },
            { expectedValues: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta'] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .not
              .toBe.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('matched', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   matchedCases: Array<{
       *     expectedValues: Array<*>
       *   }>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          matchedCases: [
            {
              expectedValues: [
                100, // ❌️
                200, // ❌️
                300, // ❌️
              ],
            },
            {
              expectedValues: [
                -1, // ❌️
                -2, // ❌️
                -3, // ❌️
              ],
            },
            {
              expectedValues: [
                null, // ❌️
                null, // ❌️
                null, // ❌️
              ],
            },
          ],
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          matchedCases: [
            {
              expectedValues: [
                'ALPHA', // ❌️
                'BETA', // ❌️
                'GAMMA', // ❌️
                'DELTA', // ❌️
              ],
            },
            {
              expectedValues: [
                'omega', // ❌️
                'omega', // ❌️
                'omega', // ❌️
                'omega', // ❌️
              ],
            },
            {
              expectedValues: [
                null, // ❌️
                null, // ❌️
                null, // ❌️
                null, // ❌️
              ],
            },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, matchedCases }) => {
        test.each(matchedCases)('expected values: $expectedValues', async ({ expectedValues }) => {
          // @ts-expect-error
          await expect.each(actualValues.map(it => () => Promise.reject(it)))
            .rejects
            .not
            .toBe.each(expectedValues)
        })
      })
    })

    describe('unmatched to throw', () => {
      /**
       * @type {Array<{
       *   actualValues: Array<*>
       *   expectedValues: Array<*>
       * }>}
       */
      const cases = [
        {
          actualValues: [1, 2, 3],
          expectedValues: [1, 2, 3], // ❌️ all are to be
        },
        {
          actualValues: ['alpha', 'beta', 'gamma', 'delta'],
          expectedValues: ['alpha', 'beta', 'gamma', 'delta'], // ❌️ all are to be
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect(() =>
          // @ts-expect-error
          expect.each(actualValues.map(it => () => Promise.reject(it)))
            .rejects
            .not
            .toBe.each(expectedValues)
        )
          .rejects
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})
