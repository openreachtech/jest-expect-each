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
      return expectProxyCreators[propertyName]?.(actualTable)
        ?? ((expectedArgs) => createExpectCaller({
          actualTable,
          expectedArgs,
          propertyChains: [propertyName]
        }))
    }
  })
}

/** @type {Object.<string, Function>}} creators */
const expectProxyCreators = {
  not: (actualTable) => new Proxy(expect, {
    get (_, matcher) {
      return (expectedArgs) =>
        createExpectCaller({
          actualTable,
          expectedArgs,
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
 *   expectedArgs: Array<*>,
 *   propertyChains: Array<string>,
 * }} params
 * @returns {Array<*>} - Callers.
 */
function createExpectCaller ({
  actualTable,
  expectedArgs,
  propertyChains,
}) {
  return actualTable
    .map((it, index) =>
      [it, expectedArgs[index]]
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
            return (expectedArgs) => Promise.allSettled(
              createExpectCaller({
                actualTable,
                expectedArgs,
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

      return (expectedArgs) => Promise.allSettled(
        createExpectCaller({
          actualTable,
          expectedArgs,
          propertyChains: [
            promiseMethod,
            matcher
          ]
        })
      )
    }
  })
}
