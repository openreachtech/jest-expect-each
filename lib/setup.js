'use strict'

module.exports.setup = function () {
  /**
   * Extend each() to expect of Jest method.
   *
   * @param {Array<*>} actualValues - Test table.
   * @returns {Proxy<expect>} - Proxy of expect.
   */
  expect.each = (actualValues) => new Proxy(expect, {
    get (_, propertyName) {
      if (expectProxyCreators[propertyName]) {
        return expectProxyCreators[propertyName](actualValues)
      }

      return (expectedValues) =>
        createExpectCaller({
          actualValues,
          expectedValues,
          propertyChains: [propertyName]
        })
    }
  })
}

/** @type {Object.<string, Function>}} creators */
const expectProxyCreators = {
  not: (actualValues) => new Proxy(expect, {
    get (_, matcher) {
      return (expectedValues) =>
        createExpectCaller({
          actualValues,
          expectedValues,
          propertyChains: [
            'not',
            matcher
          ]
        })
    }
  }),
  rejects: (actualValues) => createExpectProxyAsPromise({
    actualValues,
    promiseMethod: 'rejects',
  }),
  resolves: (actualValues) => createExpectProxyAsPromise({
    actualValues,
    promiseMethod: 'resolves',
  }),
}

/**
 * Create expect caller.
 *
 * @param {{
 *   actualValues: Array<*>,
 *   expectedValues: Array<*>,
 *   propertyChains: Array<string>,
 * }} params
 * @returns {Array<*>} - Callers.
 */
function createExpectCaller ({
  actualValues,
  expectedValues,
  propertyChains,
}) {
  return actualValues
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
 *   actualValues: Array<*>,
 *   promiseMethod: string,
 * }} params
 * @returns {Proxy} - Proxy for expect methods.
 */
function createExpectProxyAsPromise ({
  actualValues,
  promiseMethod,
}) {
  return new Proxy(expect, {
    get (_, matcher) {
      if (matcher === 'not') {
        return new Proxy(expect, {
          get (_, matcher) {
            return (expectedValues) => Promise.allSettled(
              createExpectCaller({
                actualValues,
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
          actualValues,
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
