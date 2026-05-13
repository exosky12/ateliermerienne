# Action Pattern

Actions are single-purpose classes that encapsulate a specific piece of business logic. They provide a clean, testable way to organize complex operations.

## When to Use Actions

- Complex business logic that doesn't belong in a controller
- Operations involving multiple steps or side effects
- Reusable logic across different entry points (API, CLI, jobs)
- When you want to improve testability

## Naming Convention

Use descriptive names with the `Action` suffix:

- `CreateUserAction`
- `ProcessOrderAction`
- `SendWelcomeEmailAction`
- `ValidateSubscriptionAction`

## Structure

```ts
import { inject } from '@adonisjs/core'

@inject()
export default class CreateUserAction {
  constructor(
    private mailer: MailService,
    private userRepo: UserRepository
  ) {}

  async #createUser(options: { email: string; name: string }) {
    return this.userRepo.create({
      email: options.email,
      name: options.name,
      status: 'pending',
    })
  }

  async #sendWelcomeEmail(user: User) {
    await this.mailer.send(new WelcomeEmail(user))
  }

  async #notifyAdmins(user: User) {
    await this.mailer.send(new NewUserNotification(user))
  }

  async execute(options: { email: string; name: string }) {
    const user = await this.#createUser(options)
    await this.#sendWelcomeEmail(user)
    await this.#notifyAdmins(user)

    return user
  }
}
```

## Key Rules

### 1. Entry Point: `execute()`

Always name the public method `execute()`. Not `invoke()`, `handle()`, or `run()`.

```ts
// Good
async execute() { }

// Bad
async handle() { }
async invoke() { }
async run() { }
```

### 2. High-Level Readability

The `execute()` method should read like plain English. Someone should understand what the action does just by reading it:

```ts
// Good - clear high-level flow
async execute() {
  await this.#validateInput()
  await this.#checkPermissions()
  await this.#performOperation()
  await this.#sendNotifications()
}

// Bad - implementation details in execute()
async execute() {
  if (!this.input.email.includes('@')) {
    throw new ValidationException('Invalid email')
  }
  const user = await User.findBy('id', this.userId)
  if (!user.hasPermission('admin')) {
    throw new ForbiddenException()
  }
  // ... more low-level code
}
```

### 3. Single Responsibility

Each private method should do one thing and be named to describe that thing clearly:

```ts
// Good - clear single responsibilities
async #validateShippingAddress() { }
async #calculateShippingCost() { }
async #applyDiscount() { }

// Bad - vague or multiple responsibilities
async #process() { }
async #handleStuff() { }
async #validateAndCalculate() { }
```

### 4. Stay Pragmatic

If the action is very simple, it's okay for `execute()` to have a few lines of logic directly:

```ts
// Fine for simple actions
async execute(options: { userId: string }) {
  const user = await User.findOrFail(options.userId)
  user.lastLoginAt = DateTime.now()
  await user.save()

  return user
}
```

## Using Actions in Controllers

```ts
import CreateUserAction from '#actions/create_user_action'

@inject()
export default class UsersController {
  constructor(private createUser: CreateUserAction) {}

  async store({ request }: HttpContext) {
    const data = request.only(['email', 'name'])
    const user = await this.createUser.execute(data)

    return { user }
  }
}
```

## File Location

Place actions in `app/actions/`:

```
app/
  actions/
    create_user_action.ts
    process_order_action.ts
    users/
      update_profile_action.ts
      delete_account_action.ts
```

## Testing Actions

Actions are easy to test in isolation:

```ts
test('creates user and sends welcome email', async ({ assert }) => {
  const mailer = new FakeMailService()
  const userRepo = new FakeUserRepository()
  const action = new CreateUserAction(mailer, userRepo)

  const user = await action.execute({
    email: 'john@example.com',
    name: 'John',
  })

  assert.equal(user.email, 'john@example.com')
  assert.isTrue(mailer.wasSent(WelcomeEmail))
})
```
