{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
      "isolatedModules": false,
      "baseUrl": ".",
      "paths": {
        "@/*": ["./*"],
      },
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"],
  }