import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class Geolite2Provider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Geolite2', () => {
      const { Geolite2Manager } = require('../src/Geolite2Manager')
      return new Geolite2Manager(this.app, this.app.config.get('geolite2', {}))
    })
  }

  public async boot() {
    const geolite2Manager = this.app.container.resolveBinding('Geolite2')
    await geolite2Manager.init()
    this.registerServerBindings()
  }

  public async shutdown() {
    this.app.container.resolveBinding('Geolite2').close()
  }

  protected registerTestsBindings() {
    this.app.container.withBindings(
      ['Japa/Preset/ApiRequest', 'Japa/Preset/ApiResponse', 'Japa/Preset/ApiClient', 'Geolite2'],
      (ApiRequest, ApiResponse, ApiClient, Geolite2) => {
        const { defineTestsBindings } = require('../src/Bindings/Tests')
        defineTestsBindings(ApiRequest, ApiResponse, ApiClient, Geolite2)
      }
    )
  }

  protected registerServerBindings() {
    this.app.container.withBindings(
      ['Adonis/Core/Server', 'Adonis/Core/HttpContext', 'Geolite2'],
      (Server, HttpContext, Geolite2) => {
        const { defineServerBindings } = require('../src/Bindings/Server')
        defineServerBindings(HttpContext, Server, Geolite2)
      }
    )
  }
}
