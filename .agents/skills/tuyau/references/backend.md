# Backend Setup

Routes, validators, and type inference for Tuyau.

## Route Names

Define routes with names using the `as()` method:

```ts
// start/routes.ts
import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
const PostsController = () => import('#controllers/posts_controller')

// Simple routes
router.get('users', [UsersController, 'index']).as('users.index')
router.get('users/:id', [UsersController, 'show']).as('users.show')
router.post('users', [UsersController, 'store']).as('users.store')
router.put('users/:id', [UsersController, 'update']).as('users.update')
router.delete('users/:id', [UsersController, 'delete']).as('users.delete')

// Nested routes
router.get('users/:userId/posts', [PostsController, 'index']).as('users.posts.index')
router.get('users/:userId/posts/:id', [PostsController, 'show']).as('users.posts.show')
```

Route names become the method chain on the frontend:

- `users.index` → `tuyau.users.index()`
- `users.posts.show` → `tuyau.users.posts.show()`

## Validators for Type Inference

Use `request.validateUsing()` for Tuyau to infer request body types:

```ts
// app/validators/user.ts
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().nullable(),
    email: vine.string().email().maxLength(254),
    password: vine.string().minLength(8).maxLength(32),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().nullable().optional(),
    email: vine.string().email().maxLength(254).optional(),
  })
)
```

## Controller Implementation

The call to `request.validateUsing()` is REQUIRED for type inference:

```ts
// app/controllers/users_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import UserTransformer from '#transformers/user_transformer'

export default class UsersController {
  async index({ serialize }: HttpContext) {
    const users = await User.all()
    return serialize(UserTransformer.transform(users))
  }

  async show({ params, serialize }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return serialize(UserTransformer.transform(user))
  }

  async store({ request, serialize }: HttpContext) {
    // This validateUsing call is CRITICAL for Tuyau type inference
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.create(payload)
    return serialize(UserTransformer.transform(user))
  }

  async update({ request, params, serialize }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    const user = await User.findOrFail(params.id)
    user.merge(payload)
    await user.save()
    return serialize(UserTransformer.transform(user))
  }

  async delete({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return { success: true }
  }
}
```

## Query Parameter Validation

Validate query parameters for typed filtering:

```ts
// app/validators/user.ts
export const listUsersValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
    status: vine.enum(['active', 'inactive']).optional(),
    search: vine.string().optional(),
  })
)
```

```ts
// app/controllers/users_controller.ts
async index({ request, serialize }: HttpContext) {
  const filters = await request.validateUsing(listUsersValidator)

  const users = await User.query()
    .if(filters.status, query => query.where('status', filters.status))
    .if(filters.search, query => query.where('name', 'like', `%${filters.search}%`))
    .paginate(filters.page || 1, filters.limit || 10)

  return {
    users: serialize(UserTransformer.transform(users.all())),
    meta: {
      currentPage: users.currentPage,
      lastPage: users.lastPage,
      total: users.total
    }
  }
}
```

Frontend query parameters are now typed:

```ts
const users = await tuyau.users.index({
  query: {
    page: 1,
    limit: 20,
    status: 'active', // Only 'active' or 'inactive' allowed
    search: 'john',
  },
})
```

## Type Inference Requirements

For Tuyau to infer types correctly:

1. **Use `request.validateUsing()`** - Types come from validators
2. **Use transformers** - Return transformed data, not raw models
3. **Use `serialize()`** - Ensures proper serialization for API responses

Without `validateUsing()`:

```ts
// Bad - no type inference
async store({ request }: HttpContext) {
  const payload = request.body() // Types will be 'any'
  // ...
}
```

With `validateUsing()`:

```ts
// Good - full type inference
async store({ request }: HttpContext) {
  const payload = await request.validateUsing(createUserValidator)
  // payload is fully typed based on validator schema
}
```

## Registry Generation

The assembler hook generates types in `.adonisjs/client/`:

```ts
// adonisrc.ts
import { generateRegistry } from '@tuyau/core/hooks'

export default defineConfig({
  hooks: {
    routesScanned: [generateRegistry()],
  },
})
```

For monorepos, export the registry:

```json
// package.json
{
  "name": "@acme/api",
  "exports": {
    "./registry": "./.adonisjs/client/registry.ts",
    "./data": "./.adonisjs/client/data.d.ts"
  }
}
```

## Quick Reference

| Task              | Code                                           |
| ----------------- | ---------------------------------------------- |
| Name a route      | `router.get('users', [...]).as('users.index')` |
| Define validator  | `vine.compile(vine.object({...}))`             |
| Use validator     | `await request.validateUsing(validator)`       |
| Return serialized | `return serialize(Transformer.transform(...))` |
