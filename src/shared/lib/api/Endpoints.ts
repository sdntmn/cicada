const API_BASE_URL = __API__

class Endpoints {
  accounts(): string {
    return `accounts`
  }

  urlFor(endpoint: string): string {
    return `${API_BASE_URL}/${endpoint}`
  }

  user(account: string): string {
    return `users/${account}`
  }
}

export const endpoints = new Endpoints()
