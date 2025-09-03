import { ContextStore as cs } from './contextStore'
import { Transaction } from '../pages/myoikocredit-pages/transactionsPageMOC'

export type DecimalFormat = "European format" | "English format"
export type DateFormat = "dd/mm/YYYY" | "dd MMMM YYYY"

export class Utils {

  static getFullName() {
    if (cs.has("firstName") && cs.has("lastName")) {
      return `${cs.get("firstName")} ${cs.get("lastName")}`
    }
    else {
      throw new Error("Missing required fields: firstName and/or lastName")
    }
  }

  static applyNumberFormat(decimalFormat: DecimalFormat, number: number, decimals: number) {
    switch (decimalFormat) {
      case "European format":
        return number.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      case "English format":
        return number.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    }
  }

  static getFormattedToday(dateFormat: DateFormat) {
    const today = new Date()
    switch (dateFormat) {
      case "dd/mm/YYYY":
        return today.toLocaleDateString("en-GB")
      case "dd MMMM YYYY":
        return today.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    }
  }

  static getTransactionType(transaction: Transaction) {
    switch (transaction) {
      case "Purchase":
        return "Investition"
      case "Redemption":
        return "Verkauf"
    }
  }

  static generateTimestamp() {
    const now = new Date()
    const pad = (num: number) => num.toString().padStart(2, "0")
    const year = now.getFullYear().toString().slice(2)
    const month = pad(now.getMonth() + 1)
    const day = pad(now.getDate())
    const hours = pad(now.getHours())
    const minutes = pad(now.getMinutes())
    const seconds = pad(now.getSeconds())
    return `${year}${month}${day}T${hours}${minutes}${seconds}`
  }
}