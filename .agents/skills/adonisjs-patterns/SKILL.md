---
name: adonisjs-patterns
description: Patterns architecturaux AdonisJS (Actions, Services, etc.). Use when writing business logic, organizing code, or implementing features in AdonisJS or when the user mentions "action pattern", "actions", or "services".
---

# AdonisJS Patterns

Architectural patterns for structuring AdonisJS applications.

**Use cases**: Business logic organization, feature implementation, code structure decisions.

## Available References

Load based on your current task. **DO NOT read all files at once**.

| Reference               | Use when                                          | Content                                            |
| ----------------------- | ------------------------------------------------- | -------------------------------------------------- |
| `references/actions.md` | Writing business logic, single-purpose operations | Action pattern, `execute()`, single responsibility |

## Quick Reference

### Action Pattern

Actions are single-purpose classes for business logic (e.g., `CreateUserAction`, `ProcessOrderAction`).

**Key rules:**

- Entry point: always `execute()` (not `invoke()`, `handle()`, `run()`)
- `execute()` should read like plain English with high-level method calls
- Each private method does one thing with clear naming

```ts
class ProcessOrderAction {
  async execute() {
    await this.#ensureProductAvailability()
    await this.#validateShippingAddress()
    await this.#processPayment()
    await this.#sendConfirmationEmail()
    await this.#updateInventory()
  }
}
```

Stay pragmatic - if the action is very simple, `execute()` can have a few lines of logic directly.
