const API_BASE_URL = __API__ // из webpack.DefinePlugin или Vite env

class Endpoints {
  accountByAddress(fias: string, flat: string): string {
    return `addresses/${fias}/flat/${flat}`
  }

  accounts(): string {
    return "accounts"
  }

  addressAutocomplete(address: string): string {
    return `addresses/autocomplete?q=${encodeURIComponent(address)}`
  }

  houses(): string {
    return "houses"
  }

  searchDebtorByHouses(): string {
    return `search-accounts`
  }

  urlFor(endpoint: string): string {
    return `${API_BASE_URL}/${endpoint}`
  }

  user(account: string): string {
    return `users/${account}`
  }
}

export const endpoints = new Endpoints()
