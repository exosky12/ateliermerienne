import { AsyncLocalStorage } from 'node:async_hooks'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

/**
 * A context to store the current transaction client using AsyncLocalStorage.
 * This allows us to access the transaction client in any part of the code without
 * having to pass it explicitly.
 */
class TransactionContext {
  #storage = new AsyncLocalStorage<TransactionClientContract>()

  run<T>(trx: TransactionClientContract, callback: () => Promise<T>): Promise<T> {
    return this.#storage.run(trx, callback)
  }

  get(): TransactionClientContract | undefined {
    return this.#storage.getStore()
  }

  has(): boolean {
    return this.#storage.getStore() !== undefined
  }
}

export const transactionContext = new TransactionContext()
