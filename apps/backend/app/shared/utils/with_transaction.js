import db from '@adonisjs/lucid/services/db'
import { transactionContext } from '#contexts/transaction_context'
export function withTransaction(callback) {
  return db.transaction((trx) => {
    return transactionContext.run(trx, callback)
  })
}
//# sourceMappingURL=with_transaction.js.map
