import maxmind, { AsnResponse, CityResponse, CountryResponse, Reader } from 'maxmind'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Geolite2 } from '../Geolite2'
import { Geolite2ManagerContract } from '@ioc:Geolite2'

export class Geolite2Manager implements Geolite2ManagerContract {
  private countryReader: Reader<CountryResponse>
  private cityReader: Reader<CityResponse>
  private asnReader: Reader<AsnResponse>
  private closeAllCallback: () => void

  constructor(public application: ApplicationContract) {}

  public async init() {
    const geolite2: typeof import('geolite2-redist') = await Function(
      'return import("geolite2-redist")'
    )()

    const countryReader = await geolite2.open(geolite2.GeoIpDbName.Country, (dbPath) =>
      maxmind.open<CountryResponse>(dbPath)
    )
    const cityReader = await geolite2.open(geolite2.GeoIpDbName.City, (dbPath) =>
      maxmind.open<CityResponse>(dbPath)
    )
    const asnReader = await geolite2.open(geolite2.GeoIpDbName.ASN, (dbPath) =>
      maxmind.open<AsnResponse>(dbPath)
    )

    this.countryReader = countryReader
    this.cityReader = cityReader
    this.asnReader = asnReader

    // Trickery needed to access the WrapperReader type
    this.closeAllCallback = () => {
      countryReader.close()
      cityReader.close()
      asnReader.close()
    }
  }

  public create(ctx: HttpContextContract): Geolite2 {
    return new Geolite2(ctx, this.countryReader, this.cityReader, this.asnReader)
  }

  public close() {
    this.closeAllCallback()
  }
}
