import User from '#models/user';
import { loginValidator } from '#validators/user';
import UserTransformer from '#transformers/user_transformer';
export default class AccessTokensController {
    async store({ request, serialize }) {
        const { email, password } = await request.validateUsing(loginValidator);
        const user = await User.verifyCredentials(email, password);
        const token = await User.accessTokens.create(user);
        return serialize({
            user: UserTransformer.transform(user),
            token: token.value.release(),
        });
    }
    async destroy({ auth }) {
        const user = auth.getUserOrFail();
        if (user.currentAccessToken) {
            await User.accessTokens.delete(user, user.currentAccessToken.identifier);
        }
        return {
            message: 'Logged out successfully',
        };
    }
}
//# sourceMappingURL=access_tokens_controller.js.map