import db from '@adonisjs/lucid/services/db'

import { transactionContext } from '../contexts/transaction_context.js'

export function withTransaction<T>(callback: () => Promise<T>): Promise<T> {
	return db.transaction((trx) => {
		return transactionContext.run(trx, callback)
	})
}
