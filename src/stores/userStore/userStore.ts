import { makeAutoObservable } from 'mobx'

// Текущий пользователь: его читают шапка, звёздочки и избранное, а ключ — транспорт через функцию из main.tsx.
class UserStore {
  /** Email того, кто вошёл. null — гость. */
  email: string | null = null
  /** Ключ сессии, который транспорт прикладывает к каждому запросу. null — гость. */
  token: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setEmail(email: string | null) {
    this.email = email
  }

  setToken(token: string | null) {
    this.token = token
  }
}

export const userStore = new UserStore()
