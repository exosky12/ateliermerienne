---
trigger: always_on
---

# Git Commit Conventions

This document defines the commit conventions to use across all projects.  
Commits must be **precise, explicit, and descriptive**. A commit message should clearly explain what changed and why, without ambiguity.

---

## General Format

<type>: <short imperative description>

markdown
Copy code

**Optional body:** additional explanations

### Rules

- The description must be **short, precise, and written in the imperative form**
- One commit = one logical change
- Do **not** capitalize the first letter
- Do **not** add a period at the end
- Avoid vague messages — be specific about what was modified

---

## Allowed Types and Usage

### **feat**

Use only when introducing a **new user-facing feature or behavior**.

**Examples**
feat: add profile manager
feat: implement dark mode toggle

yaml
Copy code

---

### **fix**

Use only when **fixing a bug or incorrect behavior**.

**Examples**
fix: fix crash on login when token is invalid
fix: correct mobile layout overflow

yaml
Copy code

---

### **chore**

Use for **minor maintenance tasks** that do not affect behavior, features, or global configuration.

**Typical use cases**

- deleting unused files
- small renaming with no structural impact
- internal maintenance

**Examples**
chore: remove unused helper files
chore: rename utility functions

yaml
Copy code

---

### **refactor**

Use when **restructuring or simplifying code** without changing behavior.

**Examples**
refactor: simplify validation logic
refactor: restructure api client module

yaml
Copy code

---

### **perf**

Use only for **performance improvements**.

**Examples**
perf: reduce database query time
perf: optimize image loading strategy

yaml
Copy code

---

### **docs**

Use for **documentation only**.

**Examples**
docs: update api usage guide
docs: add setup instructions to readme

yaml
Copy code

---

### **style**

Use only for **formatting or stylistic changes** with no impact on behavior.

**Examples**
style: standardize spacing and indentation
style: apply prettier formatting

yaml
Copy code

---

### **test**

Use when **adding, updating, or fixing tests**.

**Examples**
test: add unit tests for user service
test: update dashboard snapshot tests

yaml
Copy code

---

### **ci**

Use for **CI/CD, automation, or tooling pipelines**.

**Examples**
ci: adjust github actions workflow
ci: add pre-commit lint hook

markdown
Copy code

---

### **config**

Use for **project setup, configuration, or global system changes**.

This includes:

- initial project setup or reconfiguration
- CSS architecture and global styles
- theme variables (fonts, colors, spacing)
- global layout rules
- dependency or tooling configuration
- structural cleanup affecting the project setup

**Do NOT use `feat` or `chore` for these changes.**

**Examples**
config: update css variables for fonts and colors
config: restructure global styles and theme setup
config: initialize project structure
config: cleanup and reorganize css files

yaml
Copy code

---

## Optional Commit Body

Include a body **only when it adds clarity**.

Use it to:

- explain **why** the change was made (not how)
- give context when the title is not sufficient
- mention important consequences or side effects

**Example**
feat: add avatar synchronization

This allows users to update their profile picture across all connected platforms.
Changes are propagated instantly without manual refresh.

yaml
Copy code

---

This convention exists to ensure a **clean, readable, and meaningful git history**.  
Every commit should be understandable on its own.
