'use strict'

module.exports.setup = function () {
  /**
   * Extend each() to expect of Jest method.
   *
   * @param {Array<*>} actualTable - Test table.
   * @returns {Proxy<expect>} - Proxy of expect.
   */
  expect.each = (actualTable) => new Proxy(expect, {
    get (_, propertyName) {
      if (expectProxyCreators[propertyName]) {
        return expectProxyCreators[propertyName](actualTable)
      }

      return (expectedValues) =>
        createExpectCaller({
          actualTable,
          expectedValues,
          propertyChains: [propertyName]
        })
    }
  })
}

/** @type {Object.<string, Function>}} creators */
const expectProxyCreators = {
  not: (actualTable) => new Proxy(expect, {
    get (_, matcher) {
      return (expectedValues) =>
        createExpectCaller({
          actualTable,
          expectedValues,
          propertyChains: [
            'not',
            matcher
          ]
        })
    }
  }),
  rejects: (actualTable) => createExpectProxyAsPromise({
    actualTable,
    promiseMethod: 'rejects',
  }),
  resolves: (actualTable) => createExpectProxyAsPromise({
    actualTable,
    promiseMethod: 'resolves',
  }),
}

/**
 * Create expect caller.
 *
 * @param {{
 *   actualTable: Array<*>,
 *   expectedValues: Array<*>,
 *   propertyChains: Array<string>,
 * }} params
 * @returns {Array<*>} - Callers.
 */
function createExpectCaller ({
  actualTable,
  expectedValues,
  propertyChains,
}) {
  return actualTable
    .map((it, index) =>
      [it, expectedValues[index]]
    )
    .map(([actual, expected]) =>
      propertyChains.reduce(
        (accumulator, it) => accumulator[it],
        expect(actual)
      )(expected)
    )
}

/**
 * Create expect proxy with Promise.allSettled.
 *
 * @param {{
 *   actualTable: Array<*>,
 *   promiseMethod: string,
 * }} params
 * @returns {Proxy} - Proxy for expect methods.
 */
function createExpectProxyAsPromise ({
  actualTable,
  promiseMethod,
}) {
  return new Proxy(expect, {
    get (_, matcher) {
      if (matcher === 'not') {
        return new Proxy(expect, {
          get (_, matcher) {
            return (expectedValues) => Promise.allSettled(
              createExpectCaller({
                actualTable,
                expectedValues,
                propertyChains: [
                  promiseMethod,
                  'not',
                  matcher
                ]
              })
            )
          }
        })
      }

      return (expectedValues) => Promise.allSettled(
        createExpectCaller({
          actualTable,
          expectedValues,
          propertyChains: [
            promiseMethod,
            matcher
          ]
        })
      )
    }
  })
}
