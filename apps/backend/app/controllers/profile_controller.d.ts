import type { HttpContext } from '@adonisjs/core/http';
export default class ProfileController {
    show({ auth, serialize }: HttpContext): Promise<{
        data: {
            createdAt: string | null;
            email: string;
            fullName: string | null;
            id: number;
            initials: string;
            updatedAt: string | null;
        };
    }>;
}
