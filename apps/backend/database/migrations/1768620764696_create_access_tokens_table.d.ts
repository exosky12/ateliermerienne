import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    protected tableName: string;
    up(): Promise<void>;
    down(): Promise<void>;
}
