# Transformer Basics

Creating transformers, basic usage patterns, and generated types.

## Create Transformer

```bash
node ace make:transformer post
# Creates: app/transformers/post_transformer.ts
```

Default generated structure:

```ts
import { BaseTransformer } from '@adonisjs/core/transformers'
import Post from '#models/post'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return this.pick(this.resource, ['id'])
  }
}
```

## The `toObject()` Method

Defines the default output shape. `this.resource` accesses the model instance.

```ts
export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return this.pick(this.resource, ['id', 'title', 'content', 'createdAt', 'updatedAt'])
  }
}
```

## The `this.pick()` Helper

Selects specific fields from the model. Only listed fields appear in output.

```ts
// Pick specific fields
this.pick(this.resource, ['id', 'title', 'content'])

// Add computed fields alongside picked fields
return {
  ...this.pick(this.resource, ['id', 'title']),
  excerpt: this.resource.content.substring(0, 100),
  wordCount: this.resource.content.split(' ').length,
}
```

## Controller Usage (API)

Use `serialize()` from HttpContext:

```ts
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
import PostTransformer from '#transformers/post_transformer'

export default class PostsController {
  // Single resource
  async show({ serialize, params }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    return serialize(PostTransformer.transform(post))
  }

  // Collection
  async index({ serialize }: HttpContext) {
    const posts = await Post.all()
    return serialize(PostTransformer.transform(posts))
  }
}
```

## Controller Usage (Inertia)

Pass directly to `inertia.render()` - no `serialize()` needed:

```ts
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
import PostTransformer from '#transformers/post_transformer'

export default class PostsController {
  async index({ inertia }: HttpContext) {
    const posts = await Post.all()
    return inertia.render('posts/index', {
      posts: PostTransformer.transform(posts),
    })
  }

  async show({ inertia, params }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    return inertia.render('posts/show', {
      post: PostTransformer.transform(post),
    })
  }
}
```

## ResourceItem vs ResourceCollection

`PostTransformer.transform()` returns:

- `ResourceItem` for single model
- `ResourceCollection` for array

Serialized output:

- Single item: transformed object directly
- Collection: items wrapped in `data` array

## Generated TypeScript Types

Types auto-generate in `.adonisjs/client/data.d.ts` when dev server runs (`node ace serve --hmr`):

```ts
// .adonisjs/client/data.d.ts
import type { InferData, InferVariants } from '@adonisjs/core/types/transformers'
import type PostTransformer from '#transformers/post_transformer'

export namespace Data {
  export type Post = InferData<PostTransformer>

  export namespace Post {
    export type Variants = InferVariants<PostTransformer>
  }
}
```

Frontend usage:

```ts
import { Data } from '~/generated/data'

type Post = Data.Post
```

## File Locations

| Purpose         | Path                         |
| --------------- | ---------------------------- |
| Transformers    | `app/transformers/`          |
| Import alias    | `#transformers/`             |
| Generated types | `.adonisjs/client/data.d.ts` |

## Naming Conventions

| Item              | Convention               | Example               |
| ----------------- | ------------------------ | --------------------- |
| Transformer class | `<Model>Transformer`     | `PostTransformer`     |
| Transformer file  | `<model>_transformer.ts` | `post_transformer.ts` |
