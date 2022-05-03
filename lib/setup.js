'use strict'

module.exports.setup = function () {
  /**
   * Extend each() to expect of Jest method.
   *
   * @param {Array<*>} actualTable - Test table.
   * @returns {Proxy<expect>} - Proxy of expect.
   */
  expect.each = function (actualTable) {
    const expectProxy = new Proxy(expect, {
      get (target, propertyName) {
        if (propertyName === 'not') {
          return new Proxy(expect, {
            get (target, matcher) {
              return (expectedArgs) => {
                actualTable
                  .map((it, index) =>
                    [it, expectedArgs[index]]
                  )
                  .find(([actual, expected]) =>
                    target(actual).not[matcher](expected)
                  )
              }
            }
          })
        }

        return (expectedArgs) => {
          actualTable
            .map((it, index) =>
              [it, expectedArgs[index]]
            )
            .find(([actual, expected]) =>
              target(actual)[propertyName](expected)
            )
        }
      }
    })

    return expectProxy
  }
}
