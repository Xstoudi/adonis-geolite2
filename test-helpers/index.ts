import { join } from 'path'

import { Filesystem } from '@poppinss/dev-utils'
import { Application } from '@adonisjs/core/build/standalone'

export const fs = new Filesystem(join(__dirname, 'app'))

export async function setup() {
  await fs.add('.env', '')
  await fs.add(
    'config/app.ts',
    `
    export const appKey = '${Math.random().toFixed(36).substring(2, 38)}',
    export const http = {
      cookie: {},
      trustProxy: () => true,
    }
  `
  )

  const app = new Application(fs.basePath, 'web', {
    providers: [
      '@adonisjs/core',
      '../../providers/Geolite2Provider',
      '@japa/preset-adonis/TestsProvider',
    ],
  })

  await app.setup()
  await app.registerProviders()
  await app.bootProviders()

  return app
}
