import { test } from '@japa/runner'
import { Geolite2Manager } from '../src/Geolite2Manager'
import { setup, fs } from '../test-helpers'

test.group('Geolite2 Manager', (group) => {
  group.each.teardown(async () => {
    await fs.cleanup()
  })

  test('geolite2 manager init', async ({ assert }) => {
    const app = await setup()
    const manager = new Geolite2Manager(app)
    await manager.init()
    await app.shutdown()
  })
})
