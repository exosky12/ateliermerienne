# Pagination and Custom Data

Handling paginated results and passing extra context to transformers.

## Pagination

Use `.paginate()` method with Lucid's pagination metadata:

```ts
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
import PostTransformer from '#transformers/post_transformer'

export default class PostsController {
  async index({ serialize, request }: HttpContext) {
    const page = request.input('page', 1)
    const posts = await Post.query().paginate(page, 20)

    const data = posts.all()
    const metadata = posts.getMeta()

    return serialize(PostTransformer.paginate(data, metadata))
  }
}
```

## Paginated Response Structure

```json
{
  "data": [
    {
      "id": 1,
      "title": "First Post",
      "content": "...",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "meta": {
    "total": 100,
    "perPage": 20,
    "currentPage": 1,
    "lastPage": 5,
    "firstPage": 1,
    "firstPageUrl": "/?page=1",
    "lastPageUrl": "/?page=5",
    "nextPageUrl": "/?page=2",
    "previousPageUrl": null
  }
}
```

## Pagination with Variants

```ts
async index({ serialize, request }: HttpContext) {
  const page = request.input('page', 1)
  const posts = await Post.query()
    .preload('author')
    .paginate(page, 20)

  return serialize(
    PostTransformer
      .paginate(posts.all(), posts.getMeta())
      .useVariant('forListView')
  )
}
```

## Passing Custom Data to Transformers

Pass additional context via constructor parameters:

```ts
import { BaseTransformer } from '@adonisjs/core/transformers'
import type Post from '#models/post'

export default class PostTransformer extends BaseTransformer<Post> {
  constructor(
    resource: Post,
    protected likedPostsIds: number[]
  ) {
    super(resource)
  }

  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'createdAt', 'updatedAt']),
      isLiked: this.likedPostsIds.includes(this.resource.id),
    }
  }
}
```

Controller usage - pass custom data as additional arguments:

```ts
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
import PostTransformer from '#transformers/post_transformer'

export default class PostsController {
  async index({ serialize, auth }: HttpContext) {
    const posts = await Post.all()

    // Get IDs of posts current user has liked
    const likedPosts = await auth.user!.related('likedPosts').query().select('id')

    return serialize(
      PostTransformer.transform(
        posts,
        likedPosts.map(({ id }) => id)
      )
    )
  }
}
```

## Custom Data in Variants

Custom data is available in all variant methods as instance property:

```ts
export default class PostTransformer extends BaseTransformer<Post> {
  constructor(
    resource: Post,
    protected likedPostsIds: number[],
    protected currentUserId: number | null
  ) {
    super(resource)
  }

  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title']),
      isLiked: this.likedPostsIds.includes(this.resource.id),
    }
  }

  forDetailedView() {
    return {
      ...this.toObject(),
      content: this.resource.content,
      isOwner: this.resource.userId === this.currentUserId,
    }
  }
}
```

## Custom Data with Pagination

```ts
async index({ serialize, auth, request }: HttpContext) {
  const page = request.input('page', 1)
  const posts = await Post.query().paginate(page, 20)

  const likedPosts = await auth.user!
    .related('likedPosts')
    .query()
    .select('id')

  const likedIds = likedPosts.map(({ id }) => id)

  return serialize(
    PostTransformer.paginate(
      posts.all(),
      posts.getMeta(),
      likedIds  // Custom data passed as third argument
    )
  )
}
```

## Multiple Custom Data Parameters

```ts
export default class PostTransformer extends BaseTransformer<Post> {
  constructor(
    resource: Post,
    protected options: {
      likedPostsIds: number[]
      bookmarkedPostsIds: number[]
      currentUserId: number | null
    }
  ) {
    super(resource)
  }

  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title']),
      isLiked: this.options.likedPostsIds.includes(this.resource.id),
      isBookmarked: this.options.bookmarkedPostsIds.includes(this.resource.id),
      isOwner: this.resource.userId === this.options.currentUserId,
    }
  }
}
```

Controller:

```ts
return serialize(
  PostTransformer.transform(posts, {
    likedPostsIds: likedIds,
    bookmarkedPostsIds: bookmarkedIds,
    currentUserId: auth.user?.id ?? null,
  })
)
```
