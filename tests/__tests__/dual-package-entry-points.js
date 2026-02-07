'use strict'

describe('dual entry points', () => {
  describe('should be defined', () => {
    test('from ESM entry point', async () => {
      const { default: setupExpectEach } = await import('../../lib/setup-expect-each.mjs')

      expect(setupExpectEach)
        .toBeDefined()
    })
  })
})
