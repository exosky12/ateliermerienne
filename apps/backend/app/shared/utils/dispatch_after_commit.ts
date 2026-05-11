/**
 * Dispatch an acync callback after the current transaction commits.
 * If there's no transaction context, the callback is executed immediately.
 */
import { transactionContext } from '#contexts/transaction_context'

export async function dispatchAfterCommit(callback: () => Promise<void>): Promise<void> {
  const trx = transactionContext.get()

  if (trx) {
    trx.after('commit', callback)
  } else {
    await callback()
  }
}
