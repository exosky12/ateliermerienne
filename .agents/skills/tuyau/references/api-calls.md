# Direct API Calls

Use this only when TanStack Query is NOT in the project. If TanStack Query is available, use `references/tanstack-query.md` instead.

## Proxy Syntax (Recommended)

Route names map directly to method chains:

```ts
// Route: router.post('register').as('auth.register')
const result = await tuyau.auth.register({
  body: { email: 'foo@ok.com', password: 'password123' },
})

// Route: router.get('users/:id').as('users.show')
const user = await tuyau.users.show({
  params: { id: '1' },
  query: { include: 'posts' },
})

// Route: router.get('users/:userId/posts/:postId').as('users.posts.show')
const post = await tuyau.users.posts.show({
  params: { userId: '1', postId: '2' },
})
```

Each segment of the route name becomes a property access. `users.posts.show` → `tuyau.users.posts.show()`.

## Request Method

Alternative syntax with route name as string:

```ts
const result = await tuyau.request('auth.register', {
  body: { email: 'foo@ok.com', password: 'password123' },
})

const user = await tuyau.request('users.show', {
  params: { id: '1' },
  query: { include: 'posts' },
})
```

Useful when route names come from variables or configuration.

## HTTP Method Functions

For working directly with URLs (less recommended):

```ts
const user = await tuyau.get('/users/:id', {
  params: { id: '123' },
  query: { include: 'posts' },
})

const post = await tuyau.post('/posts', {
  body: { title: 'Hello', content: 'World' },
})

const updated = await tuyau.patch('/posts/:id', {
  params: { id: '456' },
  body: { title: 'Updated title' },
})

await tuyau.delete('/posts/:id', {
  params: { id: '456' },
})
```

## Parameters

### Route Parameters

Substitute dynamic segments in URLs:

```ts
// Route: router.get('users/:id')
const user = await tuyau.users.show({
  params: { id: '123' },
})

// Route: router.get('users/:userId/posts/:postId')
const post = await tuyau.users.posts.show({
  params: { userId: '123', postId: '456' },
})
```

TypeScript enforces all required parameters.

### Query Parameters

Appended to URL for filtering, pagination, etc.:

```ts
const posts = await tuyau.posts.index({
  query: {
    page: 1,
    limit: 10,
    status: 'published',
  },
})
// Results in: GET /posts?page=1&limit=10&status=published
```

### Request Body

For POST, PUT, PATCH requests:

```ts
const post = await tuyau.posts.store({
  body: {
    title: 'My First Post',
    content: 'This is the content',
    published: true,
  },
})
```

Types are inferred from your backend validator.

### Combining All Parameters

```ts
const comment = await tuyau.posts.comments.store({
  params: { postId: '123' },
  query: { notify: true },
  body: {
    content: 'Great post!',
    author: 'John Doe',
  },
})
```

## Error Handling

```ts
try {
  const user = await tuyau.users.show({ params: { id: '1' } })
} catch (error) {
  if (error instanceof HTTPError) {
    console.error('Status:', error.response.status)
    const body = await error.response.json()
    console.error('Body:', body)
  }
}
```

## Quick Reference

| Task           | Code                                                       |
| -------------- | ---------------------------------------------------------- |
| GET request    | `await tuyau.users.show({ params: { id: '1' } })`          |
| POST request   | `await tuyau.posts.store({ body: {...} })`                 |
| PUT request    | `await tuyau.posts.update({ params: {...}, body: {...} })` |
| DELETE request | `await tuyau.posts.delete({ params: { id: '1' } })`        |
| With query     | `await tuyau.posts.index({ query: { page: 1 } })`          |
| Combined       | `{ params: {...}, query: {...}, body: {...} }`             |
