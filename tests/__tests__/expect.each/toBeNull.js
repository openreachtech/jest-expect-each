'use strict'

describe('expect.each()', () => {
  describe('.toBeNull()', () => {
    describe('matched', () => {
      const cases = [
        { values: [null, null, null] },
        { values: [null, null] },
        { values: [null] },
      ]

      test.each(cases)('length: $values.length', ({ values }) => {
        // @ts-expect-error
        expect.each(values)
          .toBeNull()
      })
    })

    describe('unmatched to throw', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            null,
            null,
          ],
        },
        {
          values: [
            null,
            false, // ❌️
            null,
          ],
        },
        {
          values: [
            null,
            null,
            {}, // ❌️
          ],
        },
      ]

      test.each(cases)('values: $values', ({ values }) => {
        expect(() =>
          // @ts-expect-error
          expect.each(values)
            .toBeNull()
        )
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.not.toBeNull()', () => {
    describe('matched', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            10000000000000000000n, // ❌️
            false, // ❌️
            Symbol('present'), // ❌️
          ],
        },
        {
          values: [
            {}, // ❌️
            [], // ❌️
          ],
        },
        {
          values: [
            0, // ❌️
            undefined, // ❌️
            NaN, // ❌️
            '', // ❌️
          ],
        },
      ]

      test.each(cases)('length: $values.length', ({ values }) => {
        // @ts-expect-error
        expect.each(values)
          .not
          .toBeNull()
      })
    })

    describe('unmatched to throw', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            null,
            null,
          ],
        },
        {
          values: [
            null,
            false, // ❌️
            null,
          ],
        },
        {
          values: [
            null,
            null,
            {}, // ❌️
          ],
        },
      ]

      test.each(cases)('values: $values', ({ values }) => {
        expect(() =>
          // @ts-expect-error
          expect.each(values)
            .not
            .toBeNull()
        )
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.toBeNull()', () => {
    describe('matched', () => {
      const cases = [
        { values: [null, null, null] },
        { values: [null, null] },
        { values: [null] },
      ]

      test.each(cases)('length: $values.length', async ({ values }) => {
        // @ts-expect-error
        await expect.each(values.map(it => Promise.resolve(it)))
          .resolves
          .toBeNull()
      })
    })

    describe('unmatched to throw', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            null,
            null,
          ],
        },
        {
          values: [
            null,
            false, // ❌️
            null,
          ],
        },
        {
          values: [
            null,
            null,
            {}, // ❌️
          ],
        },
      ]

      test.each(cases)('values: $values', async ({ values }) => {
        await expect(
          // @ts-expect-error
          expect.each(values.map(it => Promise.resolve(it)))
            .resolves
            .toBeNull()
        )
          .rejects
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.not.toBeNull()', () => {
    describe('matched', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            10000000000000000000n, // ❌️
            false, // ❌️
            Symbol('present'), // ❌️
          ],
        },
        {
          values: [
            {}, // ❌️
            [], // ❌️
          ],
        },
        {
          values: [
            0, // ❌️
            undefined, // ❌️
            NaN, // ❌️
            '', // ❌️
          ],
        },
      ]

      test.each(cases)('length: $values.length', async ({ values }) => {
        // @ts-expect-error
        await expect.each(values.map(it => Promise.resolve(it)))
          .resolves
          .not
          .toBeNull()
      })
    })

    describe('unmatched to throw', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            null,
            null,
          ],
        },
        {
          values: [
            null,
            false, // ❌️
            null,
          ],
        },
        {
          values: [
            null,
            null,
            {}, // ❌️
          ],
        },
      ]

      test.each(cases)('values: $values', async ({ values }) => {
        await expect(
          // @ts-expect-error
          expect.each(values.map(it => Promise.resolve(it)))
            .resolves
            .not
            .toBeNull()
        )
          .rejects
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.toBeNull()', () => {
    describe('matched', () => {
      const cases = [
        { values: [null, null, null] },
        { values: [null, null] },
        { values: [null] },
      ]

      test.each(cases)('length: $values.length', async ({ values }) => {
        // @ts-expect-error
        await expect.each(values.map(it => () => Promise.reject(it)))
          .rejects
          .toBeNull()
      })
    })

    describe('unmatched to throw', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            null,
            null,
          ],
        },
        {
          values: [
            null,
            false, // ❌️
            null,
          ],
        },
        {
          values: [
            null,
            null,
            {}, // ❌️
          ],
        },
      ]

      test.each(cases)('values: $values', async ({ values }) => {
        await expect(
          // @ts-expect-error
          expect.each(values.map(it => () => Promise.reject(it)))
            .rejects
            .toBeNull()
        )
          .rejects
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.not.toBeNull()', () => {
    describe('matched', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            10000000000000000000n, // ❌️
            false, // ❌️
            Symbol('present'), // ❌️
          ],
        },
        {
          values: [
            {}, // ❌️
            [], // ❌️
          ],
        },
        {
          values: [
            0, // ❌️
            undefined, // ❌️
            NaN, // ❌️
            '', // ❌️
          ],
        },
      ]

      test.each(cases)('length: $values.length', async ({ values }) => {
        // @ts-expect-error
        await expect.each(values.map(it => () => Promise.reject(it)))
          .rejects
          .not
          .toBeNull()
      })
    })

    describe('unmatched to throw', () => {
      const cases = [
        {
          values: [
            'present', // ❌️
            null,
            null,
          ],
        },
        {
          values: [
            null,
            false, // ❌️
            null,
          ],
        },
        {
          values: [
            null,
            null,
            {}, // ❌️
          ],
        },
      ]

      test.each(cases)('values: $values', async ({ values }) => {
        await expect(
          // @ts-expect-error
          expect.each(values.map(it => () => Promise.reject(it)))
            .rejects
            .not
            .toBeNull()
        )
          .rejects
          .toThrow(globalThis.THROWN_MESSAGE_REGEX.INTENTIONAL)
      })
    })
  })
})

// -----------------------------------------------------------------------------

describe('expect.each()', () => {
  describe('.toBeNull.each()', () => {
    describe('lacked expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          lackedCases: [
            { expectedValues: [null, null] },
            { expectedValues: [null] },
          ],
        },
        {
          actualValues: [null, null],
          lackedCases: [
            { expectedValues: [null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('length: $expectedValues.length', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .toBeNull.each(expectedValues)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.LACKED_ARRAY)
        })
      })
    })

    describe('excess expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          excessCases: [
            { expectedValues: [null, null, null, null] },
            { expectedValues: [null, null, null, null, null] },
          ],
        },
        {
          actualValues: [null, null],
          excessCases: [
            { expectedValues: [null, null, null] },
            { expectedValues: [null, null, null, null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('length: $expectedValues.length', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .toBeNull.each(expectedValues)
          )
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('with expected values, but should throw Jest native error', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          expectedValues: [null, null, null],
        },
        {
          actualValues: [null, null],
          expectedValues: [null, null],
        },
      ]

      test.each(cases)('actual values: $actualValues', ({ actualValues, expectedValues }) => {
        expect(() =>
          // @ts-expect-error
          expect.each(actualValues)
            .toBeNull.each(expectedValues)
        )
          .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)

        /*
          expect(received).toBeNull()

          Matcher error: this matcher must not have an expected argument

          Expected has type:  boolean
          Expected has value: false

            399 |   test('.toBeNull()', () => {
            400 |     expect(true)
          > 401 |       .toBeNull(false)
                |        ^
            402 |   })
            403 | })
            404 |

            at toBeNull (tests/__tests__/expect.each/toBeNull.js:401:8)
            at only (tests/__tests__/expect.each/toBeNull.js:399:12)
            at Object.describe (tests/__tests__/expect.each/toBeNull.js:398:1)
        */
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.not.toBeNull.each()', () => {
    describe('lacked expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          lackedCases: [
            { expectedValues: [null, null] },
            { expectedValues: [null] },
          ],
        },
        {
          actualValues: [null, null],
          lackedCases: [
            { expectedValues: [null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('length: $expectedValues.length', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .not
              .toBeNull.each(expectedValues)
          )
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.LACKED_ARRAY)
        })
      })
    })

    describe('excess expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          excessCases: [
            { expectedValues: [null, null, null, null] },
            { expectedValues: [null, null, null, null, null] },
          ],
        },
        {
          actualValues: [null, null],
          excessCases: [
            { expectedValues: [null, null, null] },
            { expectedValues: [null, null, null, null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('length: $expectedValues.length', ({ expectedValues }) => {
          expect(() =>
            // @ts-expect-error
            expect.each(actualValues)
              .not
              .toBeNull.each(expectedValues)
          )
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('with expected values, but should throw Jest native error', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          expectedValues: [null, null, null],
        },
        {
          actualValues: [null, null],
          expectedValues: [null, null],
        },
      ]

      test.each(cases)('actual values: $actualValues', ({ actualValues, expectedValues }) => {
        expect(() =>
          // @ts-expect-error
          expect.each(actualValues)
            .not
            .toBeNull.each(expectedValues)
        )
          .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)

        /*
          expect(received).toBeNull()

          Matcher error: this matcher must not have an expected argument

          Expected has type:  boolean
          Expected has value: false

            399 |   test('.toBeNull()', () => {
            400 |     expect(true)
          > 401 |       .toBeNull(false)
                |        ^
            402 |   })
            403 | })
            404 |

            at toBeNull (tests/__tests__/expect.each/toBeNull.js:401:8)
            at only (tests/__tests__/expect.each/toBeNull.js:399:12)
            at Object.describe (tests/__tests__/expect.each/toBeNull.js:398:1)
        */
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.toBeNull.each()', () => {
    describe('lacked expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          lackedCases: [
            { expectedValues: [null, null] },
            { expectedValues: [null] },
          ],
        },
        {
          actualValues: [null, null],
          lackedCases: [
            { expectedValues: [null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('length: $expectedValues.length', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .toBeNull.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.LACKED_ARRAY)
        })
      })
    })

    describe('excess expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          excessCases: [
            { expectedValues: [null, null, null, null] },
            { expectedValues: [null, null, null, null, null] },
          ],
        },
        {
          actualValues: [null, null],
          excessCases: [
            { expectedValues: [null, null, null] },
            { expectedValues: [null, null, null, null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('length: $expectedValues.length', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .toBeNull.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('with expected values, but should throw Jest native error', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          expectedValues: [null, null, null],
        },
        {
          actualValues: [null, null],
          expectedValues: [null, null],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect(() =>
          // @ts-expect-error
          expect.each(actualValues.map(it => Promise.resolve(it)))
            .resolves
            .toBeNull.each(expectedValues)
        )
          .rejects
          .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)

        /*
          expect(received).toBeNull()

          Matcher error: this matcher must not have an expected argument

          Expected has type:  boolean
          Expected has value: false

            399 |   test('.toBeNull()', () => {
            400 |     expect(true)
          > 401 |       .toBeNull(false)
                |        ^
            402 |   })
            403 | })
            404 |

            at toBeNull (tests/__tests__/expect.each/toBeNull.js:401:8)
            at only (tests/__tests__/expect.each/toBeNull.js:399:12)
            at Object.describe (tests/__tests__/expect.each/toBeNull.js:398:1)
        */
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.resolves.not.toBeNull.each()', () => {
    describe('lacked expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          lackedCases: [
            { expectedValues: [null, null] },
            { expectedValues: [null] },
          ],
        },
        {
          actualValues: [null, null],
          lackedCases: [
            { expectedValues: [null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('length: $expectedValues.length', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .not
              .toBeNull.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.LACKED_ARRAY)
        })
      })
    })

    describe('excess expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          excessCases: [
            { expectedValues: [null, null, null, null] },
            { expectedValues: [null, null, null, null, null] },
          ],
        },
        {
          actualValues: [null, null],
          excessCases: [
            { expectedValues: [null, null, null] },
            { expectedValues: [null, null, null, null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('length: $expectedValues.length', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => Promise.resolve(it)))
              .resolves
              .not
              .toBeNull.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('with expected values, but should throw Jest native error', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          expectedValues: [null, null, null],
        },
        {
          actualValues: [null, null],
          expectedValues: [null, null],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect(() =>
          // @ts-expect-error
          expect.each(actualValues.map(it => Promise.resolve(it)))
            .resolves
            .not
            .toBeNull.each(expectedValues)
        )
          .rejects
          .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)

        /*
          expect(received).toBeNull()

          Matcher error: this matcher must not have an expected argument

          Expected has type:  boolean
          Expected has value: false

            399 |   test('.toBeNull()', () => {
            400 |     expect(true)
          > 401 |       .toBeNull(false)
                |        ^
            402 |   })
            403 | })
            404 |

            at toBeNull (tests/__tests__/expect.each/toBeNull.js:401:8)
            at only (tests/__tests__/expect.each/toBeNull.js:399:12)
            at Object.describe (tests/__tests__/expect.each/toBeNull.js:398:1)
        */
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.toBeNull.each()', () => {
    describe('lacked expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          lackedCases: [
            { expectedValues: [null, null] },
            { expectedValues: [null] },
          ],
        },
        {
          actualValues: [null, null],
          lackedCases: [
            { expectedValues: [null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('length: $expectedValues.length', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .toBeNull.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.LACKED_ARRAY)
        })
      })
    })

    describe('excess expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          excessCases: [
            { expectedValues: [null, null, null, null] },
            { expectedValues: [null, null, null, null, null] },
          ],
        },
        {
          actualValues: [null, null],
          excessCases: [
            { expectedValues: [null, null, null] },
            { expectedValues: [null, null, null, null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('length: $expectedValues.length', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .toBeNull.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('with expected values, but should throw Jest native error', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          expectedValues: [null, null, null],
        },
        {
          actualValues: [null, null],
          expectedValues: [null, null],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect(() =>
          // @ts-expect-error
          expect.each(actualValues.map(it => () => Promise.reject(it)))
            .rejects
            .toBeNull.each(expectedValues)
        )
          .rejects
          .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)

        /*
          expect(received).toBeNull()

          Matcher error: this matcher must not have an expected argument

          Expected has type:  boolean
          Expected has value: false

            399 |   test('.toBeNull()', () => {
            400 |     expect(true)
          > 401 |       .toBeNull(false)
                |        ^
            402 |   })
            403 | })
            404 |

            at toBeNull (tests/__tests__/expect.each/toBeNull.js:401:8)
            at only (tests/__tests__/expect.each/toBeNull.js:399:12)
            at Object.describe (tests/__tests__/expect.each/toBeNull.js:398:1)
        */
      })
    })
  })
})

describe('expect.each()', () => {
  describe('.rejects.not.toBeNull.each()', () => {
    describe('lacked expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          lackedCases: [
            { expectedValues: [null, null] },
            { expectedValues: [null] },
          ],
        },
        {
          actualValues: [null, null],
          lackedCases: [
            { expectedValues: [null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, lackedCases }) => {
        test.each(lackedCases)('length: $expectedValues.length', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .not
              .toBeNull.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.THROWN_MESSAGE_REGEX.LACKED_ARRAY)
        })
      })
    })

    describe('excess expected values', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          excessCases: [
            { expectedValues: [null, null, null, null] },
            { expectedValues: [null, null, null, null, null] },
          ],
        },
        {
          actualValues: [null, null],
          excessCases: [
            { expectedValues: [null, null, null] },
            { expectedValues: [null, null, null, null] },
          ],
        },
      ]

      describe.each(cases)('actual values: $actualValues', ({ actualValues, excessCases }) => {
        test.each(excessCases)('length: $expectedValues.length', async ({ expectedValues }) => {
          await expect(() =>
            // @ts-expect-error
            expect.each(actualValues.map(it => () => Promise.reject(it)))
              .rejects
              .not
              .toBeNull.each(expectedValues)
          )
            .rejects
            .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)
        })
      })
    })

    describe('with expected values, but should throw Jest native error', () => {
      const cases = [
        {
          actualValues: [null, null, null],
          expectedValues: [null, null, null],
        },
        {
          actualValues: [null, null],
          expectedValues: [null, null],
        },
      ]

      test.each(cases)('actual values: $actualValues', async ({ actualValues, expectedValues }) => {
        await expect(() =>
          // @ts-expect-error
          expect.each(actualValues.map(it => () => Promise.reject(it)))
            .rejects
            .not
            .toBeNull.each(expectedValues)
        )
          .rejects
          .toThrow(globalThis.EXCESS_ARRAY_THROWN_MESSAGE_REGEX)

        /*
          expect(received).toBeNull()

          Matcher error: this matcher must not have an expected argument

          Expected has type:  boolean
          Expected has value: false

            399 |   test('.toBeNull()', () => {
            400 |     expect(true)
          > 401 |       .toBeNull(false)
                |        ^
            402 |   })
            403 | })
            404 |

            at toBeNull (tests/__tests__/expect.each/toBeNull.js:401:8)
            at only (tests/__tests__/expect.each/toBeNull.js:399:12)
            at Object.describe (tests/__tests__/expect.each/toBeNull.js:398:1)
        */
      })
    })
  })
})
