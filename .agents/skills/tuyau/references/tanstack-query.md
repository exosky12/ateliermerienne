# TanStack Query Integration

When TanStack Query is in the project, **ALL API calls MUST use this integration**. Never use manual fetch or direct tuyau calls.

## Setup

```ts
// src/lib/client.ts
import { registry } from '@acme/api/registry'
import { createTuyau } from '@tuyau/core/client'
import { QueryClient } from '@tanstack/react-query'
import { createTuyauReactQueryClient } from '@tuyau/react-query'

export const queryClient = new QueryClient()
export const client = createTuyau({ baseUrl: import.meta.env.VITE_API_URL, registry })
export const tuyau = createTuyauReactQueryClient({ client })
```

## Queries with `queryOptions()`

Use `queryOptions()` to generate options for `useQuery`:

```tsx
import { useQuery } from '@tanstack/react-query'
import { tuyau } from '~/lib/client'

function PostsList() {
  const postsQuery = useQuery(tuyau.posts.index.queryOptions())

  if (postsQuery.isLoading) return <div>Loading...</div>
  if (postsQuery.isError) return <div>Error loading posts</div>

  return (
    <div>
      {postsQuery.data?.posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  )
}
```

### With Parameters

```tsx
function PostDetail({ postId }: { postId: string }) {
  const postQuery = useQuery(
    tuyau.posts.show.queryOptions(
      {
        params: { id: postId },
        query: { include: 'comments' },
      },
      {
        staleTime: 5000,
        refetchOnWindowFocus: false,
      }
    )
  )

  return <div>{postQuery.data?.post.title}</div>
}
```

First argument: API parameters (`params`, `query`). Second argument: TanStack Query options.

## Mutations with `mutationOptions()`

```tsx
import { useMutation } from '@tanstack/react-query'
import { tuyau, queryClient } from '~/lib/client'

function CreatePost() {
  const createPost = useMutation(
    tuyau.posts.store.mutationOptions({
      onSuccess: () => {
        // Invalidate posts list after creating
        queryClient.invalidateQueries({
          queryKey: tuyau.posts.index.pathKey(),
        })
      },
    })
  )

  const handleSubmit = (data: { title: string; content: string }) => {
    createPost.mutate({
      body: {
        title: data.title,
        content: data.content,
        authorId: 1,
      },
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit({ title: 'My Post', content: 'Content' })
      }}
    >
      <button type="submit" disabled={createPost.isPending}>
        {createPost.isPending ? 'Creating...' : 'Create Post'}
      </button>
      {createPost.isError && <p>Error: {createPost.error.message}</p>}
    </form>
  )
}
```

## Infinite Queries with `infiniteQueryOptions()`

### Frontend

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'
import { tuyau } from '~/lib/client'

function InfinitePosts() {
  const postsQuery = useInfiniteQuery(
    tuyau.posts.list.infiniteQueryOptions(
      {
        query: { limit: 10, search: 'typescript' },
      },
      {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.meta.nextPage,
        pageParamKey: 'page',
      }
    )
  )

  const allPosts = postsQuery.data?.pages.flatMap((page) => page.posts) || []

  return (
    <div>
      {allPosts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}

      {postsQuery.hasNextPage && (
        <button onClick={() => postsQuery.fetchNextPage()} disabled={postsQuery.isFetchingNextPage}>
          {postsQuery.isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  )
}
```

### Backend Validator

The `pageParamKey` must match a field in your validator:

```ts
// app/validators/post.ts
export const listPostsValidator = vine.compile(
  vine.object({
    page: vine.number().optional(), // Must match pageParamKey
    limit: vine.number().optional(),
    search: vine.string().optional(),
  })
)
```

### Backend Controller

```ts
async list({ request, serialize }: HttpContext) {
  const { page = 1, limit = 10, search } = await request.validateUsing(listPostsValidator)

  const posts = await Post.query()
    .if(search, query => query.where('title', 'like', `%${search}%`))
    .paginate(page, limit)

  return {
    posts: await serialize(PostTransformer.transform(posts.all())),
    meta: {
      currentPage: posts.currentPage,
      lastPage: posts.lastPage,
      nextPage: posts.hasNextPage ? posts.currentPage + 1 : null
    }
  }
}
```

## Cache Invalidation

Four methods with different granularity:

### `queryKey()` - Exact Match

Invalidate a specific query with its parameters:

```ts
queryClient.invalidateQueries({
  queryKey: tuyau.posts.show.queryKey({ params: { id: '123' } }),
})
```

### `pathKey()` - Base Path

Invalidate all queries for a specific endpoint (without parameters):

```ts
queryClient.invalidateQueries({
  queryKey: tuyau.posts.index.pathKey(),
})
```

### `pathFilter()` - Subtree Matching

Invalidate all queries starting with a path:

```ts
// Invalidates posts.index, posts.show, posts.search, etc.
queryClient.invalidateQueries(tuyau.posts.pathFilter())
```

### `queryFilter()` - Custom Predicate

Fine-grained control with custom logic:

```ts
const filter = tuyau.posts.pathFilter({
  predicate: (query) => {
    const data = query.state.data
    return data?.post?.status === 'active'
  },
})

queryClient.invalidateQueries(filter)
```

## Common Patterns

### Mutation with Specific Invalidation

```tsx
const updatePost = useMutation(
  tuyau.posts.update.mutationOptions({
    onSuccess: (data, variables) => {
      // Invalidate the specific post that was updated
      queryClient.invalidateQueries({
        queryKey: tuyau.posts.show.queryKey({ params: { id: variables.params.id } }),
      })
      // Also invalidate the list
      queryClient.invalidateQueries({ queryKey: tuyau.posts.index.pathKey() })
    },
  })
)
```

### Delete with Broad Invalidation

```tsx
const deletePost = useMutation(
  tuyau.posts.delete.mutationOptions({
    onSuccess: () => {
      // Invalidate all post-related queries
      queryClient.invalidateQueries(tuyau.posts.pathFilter())
    },
  })
)
```

## Quick Reference

| Task                   | Code                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| Basic query            | `useQuery(tuyau.posts.index.queryOptions())`                         |
| Query with params      | `tuyau.posts.show.queryOptions({ params: { id: '1' } })`             |
| Query with options     | `tuyau.posts.index.queryOptions({}, { staleTime: 5000 })`            |
| Basic mutation         | `useMutation(tuyau.posts.store.mutationOptions())`                   |
| Mutation with handlers | `mutationOptions({ onSuccess: () => {...} })`                        |
| Infinite query         | `useInfiniteQuery(tuyau.posts.list.infiniteQueryOptions(...))`       |
| Exact invalidation     | `queryClient.invalidateQueries({ queryKey: tuyau.x.queryKey(...) })` |
| Path invalidation      | `queryClient.invalidateQueries({ queryKey: tuyau.x.pathKey() })`     |
| Subtree invalidation   | `queryClient.invalidateQueries(tuyau.x.pathFilter())`                |
