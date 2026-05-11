import UserTransformer from '#transformers/user_transformer';
export default class ProfileController {
    async show({ auth, serialize }) {
        return serialize(UserTransformer.transform(auth.getUserOrFail()));
    }
}
//# sourceMappingURL=profile_controller.js.map