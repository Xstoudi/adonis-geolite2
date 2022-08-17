/// <reference path="../../adonis-typings/index.ts" />

import { ServerContract } from '@ioc:Adonis/Core/Server'
import { Geolite2ManagerContract } from '@ioc:Geolite2'
import { HttpContextConstructorContract } from '@ioc:Adonis/Core/HttpContext'

export function defineServerBindings(
  HttpContext: HttpContextConstructorContract,
  Server: ServerContract,
  Geolite2Manager: Geolite2ManagerContract
) {
  HttpContext.getter(
    'geolite',
    function geolite() {
      console.log('getting geolite')
      return Geolite2Manager.create(this)
    },
    false
  )
}
