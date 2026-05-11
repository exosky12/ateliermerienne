import type User from '#models/user';
import { BaseTransformer } from '@adonisjs/core/transformers';
export default class UserTransformer extends BaseTransformer<User> {
    toObject(): Pick<User, "createdAt" | "email" | "fullName" | "id" | "initials" | "updatedAt">;
}
