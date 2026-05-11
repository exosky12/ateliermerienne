import { AsyncLocalStorage } from 'node:async_hooks'
class TransactionContext {
  #storage = new AsyncLocalStorage()
  run(trx, callback) {
    return this.#storage.run(trx, callback)
  }
  get() {
    return this.#storage.getStore()
  }
  has() {
    return this.#storage.getStore() !== undefined
  }
}
export const transactionContext = new TransactionContext()
//# sourceMappingURL=transaction_context.js.map
