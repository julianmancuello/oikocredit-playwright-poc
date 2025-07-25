export enum Environment {
  LTP = 'ltp',
  ACC = 'acc'
}

class EnvUtils {

  parseAndValidateEnvironment(env: string): Environment {
    const envLower = env.toLowerCase()

    if (!Object.values(Environment).includes(envLower as Environment)) {
      throw new Error(`Environment '${env}' is not supported`)
    }

    return envLower as Environment
  }
}

export const envUtils = new EnvUtils()