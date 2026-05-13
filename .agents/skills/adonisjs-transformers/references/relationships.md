# Working with Relationships

Composing transformers, conditional loading, and depth control.

## Basic Relationship Inclusion

Each entity should have its own transformer. Compose them for relationships:

```ts
// app/transformers/user_transformer.ts
import { BaseTransformer } from '@adonisjs/core/transformers'
import type User from '#models/user'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, ['id', 'fullName', 'email'])
  }
}
```

```ts
// app/transformers/post_transformer.ts
import { BaseTransformer } from '@adonisjs/core/transformers'
import type Post from '#models/post'
import UserTransformer from '#transformers/user_transformer'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'content']),
      author: UserTransformer.transform(this.resource.author),
    }
  }
}
```

**CRITICAL**: Must eager-load relationships before transforming:

```ts
// Controller - MUST preload
async show({ serialize, params }: HttpContext) {
  const post = await Post.query()
    .where('id', params.id)
    .preload('author')  // Required!
    .firstOrFail()

  return serialize(PostTransformer.transform(post))
}
```

## Conditional Relationships with `this.whenLoaded()`

Use when relationship might or might not be loaded:

```ts
export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title']),
      author: UserTransformer.transform(this.whenLoaded(this.resource.author)),
    }
  }
}
```

If relationship not loaded, field is omitted from output (no error).

Alternative with ternary:

```ts
author: this.resource.author ? UserTransformer.transform(this.resource.author) : undefined
```

## Error Prevention

If you see: `"Cannot transform undefined values. Use this.whenLoaded to guard against undefined values"`

**Cause**: Relationship not eager-loaded

**Fixes**:

1. Add `.preload('relationName')` in controller query
2. Guard with `this.whenLoaded()` in transformer

## Controlling Relationship Depth

Default: 1 level deep. Control with `.depth()`:

```ts
export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'fullName', 'email']),
      posts: PostTransformer.transform(this.resource.posts).depth(2), // Now serializes user -> posts -> comments
    }
  }
}
```

**How depth works**:

- Depth set at top level controls entire relationship tree
- With `.depth(2)`, nested relationships within posts (e.g., comments) are included
- Parent transformer depth setting overrides child transformer settings
- Depth cascades down through the entire tree

## Multiple Relationships

```ts
export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'content']),
      author: UserTransformer.transform(this.whenLoaded(this.resource.author)),
      comments: CommentTransformer.transform(this.whenLoaded(this.resource.comments)),
      tags: TagTransformer.transform(this.whenLoaded(this.resource.tags)),
    }
  }
}
```

Controller with multiple preloads:

```ts
async show({ serialize, params }: HttpContext) {
  const post = await Post.query()
    .where('id', params.id)
    .preload('author')
    .preload('comments', (query) => query.preload('user'))
    .preload('tags')
    .firstOrFail()

  return serialize(PostTransformer.transform(post))
}
```

## Relationships as Top-Level Only

Relationships can only appear as top-level properties in transformer output. You compose transformers by calling their `transform()` method with the related model instance.
