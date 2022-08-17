import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Geolite2Contract } from '@ioc:Geolite2'
import { CountryResponse, CityResponse, AsnResponse, Reader } from 'maxmind'

export class Geolite2 implements Geolite2Contract {
  constructor(
    private ctx: HttpContextContract,
    private countryReader: Reader<CountryResponse>,
    private cityReader: Reader<CityResponse>,
    private asnReader: Reader<AsnResponse>
  ) {}

  public country(ip: string): CountryResponse | null {
    return this.countryReader.get(ip)
  }
  public city(ip: string): CityResponse | null {
    return this.cityReader.get(ip)
  }
  public asn(ip: string): AsnResponse | null {
    return this.asnReader.get(ip)
  }
}
