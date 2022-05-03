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
      if (['rejects', 'resolves'].includes(propertyName)) {
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
                        propertyName,
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
                  propertyName,
                  matcher
                ]
              })
            )
          }
        })
      }

      if (propertyName === 'not') {
        return new Proxy(expect, {
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
        })
      }

      return (expectedArgs) =>
        createExpectCaller({
          actualTable,
          expectedArgs,
          propertyChains: [propertyName]
        })
    }
  })
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
