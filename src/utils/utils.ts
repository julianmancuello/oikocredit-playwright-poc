import { faker } from '@faker-js/faker'
import { ContextStore as cs } from './contextStore'
import { Transaction } from '../pages/myoikocredit-pages/transactionsPageMOC'

export type Format = "European format" | "English format"

class Utils {

  generateAndStoreFullName() {
    var firstName = faker.person.firstName()
    var lastName = faker.person.lastName()
    cs.put("firstName", firstName)
    cs.put("lastName", lastName)
  }

  generateRandomInteger(upperBound: number) {
    return faker.number.int(upperBound)
  }

  generateRandomIntegerBetween(lowerBound: number, upperBound: number) {
    return faker.number.int({ min: lowerBound, max: upperBound })
  }

  getFullName() {
    if (cs.has("firstName") && cs.has("lastName")) {
      return `${cs.get("firstName")} ${cs.get("lastName")}`
    }
    else {
      throw new Error("Missing required fields: firstName and/or lastName")
    }
  }

  generateRandomMobile() {
    const mobile = faker.phone.number({ style: 'international' })
    return mobile.replace(/^(\+\d{2})(\d+)/, '$1 $2')
  }

  applyNumberFormat(format: Format, number: number, decimals: number) {
    switch (format) {
      case "European format":
        return number.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      case "English format":
        return number.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    }
  }

  getFormattedToday() {
    const today = new Date()
    return today.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  getTransactionType(transaction: Transaction) {
    switch (transaction) {
      case "Purchase":
        return "Investition"
      case "Redeem":
        return "Verkauf"
    }
  }
}

export const utils = new Utils()