---
name: adonisjs-transformers
description: AdonisJS Transformers for serializing Lucid models and data to JSON with type generation. Use when working with API responses, Inertia props, or data serialization in AdonisJS or when the user mentions "transformers".
---

# AdonisJS Transformers

Serialize Lucid models and rich data types to JSON for HTTP responses with auto-generated TypeScript types.

**Use cases**: Inertia apps, REST APIs, mobile backends - anywhere JSON responses are sent.

**Key benefits**:

- Type-safe responses with auto-generated TypeScript types (`.adonisjs/client/data.d.ts`)
- Explicit field control (security, formatting)
- Frontend/backend type sync
- Composable with relationships
- Multiple output shapes via variants

## Available References

Load based on your current task. **DO NOT read all files at once**.

| Reference                              | Use when                           | Content                                                               |
| -------------------------------------- | ---------------------------------- | --------------------------------------------------------------------- |
| `references/basics.md`                 | Creating transformers, basic usage | Setup, `toObject()`, `this.pick()`, controller usage, generated types |
| `references/relationships.md`          | Including related models           | Composing transformers, `this.whenLoaded()`, `.depth()` control       |
| `references/variants.md`               | Different output shapes            | Defining variants, `useVariant()`, `@inject()` for HttpContext        |
| `references/pagination-custom-data.md` | Paginated responses, extra context | `.paginate()`, constructor params, custom data                        |

## Quick Start

```bash
node ace make:transformer post
# Creates: app/transformers/post_transformer.ts
```

Basic structure:

```ts
import { BaseTransformer } from '@adonisjs/core/transformers'
import type Post from '#models/post'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return this.pick(this.resource, ['id', 'title', 'content', 'createdAt', 'updatedAt'])
  }
}
```

Controller usage:

```ts
import PostTransformer from '#transformers/post_transformer'

export default class PostsController {
  async index({ serialize }: HttpContext) {
    const posts = await Post.all()
    return serialize(PostTransformer.transform(posts))
  }
}
```

Inertia usage (no `serialize()` needed):

```ts
async index({ inertia }: HttpContext) {
  const posts = await Post.all()
  return inertia.render('posts/index', {
    posts: PostTransformer.transform(posts)
  })
}
```

## Quick Reference

| Task             | Code                                        |
| ---------------- | ------------------------------------------- |
| Pick fields      | `this.pick(this.resource, ['id', 'title'])` |
| Access model     | `this.resource`                             |
| Guard relation   | `this.whenLoaded(this.resource.author)`     |
| Transform single | `PostTransformer.transform(post)`           |
| Transform array  | `PostTransformer.transform(posts)`          |
| Paginate         | `PostTransformer.paginate(data, meta)`      |
| Use variant      | `.useVariant('forDetailedView')`            |
| Set depth        | `.depth(2)`                                 |

## Generated Types

Types auto-generate in `.adonisjs/client/data.d.ts` when dev server runs:

```ts
import { Data } from '~/generated/data'

type Post = Data.Post
type DetailedPost = Data.Post.Variants['forDetailedView']
```

## Important Notes

- **NOT DTOs**: Transformers are for output only, not input validation
- **Eager load required**: Relationships must be preloaded before transformation
- **One transformer per entity**: Each model should have its own transformer
- **Depth default**: Relationships serialize 1 level deep by default
