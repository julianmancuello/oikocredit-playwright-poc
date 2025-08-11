import { faker } from '@faker-js/faker'
import { ContextStore as cs } from './contextStore'

export class DataFactory {

  static generateAndStoreFullName() {
    var firstName = faker.person.firstName()
    var lastName = faker.person.lastName()
    cs.put("firstName", firstName)
    cs.put("lastName", lastName)
  }

  static generateRandomInteger(upperBound: number) {
    return faker.number.int(upperBound)
  }

  static generateRandomIntegerBetween(lowerBound: number, upperBound: number) {
    return faker.number.int({ min: lowerBound, max: upperBound })
  }

  static generateRandomMobile() {
    const mobile = faker.phone.number({ style: 'international' })
    return mobile.replace(/^(\+\d{2})(\d+)/, '$1 $2')
  }
}