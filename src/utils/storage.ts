type storageType = {
  localStorageEnable: boolean
  k: string
  getItem(k: string): string
  setItem(k: string, v: string): void
  removeItem(k: string): void
}
const storage: storageType = {
  k: '',
  localStorageEnable: true,

  setItem(k: string, v: string) {
    try {
      localStorage.setItem(k, v)
    } catch (ex) {
      this.localStorageEnable = false
      storage.k = v
    }
  },

  getItem(k: string): string {
    try {
      if (this.localStorageEnable) {
        return localStorage.getItem(k) || ''
      }
      return storage.k
    } catch (ex) {
      return storage.k
    }
  },

  removeItem(k: string) {
    try {
      localStorage.removeItem(k)
    } catch (ex) {
      this.localStorageEnable = false
    }
  }
}

export default storage
