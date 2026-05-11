import { transactionContext } from '#contexts/transaction_context'
export async function dispatchAfterCommit(callback) {
  const trx = transactionContext.get()
  if (trx) {
    trx.after('commit', callback)
  } else {
    await callback()
  }
}
//# sourceMappingURL=dispatch_after_commit.js.map
