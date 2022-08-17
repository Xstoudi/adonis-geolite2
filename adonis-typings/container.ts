declare module '@ioc:Adonis/Core/Application' {
  import { Geolite2ManagerContract } from '@ioc:Geolite2'

  interface ContainerBindings {
    Geolite2: Geolite2ManagerContract
  }
}
