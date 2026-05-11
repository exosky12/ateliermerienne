import { UserSchema } from '#database/schema';
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
declare const User_base: typeof UserSchema & {
    new (...args: any[]): {
        verifyPassword(plainPassword: string): Promise<boolean>;
        validatePassword(plainPassword: string, passwordFieldName?: string): Promise<void>;
    };
    hashPassword<T extends Omit<import("@adonisjs/lucid/types/model").LucidModel, "constructor"> & (new (...args: any[]) => import("@adonisjs/lucid/types/model").LucidRow) & any>(this: T, user: InstanceType<T>): Promise<void>;
    findForAuth<T extends Omit<import("@adonisjs/lucid/types/model").LucidModel, "constructor"> & (new (...args: any[]) => import("@adonisjs/lucid/types/model").LucidRow) & any>(this: T, uids: string[], value: string): Promise<InstanceType<T> | null>;
    verifyCredentials<T extends Omit<import("@adonisjs/lucid/types/model").LucidModel, "constructor"> & (new (...args: any[]) => import("@adonisjs/lucid/types/model").LucidRow) & any>(this: T, uid: string, password: string): Promise<InstanceType<T>>;
};
export default class User extends User_base {
    static accessTokens: DbAccessTokensProvider<typeof User>;
    currentAccessToken?: AccessToken;
    get initials(): string;
}
export {};
