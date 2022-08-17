declare module '@ioc:Adonis/Core/HttpContext' {
  import { Geolite2Contract } from '@ioc:Geolite2'

  interface HttpContextContract {
    geolite: Geolite2Contract
  }
}
