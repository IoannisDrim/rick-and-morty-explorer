import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["src/**/*.{ts,tsx}", "!src/graphql/codegen/**"],
  generates: {
    "src/graphql/codegen/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
    "src/graphql/codegen/schema.ts": {
      plugins: ["typescript"],
    },
  },
};

export default config;
