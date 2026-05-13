# Advanced Features

File uploads, URL generation, and serialization concerns.

## File Uploads

Tuyau automatically detects File objects and switches to FormData encoding:

### Frontend

```tsx
import { tuyau } from '~/lib/client'

async function uploadAvatar(file: File) {
  const result = await tuyau.users.avatar.update({
    body: {
      avatar: file,
      description: 'My new avatar',
    },
  })
}

// In component
function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0]
  if (file) uploadAvatar(file)
}
```

### Multiple Files

```ts
const result = await tuyau.posts.attachments.create({
  params: { postId: '123' },
  body: {
    files: [file1, file2, file3],
    visibility: 'public',
  },
})
```

### Backend Validator

```ts
// app/validators/user.ts
export const updateAvatarValidator = vine.compile(
  vine.object({
    avatar: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    description: vine.string().optional(),
  })
)
```

### Backend Controller

```ts
async updateAvatar({ request, auth }: HttpContext) {
  const { avatar, description } = await request.validateUsing(updateAvatarValidator)

  await avatar.move('uploads/avatars', {
    name: `${auth.user!.id}.${avatar.extname}`
  })

  return { success: true }
}
```

## URL Generation with `urlFor`

Generate URLs from route names without making API calls:

### Basic Usage

```ts
import { urlFor } from '~/lib/client'

const logoutUrl = urlFor('auth.logout')
// Returns: '/logout'

const profileUrl = urlFor('users.profile', { id: '123' })
// Returns: '/users/123/profile'
```

### Method-Specific

```ts
const userUrl = urlFor.get('users.show', { id: 1 })
// Returns: { method: 'get', url: '/users/1' }

const createUserUrl = urlFor.post('users.store')
// Returns: { method: 'post', url: '/users' }
```

### With Query Parameters

```ts
const postsUrl = urlFor.get(
  'posts.index',
  {},
  {
    qs: { page: 2, limit: 10, status: 'published' },
  }
)
// Returns: { method: 'get', url: '/posts?page=2&limit=10&status=published' }
```

### Wildcard Parameters

```ts
// Route: router.get('docs/*', [...]).as('docs.show')
const docsUrl = urlFor.get('docs.show', { '*': ['introduction', 'getting-started'] })
// Returns: { method: 'get', url: '/docs/introduction/getting-started' }
```

### Positional Parameters

```ts
// Route: /users/:id/posts/:postId
// Using object
const url1 = urlFor.get('users.posts.show', { id: '123', postId: '456' })

// Using array (positional)
const url2 = urlFor.get('users.posts.show', ['123', '456'])

// Both return: { method: 'get', url: '/users/123/posts/456' }
```

## Type-Level Serialization

Tuyau transforms types to match JSON serialization:

### Date Serialization

Dates become strings over HTTP:

```ts
// Backend returns Date
return { createdAt: new Date() }

// Frontend receives string
const post = await tuyau.posts.show({ params: { id: '1' } })
console.log(post.createdAt.toUpperCase()) // Works - it's a string
console.log(post.createdAt.getTime()) // Error - not a Date
```

### Model Serialization Problem

Returning Lucid models directly loses type information:

```ts
// Bad - loses type info
async show({ params }: HttpContext) {
  const post = await Post.find(params.id)
  return post // Type becomes generic ModelObject
}
```

### Solution: Use Transformers

```ts
// Good - preserves types
async show({ params, serialize }: HttpContext) {
  const post = await Post.find(params.id)
  return serialize(PostTransformer.transform(post))
}
```

See `adonisjs-transformers` skill for transformer details.

## Client Configuration

Tuyau is built on Ky. Common configuration options:

```ts
const tuyau = createTuyau({
  baseUrl: import.meta.env.VITE_API_URL,
  registry,

  // Recommended
  headers: { Accept: 'application/json' },
  credentials: 'include', // For session-based auth

  // Optional
  timeout: 30000, // 30 seconds

  // Retry configuration
  retry: {
    limit: 3,
    methods: ['get', 'post'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },

  // Hooks
  hooks: {
    beforeRequest: [(request) => console.log('Request:', request.url)],
    afterResponse: [(request, options, response) => console.log('Response:', response.status)],
    beforeError: [
      (error) => {
        console.error('Error:', error.message)
        return error
      },
    ],
  },
})
```

## Quick Reference

| Task            | Code                                           |
| --------------- | ---------------------------------------------- |
| Upload file     | `{ body: { file: fileObject } }`               |
| Multiple files  | `{ body: { files: [file1, file2] } }`          |
| Generate URL    | `urlFor('route.name', { id: '1' })`            |
| URL with query  | `urlFor.get('route', {}, { qs: { page: 1 } })` |
| Set timeout     | `createTuyau({ timeout: 30000, ... })`         |
| Include cookies | `createTuyau({ credentials: 'include', ... })` |
