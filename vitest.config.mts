import { defineConfig } from 'vitest/config'
import * as path from "node:path";

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            exclude: ["specs/**/*", "**/index.ts", "dist/**/*", "**/*.mts",  "**/*.mjs"]
        },
        globals: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})