import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        dir: 'src',
        workspace: [
          {
            extends: true,
            test: {
              dir: 'src/http/controllers',
              name: 'e2e',
              environment: './prisma/vitest-enviroment-prisma/prisma-test-enviroment.ts',
            },
          },
          {
            extends: true,
            test: {
              dir: 'src/services',
              environment: 'node',
              name: 'unit',
            },
          },
        ],
      },
})