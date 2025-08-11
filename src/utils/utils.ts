import { ContextStore as cs } from './contextStore'
import { Transaction } from '../pages/myoikocredit-pages/transactionsPageMOC'

export type Format = "European format" | "English format"

export class Utils {

  static getFullName() {
    if (cs.has("firstName") && cs.has("lastName")) {
      return `${cs.get("firstName")} ${cs.get("lastName")}`
    }
    else {
      throw new Error("Missing required fields: firstName and/or lastName")
    }
  }

  static applyNumberFormat(format: Format, number: number, decimals: number) {
    switch (format) {
      case "European format":
        return number.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      case "English format":
        return number.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    }
  }

  static getFormattedToday() {
    const today = new Date()
    return today.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  static getTransactionType(transaction: Transaction) {
    switch (transaction) {
      case "Purchase":
        return "Investition"
      case "Redeem":
        return "Verkauf"
    }
  }
}