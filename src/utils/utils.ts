import { faker } from '@faker-js/faker'
import { ContextStore as cs } from './contextStore'

class Utils {

  generateAndStoreFullName(){
    var firstName = faker.person.firstName()
    var lastName = faker.person.lastName()
    cs.put("firstName", firstName)
    console.log(`Guardado ${firstName}`)
    cs.put("lastName", lastName)
    console.log(`Guardado ${lastName}`)
  }

  generateRandomInteger(upperBound: number){
    return faker.number.int(upperBound)
  }

  getFullName(){
    if(cs.has("firstName") && cs.has("lastName")){
      return `${cs.get("firstName")} ${cs.get("lastName")}`
    }
    else {
      throw new Error("Missing required fields: firstName and/or lastName")
    }
  }
}

export const utils = new Utils()