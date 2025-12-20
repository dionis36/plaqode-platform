# TypeScript Config Package

Shared TypeScript configurations for the Plaqode Platform monorepo.

## Available Configs

- **base.json** - Base configuration for all projects
- **nextjs.json** - Next.js specific configuration
- **node.json** - Node.js backend configuration

## Usage

In your app's `tsconfig.json`:

```json
{
  "extends": "@plaqode-platform/typescript-config/nextjs.json",
  "compilerOptions": {
    // Your app-specific overrides
  }
}
```
