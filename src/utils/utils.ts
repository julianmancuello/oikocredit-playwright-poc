import { faker } from '@faker-js/faker'
import { ContextStore } from './ContextStore'

class Utils {

  generateAndStoreFullName(){
    var firstName = faker.person.firstName()
    var lastName = faker.person.lastName()
    ContextStore.put("firstName", firstName)
    console.log(`Guardado ${firstName}`)
    ContextStore.put("lastName", lastName)
    console.log(`Guardado ${lastName}`)
  }
}

export const utils = new Utils()