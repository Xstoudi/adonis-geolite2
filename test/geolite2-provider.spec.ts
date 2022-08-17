import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'
import { Geolite2Manager } from '../src/Geolite2Manager'
import { setup, fs } from '../test-helpers'
import { createServer } from 'http'

test.group('Geolite2 Provider', (group) => {
  group.each.teardown(async () => {
    ApiClient.clearSetupHooks()
    ApiClient.clearTeardownHooks()
    ApiClient.clearRequestHandlers()
    await fs.cleanup()
  })

  test('register geolite2 provider', async ({ assert }) => {
    const app = await setup()

    assert.instanceOf(app.container.use('Geolite2'), Geolite2Manager)
    assert.deepEqual(app.container.use('Geolite2'), app.container.use('Geolite2'))
  })

  test('set geolite2 on api request', async ({ assert }) => {
    const app = await setup()

    const server = createServer(async (req, res) => {
      const ctx = app.container.use('Adonis/Core/HttpContext').create('/', {}, req, res)
      ctx.response.finish()
    })
    server.listen(3333)
    console.log('listening')

    const client = new (app.container.use('Japa/Preset/ApiClient'))('http://localhost:3333')
    const response = await client.get('/')
    server.close()
    //console.log(response)
  })
})
