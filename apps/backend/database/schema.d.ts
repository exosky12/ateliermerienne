import { BaseModel } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
export declare class AuthAccessTokenSchema extends BaseModel {
    static $columns: readonly ['abilities', 'createdAt', 'expiresAt', 'hash', 'id', 'lastUsedAt', 'name', 'tokenableId', 'type', 'updatedAt'];
    $columns: readonly ["abilities", "createdAt", "expiresAt", "hash", "id", "lastUsedAt", "name", "tokenableId", "type", "updatedAt"];
    abilities: string;
    createdAt: DateTime | null;
    expiresAt: DateTime | null;
    hash: string;
    id: number;
    lastUsedAt: DateTime | null;
    name: string | null;
    tokenableId: number;
    type: string;
    updatedAt: DateTime | null;
}
export declare class UserSchema extends BaseModel {
    static $columns: readonly ['createdAt', 'email', 'fullName', 'id', 'password', 'updatedAt'];
    $columns: readonly ["createdAt", "email", "fullName", "id", "password", "updatedAt"];
    createdAt: DateTime;
    email: string;
    fullName: string | null;
    id: number;
    password: string;
    updatedAt: DateTime | null;
}
