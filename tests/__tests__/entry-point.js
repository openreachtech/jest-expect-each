describe('ESM entry point', () => {
  describe('should be defined', () => {
    test('setupExpectEach()', async () => {
      const { setupExpectEach } = await import('../../lib/setup-expect-each.js')

      expect(setupExpectEach)
        .toBeDefined()
    })
  })
})
