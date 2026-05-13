---
name: tuyau
description: Type-safe HTTP client for AdonisJS. Use when making API calls from frontend to AdonisJS backend. Provides end-to-end type safety between routes, validators, and frontend calls. Use when the user mentions "tuyau", "http client", "API calls", or "type-safe API".
---

# Tuyau

Type-safe HTTP client for AdonisJS applications with automatic type inference from routes and validators.

**Related skills**: `adonisjs-transformers`

## Critical Warnings

### The old API with `$get`, `$post`, `$put`, `$delete` NO LONGER EXISTS

```ts
// WRONG - This API does not exist anymore
const user = await tuyau.users.$get({ id: '1' })
const result = await tuyau.posts.$post({ body: {...} })

// CORRECT - Use route names with proxy syntax
const user = await tuyau.users.show({ params: { id: '1' } })
const result = await tuyau.posts.store({ body: {...} })
```

### When TanStack Query is in the project, ALL calls MUST use the integration

```ts
// WRONG - Never use manual fetch or direct tuyau calls when TanStack Query is available
const response = await fetch('/api/users')
const users = await tuyau.users.index()

// CORRECT - Always use queryOptions/mutationOptions
const usersQuery = useQuery(tuyau.users.index.queryOptions())
const createUser = useMutation(tuyau.users.store.mutationOptions())
```

## Available References

Load based on your current task. **DO NOT read all files at once**.

| Reference                      | Use when                                     | Content                                           |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------- |
| `references/tanstack-query.md` | Making API calls with React Query (PRIORITY) | queryOptions, mutationOptions, cache invalidation |
| `references/api-calls.md`      | Direct API calls without TanStack Query      | Proxy syntax, request method, parameters          |
| `references/backend.md`        | Setting up routes and validators             | Route names, validators, type inference           |
| `references/advanced.md`       | File uploads, URL generation                 | File uploads, urlFor, serialization concerns      |

**Load priority**:

- Using TanStack Query? → `references/tanstack-query.md` (most common case)
- Direct API calls? → `references/api-calls.md`
- Backend route setup? → `references/backend.md`
- File uploads or URL generation? → `references/advanced.md`

## Quick Reference

| Task                | Code                                                     |
| ------------------- | -------------------------------------------------------- |
| Query (TanStack)    | `useQuery(tuyau.users.index.queryOptions())`             |
| Mutation (TanStack) | `useMutation(tuyau.users.store.mutationOptions())`       |
| With params         | `tuyau.users.show.queryOptions({ params: { id: '1' } })` |
| With body           | `mutationOptions({ body: { title: 'Hello' } })`          |
| Direct call         | `await tuyau.users.show({ params: { id: '1' } })`        |
| Generate URL        | `urlFor('users.show', { id: '1' })`                      |

## API Call Methods

Three equivalent syntaxes (use route names, not URLs):

```ts
// 1. Proxy syntax (recommended)
const user = await tuyau.users.show({ params: { id: '1' } })

// 2. Request method
const user = await tuyau.request('users.show', { params: { id: '1' } })

// 3. HTTP method (when URL needed)
const user = await tuyau.get('/users/:id', { params: { id: '1' } })
```

## Parameters

```ts
await tuyau.users.posts.show({
  params: { userId: '1', postId: '2' }, // Route params
  query: { include: 'comments' }, // Query string
  body: { title: 'Hello' }, // Request body (POST/PUT/PATCH)
})
```

## Important Notes

- **Route names over URLs**: Always use route names (e.g., `users.show`) not hardcoded URLs
- **TanStack Query first**: If TanStack Query is installed, use it for ALL API calls
- **Type inference**: Types come from validators via `request.validateUsing()`
- **Monorepo usage**: Import registry from `@acme/api/registry` in separate packages
