'use strict'

const ERROR_MESSAGE = {
  RECEIVED_LACKED_ARRAY: 'expect.each() received lacked array',
  RECEIVED_EXCESS_ARRAY: 'expect.each() received excess array',
}

module.exports.setupExpectEach = function () {
  /**
   * Extend each() to expect of Jest method.
   *
   * @param {Parameters<jest.Expect['each']>[0]} actualValues - Test table.
   * @returns {ReturnType<jest.Expect['each']>} - Proxy of expect.
   */
  expect.each = (actualValues) => new Proxy(/** @type {*} */ (expect), {
    /**
     * get() for Proxy sink.
     *
     * @param {typeof expect} _
     * @param {string} matcherName
     * @returns {Function} - Matcher handler.
     */
    get: (_, matcherName) => {
      if (matcherName === 'not') {
        return new Proxy(expect, {
          /**
           * get() for Proxy sink.
           *
           * @param {typeof expect} _
           * @param {string} notMatcherName
           * @returns {Function} - Matcher handler.
           */
          get: (_, notMatcherName) =>
            defineHandlerWithEach({
              actualValues,
              propertyChains: [
                'not',
                notMatcherName
              ]
            })
        })
      }

      if (matcherName === 'resolves') {
        return createExpectProxyAsPromise({
          actualValues,
          promiseMethod: 'resolves',
        })
      }

      if (matcherName === 'rejects') {
        return createExpectProxyAsPromise({
          actualValues,
          promiseMethod: 'rejects',
        })
      }

      return defineHandlerWithEach({
        actualValues,
        propertyChains: [matcherName],
      })
    }
  })
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
  if (actualValues.length < expectedValues.length) {
    throw fabricateError({
      error: Error(ERROR_MESSAGE.RECEIVED_EXCESS_ARRAY),
    })
  }

  if (actualValues.length > expectedValues.length) {
    throw fabricateError({
      error: Error(ERROR_MESSAGE.RECEIVED_LACKED_ARRAY),
    })
  }

  const normalizedExpectedValues = expectedValues.map(it =>
    Array.isArray(it)
      ? it
      : [it]
  )

  return actualValues
    .map(value =>
      propertyChains.reduce(
        (receiver, it) => receiver[it],
        expect(value)
      )
    )
    .map((actualMatcher, index) => {
      try {
        actualMatcher(...normalizedExpectedValues[index])
      } catch (error) {
        throw fabricateError({
          error,
        })
      }
    })
}

/**
 * Create expect proxy.
 *
 * @param {{
 *   actualValues: Array<*>,
 *   promiseMethod: string,
 * }} params
 * @returns {Proxy<ReturnType<jest.Expect['each']>>} - Proxy for expect methods.
 */
function createExpectProxyAsPromise ({
  actualValues,
  promiseMethod,
}) {
  return new Proxy(/** @type {*} */ (expect), {
    /**
     * get() for Proxy sink.
     *
     * @param {typeof expect} _
     * @param {string} matcherName
     * @returns {Function} - Matcher handler.
     */
    get: (_, matcherName) => {
      if (matcherName === 'not') {
        return new Proxy(expect, {
          /**
           * get() for Proxy sink.
           *
           * @param {typeof expect} _
           * @param {string} notMatcherName
           * @returns {Function} - Matcher handler.
           */
          get: (_, notMatcherName) =>
            defineHandlerWithEachAsync({
              actualValues,
              propertyChains: [
                promiseMethod,
                'not',
                notMatcherName,
              ],
            })
        })
      }

      return defineHandlerWithEachAsync({
        actualValues,
        propertyChains: [
          promiseMethod,
          matcherName,
        ],
      })
    }
  })
}

/**
 * Define handler with each() as async.
 *
 * @param {{
 *   actualValues: Array<*>,
 *   propertyChains: Array<string>,
 * }} params
 * @returns {Function} - Handler with each().
 */
function defineHandlerWithEachAsync ({
  actualValues,
  propertyChains,
}) {
  const callback = (...expectedValues) =>
    dispatchMatcherWithSingleExpectedValueAsync({
      actualValues,
      expectedValues,
      propertyChains,
    })

  callback.each = (expectedValues) =>
    dispatchMatcherWithPluralExpectedValuesAsync({
      actualValues,
      expectedValues,
      propertyChains,
    })

  return callback
}

/**
 * Dispatch matcher with single expected value. (as async)
 *
 * @param {{
 *   actualValues: Array<*>
 *   expectedValues: Array<*>
 *   propertyChains: Array<string>,
 * }} params
 * @returns {Promise<void>} - No return value.
 * @throws {Error} - Fabricated error.
 */
async function dispatchMatcherWithSingleExpectedValueAsync ({
  actualValues,
  expectedValues,
  propertyChains,
}) {
  const promises = actualValues
    .map(value =>
      propertyChains.reduce(
        (receiver, it) => receiver[it],
        expect(value)
      )
    )
    .map((matcher) =>
      () => matcher(...expectedValues)
    )

  await Promise.all(promises.map(it => it()))
    .catch((error) => {
      throw fabricateError({
        error,
      })
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
 * @returns {Promise<void>} - No return value.
 * @throws {Error} - received lacked array
 * @throws {Error} - received excess array
 * @throws {Error} - Fabricated error.
 */
async function dispatchMatcherWithPluralExpectedValuesAsync ({
  actualValues,
  expectedValues,
  propertyChains,
}) {
  if (actualValues.length < expectedValues.length) {
    throw fabricateError({
      error: Error(ERROR_MESSAGE.RECEIVED_EXCESS_ARRAY),
    })
  }

  if (actualValues.length > expectedValues.length) {
    throw fabricateError({
      error: Error(ERROR_MESSAGE.RECEIVED_LACKED_ARRAY),
    })
  }

  const normalizedExpectedValues = expectedValues.map(it =>
    Array.isArray(it)
      ? it
      : [it]
  )

  const promises = actualValues
    .map((value, index) =>
      propertyChains.reduce(
        (receiver, it) => receiver[it],
        expect(value)
      )
    )
    .map((matcher, index) =>
      () => matcher(...normalizedExpectedValues[index])
    )

  await Promise.all(promises.map(it => it()))
    .catch((error) => {
      throw fabricateError({
        error,
      })
    })
}

// -----------------------------------------------------------------------------

/**
 * Fertilize error object.
 *
 * @param {{
 *   error: Error,
 * }} params
 * @returns {Error} - Fertilized error.
 */
function fabricateError ({
  error,
}) {
  const messages = error.stack.split('\n')

  const SETUP_FILE_NAME = 'setup-expect-each.js'
  const startedIndex = messages.findIndex(it => it.includes(SETUP_FILE_NAME))
  const endedIndex = messages.findLastIndex(it => it.includes(SETUP_FILE_NAME))

  messages.splice(
    startedIndex,
    endedIndex - startedIndex + 1
  )
  error.stack = messages.join('\n')

  return error
}
