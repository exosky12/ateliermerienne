import { AsyncLocalStorage } from 'node:async_hooks'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

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
