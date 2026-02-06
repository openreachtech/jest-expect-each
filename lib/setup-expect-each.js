'use strict'

const ERROR_MESSAGE = {
  RECEIVED_LACKED_ARRAY: 'expect.each() received lacked array',
  RECEIVED_EXCESS_ARRAY: 'expect.each() received excess array',
}

module.exports.setupExpectEach = function () {
  /**
   * Extend each() to expect of Jest method.
   *
   * @param {Array<*>} actualValues - Test table.
   * @returns {Proxy<expect>} - Proxy of expect.
   */
  // @ts-expect-error
  expect.each = (actualValues) => new Proxy(expect, {
    /**
     * get() for Proxy sink.
     *
     * @param {typeof expect} _
     * @param {string} propertyName
     * @returns {Function} - Matcher handler.
     */
    get: (_, propertyName) => {
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
    /**
     * get() for Proxy sink.
     *
     * @param {typeof expect} _
     * @param {string} matcher
     * @returns {Function} - Matcher handler.
     */
    get: (_, matcher) => {
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
 * Define handler with each().
 *
 * @param {{
 *   actualValues: Array<*>,
 *   propertyChains: Array<string>,
 * }} params
 * @returns {Function} - Handler with each().
 */
function defineHandlerWithEach ({
  actualValues,
  propertyChains,
}) {
  const callback = (...expectedValues) =>
    dispatchMatcherWithSingleExpectedValue({
      actualValues,
      expectedValues,
      propertyChains,
    })

  callback.each = (expectedValues) =>
    dispatchMatcherWithPluralExpectedValues({
      actualValues,
      expectedValues,
      propertyChains,
    })

  return callback
}

/**
 * Dispatch matcher with single expected value.
 *
 * @param {{
 *   actualValues: Array<*>
 *   expectedValues: Array<*>
 *   propertyChains: Array<string>,
 * }} params
 * @returns {Array<*>} - Callers.
 * @throws {Error} - received lacked array
 * @throws {Error} - received excess array
 */
function dispatchMatcherWithSingleExpectedValue ({
  actualValues,
  expectedValues,
  propertyChains,
}) {
  return actualValues
    .map(value =>
      propertyChains.reduce(
        (receiver, it) => receiver[it],
        expect(value)
      )
    )
    .map((matcherHandler) => {
      try {
        matcherHandler(...expectedValues)
      } catch (error) {
        throw fabricateError({
          error,
        })
      }
    })
}

/**
 * Dispatch matcher with multiple expected values.
 *
 * @param {{
 *   actualValues: Array<*>,
 *   expectedValues: Array<*>,
 *   propertyChains: Array<string>,
 * }} params
 * @returns {Array<*>} - Callers.
 * @throws {Error} - received lacked array
 * @throws {Error} - received excess array
 */
function dispatchMatcherWithPluralExpectedValues ({
  actualValues,
  expectedValues,
  propertyChains,
}) {
  const normalizedExpectedValues = expectedValues.map(it =>
    Array.isArray(it)
      ? it
      : [it]
  )

  if (actualValues.length < normalizedExpectedValues.length) {
    throw Error(ERROR_MESSAGE.RECEIVED_LACKED_ARRAY)
  }

  if (actualValues.length > normalizedExpectedValues.length) {
    throw Error(ERROR_MESSAGE.RECEIVED_EXCESS_ARRAY)
  }

  return actualValues
    .map(value =>
      propertyChains.reduce(
        (receiver, it) => receiver[it],
        expect(value)
      )
    )
    .map((matcher, index) =>
      matcher(...normalizedExpectedValues[index])
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
  // @ts-expect-error
  return new Proxy(expect, {
    /**
     * get() for Proxy sink.
     *
     * @param {typeof expect} _
     * @param {string} matcher
     * @returns {Function} - Matcher handler.
     */
    get: (_, matcher) => {
      if (matcher === 'not') {
        return new Proxy(expect, {
          /**
           * get() for Proxy sink.
           *
           * @param {typeof expect} _
           * @param {string} matcher
           * @returns {Function} - Matcher handler.
           */
          get: (_, matcher) => {
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
