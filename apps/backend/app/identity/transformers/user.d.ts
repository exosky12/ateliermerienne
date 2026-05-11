import { BaseTransformer } from '@adonisjs/core/transformers';
import User from '#identity/models/user';
export default class UserTransformer extends BaseTransformer<User> {
    toObject(): Pick<User, "createdAt" | "email" | "fullName" | "id" | "initials" | "updatedAt">;
}
