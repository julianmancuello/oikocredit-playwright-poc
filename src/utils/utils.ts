import { faker } from '@faker-js/faker'
import { ContextStore as cs } from './contextStore'

class Utils {

  generateAndStoreFullName(){
    var firstName = faker.person.firstName()
    var lastName = faker.person.lastName()
    cs.put("firstName", firstName)
    cs.put("lastName", lastName)
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

  generateRandomMobile(){
    const mobile = faker.phone.number({style: 'international'})
    return mobile.replace(/^(\+\d{2})(\d+)/, '$1 $2')
  }
}

export const utils = new Utils()