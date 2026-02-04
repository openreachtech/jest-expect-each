# Jest Extension `expect.each()`

## Overview

* The Jest extension `expect.each()` presented by Open Reach Tech Inc.

## Usage

1. npm install

    ```
    npm install @openreachtech/jest-expect-each
    ```

2. Run the following code before using `expect.each()` in a Jest test file.

    ```
    require('@openreachtech/jest-expect-each').setup()
    ```

3. Sample code as follows:

    ```
    test('sample test', () => {
      const actualValues = [1, 2, 3, 4].map(it => it * 100)
      const expectedValues = [100, 200, 300, 400]

      expect.each(actualValues).not.toBe(expectedValues)
    })
    ```

4. If you use type check by VS Code in the test file, please add `// @ts-expect-error` before the line of `expect.each()`.

    ```
    test('sample test', () => {
      const actualValues = [1, 2, 3, 4].map(it => it * 100)
      const expectedValues = [100, 200, 300, 400]

      // @ts-expect-error
      expect.each(actualValues).not.toBe(expectedValues)
    })
    ```
