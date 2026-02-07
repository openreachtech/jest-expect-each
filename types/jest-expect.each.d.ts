// types/jest-expect.each.d.ts
declare global {
  namespace jest {
    interface Expect {
      /**
       * Test multiple values against the same matcher
       * @example
       * expect.each([1, 2, 3]).toBe(expected)
       * expect.each([1, 2, 3]).toBe.each([1, 2, 3])
       */
      each<T>(actualValues: Array<T>): ExpectEachProxy<T>
    }
  }
}

type MatchersToEach<M> = {
  [K in keyof M]: M[K] extends (...args: any[]) => any
    ? MatcherWithEach<M[K]>
    : M[K]
}

type MatchersToEachAsync<M> = {
  [K in keyof M]: M[K] extends (...args: any[]) => any
    ? MatcherWithEachAsync<M[K]>
    : M[K]
}

interface ExpectEachProxy<T> extends MatchersToEach<jest.Matchers<void>> {
  not: MatchersToEach<jest.Matchers<void>>
  resolves: MatchersToEachAsync<jest.Matchers<any>> & {
    not: MatchersToEachAsync<jest.Matchers<any>>
  }
  rejects: MatchersToEachAsync<jest.Matchers<any>> & {
    not: MatchersToEachAsync<jest.Matchers<any>>
  }
}

type MatcherWithEach<F> = F extends (...args: infer Args) => infer R
  ? {
      (...args: Args): R
      each(expectedValues: Array<Args | Args[0]>): R
    }
  : never

type MatcherWithEachAsync<F> = F extends (...args: infer Args) => any
  ? {
      (...args: Args): Promise<void>
      each(expectedValues: Array<Args | Args[0]>): Promise<void>
    }
  : never

export {}
