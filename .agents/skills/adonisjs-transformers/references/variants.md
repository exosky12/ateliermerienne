# Variants and Dependency Injection

Multiple output shapes and injecting HttpContext.

## Defining Variants

Variants are additional methods alongside `toObject()`. Convention: `for<Purpose>`.

```ts
import type Post from '#models/post'
import UserTransformer from '#transformers/user_transformer'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PostTransformer extends BaseTransformer<Post> {
  // Default variant - used for listing
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'createdAt']),
      author: UserTransformer.transform(this.resource.author),
    }
  }

  // Detailed variant - can be async
  async forDetailedView() {
    return {
      ...this.toObject(),
      content: await markdownToHtml(this.resource.content),
    }
  }

  // Minimal variant for dropdowns
  forDropdown() {
    return this.pick(this.resource, ['id', 'title'])
  }
}
```

**Tips**:

- Reuse default via `this.toObject()` and spread
- Variant methods can be async
- Keep variants focused on specific use cases

## Using Variants in Controllers

Call `.useVariant()` with variant method name:

```ts
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
import PostTransformer from '#transformers/post_transformer'

export default class PostsController {
  // List - uses default toObject()
  async index({ serialize }: HttpContext) {
    const posts = await Post.query().preload('author')
    return serialize(PostTransformer.transform(posts))
  }

  // Show - uses detailed variant
  async show({ serialize, params }: HttpContext) {
    const post = await Post.query().where('id', params.id).preload('author').firstOrFail()

    return serialize(PostTransformer.transform(post).useVariant('forDetailedView'))
  }
}
```

## Variant Types in Frontend

Access variant types via `Data.<Resource>.Variants['<variantName>']`:

```ts
import { Data } from '~/generated/data'

type Post = Data.Post // Default toObject()
type DetailedPost = Data.Post.Variants['forDetailedView']
type DropdownPost = Data.Post.Variants['forDropdown']
```

## Dependency Injection with `@inject()`

Inject HttpContext for auth checks, request data, etc:

```ts
import type Post from '#models/post'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return this.pick(this.resource, ['id', 'title'])
  }

  @inject()
  async forDetailedView({ auth }: HttpContext) {
    return {
      ...this.toObject(),
      content: await markdownToHtml(this.resource.content),
      can: {
        view: true,
        edit: auth.user?.id === this.resource.userId,
        delete: auth.user?.id === this.resource.userId,
      },
    }
  }
}
```

**How injection works**:

- `@inject()` decorator tells AdonisJS to resolve dependencies
- Dependencies resolve during `serialize()`, not during `transform()`
- Can destructure HttpContext: `{ auth, request, params }`

## Authorization Pattern

Common pattern for including permissions:

```ts
@inject()
async forDetailedView({ auth }: HttpContext) {
  const isOwner = auth.user?.id === this.resource.userId
  const isAdmin = auth.user?.role === 'admin'

  return {
    ...this.toObject(),
    content: this.resource.content,
    can: {
      edit: isOwner || isAdmin,
      delete: isOwner || isAdmin,
      publish: isAdmin
    }
  }
}
```

## Multiple Variants Example

```ts
export default class PostTransformer extends BaseTransformer<Post> {
  // List view - minimal
  toObject() {
    return this.pick(this.resource, ['id', 'title', 'createdAt'])
  }

  // Detail view - full content
  async forDetailedView() {
    return {
      ...this.toObject(),
      content: this.resource.content,
      author: UserTransformer.transform(this.resource.author),
    }
  }

  // Dropdown - ID and title only
  forDropdown() {
    return this.pick(this.resource, ['id', 'title'])
  }

  // Admin view - with permissions
  @inject()
  forAdminView({ auth }: HttpContext) {
    return {
      ...this.toObject(),
      userId: this.resource.userId,
      can: {
        edit: auth.user?.role === 'admin',
        delete: auth.user?.role === 'admin',
      },
    }
  }
}
```
