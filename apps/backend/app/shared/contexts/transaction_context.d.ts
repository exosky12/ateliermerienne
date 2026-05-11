import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
declare class TransactionContext {
  #private
  run<T>(trx: TransactionClientContract, callback: () => Promise<T>): Promise<T>
  get(): TransactionClientContract | undefined
  has(): boolean
}
export declare const transactionContext: TransactionContext
