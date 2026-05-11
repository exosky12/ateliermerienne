import { BaseTransformer } from '@adonisjs/core/transformers';
export default class UserTransformer extends BaseTransformer {
    toObject() {
        return this.pick(this.resource, [
            'id',
            'fullName',
            'email',
            'createdAt',
            'updatedAt',
            'initials',
        ]);
    }
}
//# sourceMappingURL=user.js.map