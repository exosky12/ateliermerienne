import type { HttpContext } from '@adonisjs/core/http';
export default class AccessTokensController {
    store({ request, serialize }: HttpContext): Promise<{
        data: {
            token: string;
            user: {
                createdAt: string | null;
                email: string;
                fullName: string | null;
                id: number;
                initials: string;
                updatedAt: string | null;
            };
        };
    }>;
    destroy({ auth }: HttpContext): Promise<{
        message: string;
    }>;
}
