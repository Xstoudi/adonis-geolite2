declare module '@ioc:Geolite2' {
  import { AsnResponse, CityResponse, CountryResponse } from 'maxmind'
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  export interface Geolite2Config {}

  export interface Geolite2Contract {
    country(ip: string): CountryResponse | null
    city(ip: string): CityResponse | null
    asn(ip: string): AsnResponse | null
  }

  export interface Geolite2ManagerContract {
    init(): Promise<void>
    create(ctx: HttpContextContract): Geolite2Contract
    close(): void
  }
}
