declare module '@japa/runner' {
  import { Assert } from '@japa/assert'

  interface TestContext {
    assert: Assert
  }
}
