import db from '@adonisjs/lucid/services/db'

import { transactionContext } from '#contexts/transaction_context'

/**
 * Run a callback function within a database transaction.
 * The transaction client will be available in the transaction context,
 * allowing you to use it in any part of the code without having to pass it explicitly.
 */
export function withTransaction<T>(callback: () => Promise<T>): Promise<T> {
  return db.transaction((trx) => {
    return transactionContext.run(trx, callback)
  })
}
