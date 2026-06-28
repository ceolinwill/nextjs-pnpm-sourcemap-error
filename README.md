# Next pnpm Source Map Reproduction

Minimal reproduction for Next.js logging `failed to read input source map` for
pnpm workspace dependencies whose source map files exist.

## Reproduction

```sh
pnpm install
pnpm build
```

The build succeeds, but Next logs errors like:

```txt
ERROR failed to read input source map: failed to find input source map file "index.js.map" in "node_modules/.pnpm/@ai-sdk+provider-utils@5.0.1_zod@4.4.3/node_modules/@ai-sdk/provider-utils/dist/index.js" file as either "node_modules/.pnpm/@ai-sdk+provider-utils@5.0.1_zod@4.4.3/node_modules/@ai-sdk/provider-utils/dist/index.js.map" or with appended .map
    at crates/swc/src/lib.rs:398

ERROR failed to read input source map: failed to find input source map file "index.js.map" in "node_modules/.pnpm/@workflow+serde@4.1.0/node_modules/@workflow/serde/dist/index.js" file as either "node_modules/.pnpm/@workflow+serde@4.1.0/node_modules/@workflow/serde/dist/index.js.map" or with appended .map
    at crates/swc/src/lib.rs:398
```

## Expected Behavior

Next should not log source-map read errors when the referenced package map files
exist.

## Actual Behavior

The package map files exist in the workspace root pnpm virtual store:

```sh
test -f node_modules/.pnpm/@ai-sdk+provider-utils@5.0.1_zod@4.4.3/node_modules/@ai-sdk/provider-utils/dist/index.js.map
test -f node_modules/.pnpm/@workflow+serde@4.1.0/node_modules/@workflow/serde/dist/index.js.map
```

But the app build runs from `apps/web`, and the error appears to resolve
`node_modules/.pnpm/...` relative to the app directory instead of the workspace
root where pnpm created the virtual store.

## Notes

- A plain Next app importing AI SDK did not reproduce this. The error appears
  when `workflow/next` compiles a workflow that imports AI SDK packages.
- The workflow step imports `ai` and `@ai-sdk/openai`, but it does not call a
  model, so no API key is required.
- Related issues:
  - https://github.com/vercel/next.js/issues/90910
  - https://github.com/vercel/workflow/issues/338

## Environment

- Next.js: `16.2.9`
- React: `19.2.7`
- pnpm: `11.7.0`
- ai: `7.0.4`
- @ai-sdk/openai: `4.0.2`
- workflow: `5.0.0-beta.25`

