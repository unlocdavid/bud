import {Api as Base} from '@roots/bud-api'
import {Service} from '@roots/bud-framework'

/**
 * API service class
 *
 * @remarks
 * The API class binds all the facade functions provided by the package
 * and exposes them as a single object.
 *
 * @public
 */
export class Api extends Base implements Service {}
