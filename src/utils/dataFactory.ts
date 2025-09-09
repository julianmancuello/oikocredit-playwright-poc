import { faker } from '@faker-js/faker'
import { ContextStore as cs } from './contextStore'
import { Utils as utils } from './utils'

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

  static generateMobileNumber(keepCountryCode: boolean) {
    const mobile = faker.phone.number({ style: 'international' })
    if (keepCountryCode) {
      return mobile.replace(/^(\+\d{2})(\d+)/, '$1 $2')
    } else {
      return mobile.replace(/^\+\d{2}/, '')
    }
  }

  static generateRandomUsername() {
    if(!cs.has("firstName") && !cs.has("lastName")){
      this.generateAndStoreFullName()
    }
    let lastName = cs.get<string>("lastName").replace(/[^a-zA-Z]/g, "")
    const randomUsername = (`${cs.get("firstName")}${lastName}${this.generateRandomInteger(100)}`).toLowerCase()
    cs.put("newUsername", randomUsername)
    return randomUsername
  }

  static generateDummyEmail(baseEmail: string) {
    const [localPart, domain] = baseEmail.split("@")
    const timestamp = utils.generateTimestamp()
    const dummyEmail = `${localPart}+${timestamp}@${domain}`
    cs.put("dummyEmail", dummyEmail)
    return dummyEmail
  }

  static generateCity() {
    return faker.location.city()
  }

  static generateStreet() {
    return faker.location.street()
  }

  static generatePostalCode() {
    return faker.location.zipCode('####?')
  }

  static generateBirthDate() {
    const rawDate = faker.date.birthdate()
    const day = String(rawDate.getDate()).padStart(2, "0")
    const month = String(rawDate.getMonth() + 1).padStart(2, "0")
    const year = rawDate.getFullYear()

    if (cs.get("language") === "en_US") {
      return `${month}/${day}/${year}`
    } else {
      return `${day}/${month}/${year}`
    }
  }
}