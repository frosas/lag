import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import type { IndexHtmlTransformContext } from "vite"
import { defineConfig } from "vitest/config"
import { AppData } from "./src/build/app-data"
import { render as renderOfflineSupport } from "./src/build/offline-support"

const rootDir = fileURLToPath(new URL(".", import.meta.url))
const SERVICE_WORKER_CHUNK_NAME = "service-worker"
const PING_WORKER_CHUNK_NAME = "ping-worker"

const buildDate = () => new Date().toUTCString()

const resolveWorkerUrl = (
  ctx: IndexHtmlTransformContext | undefined,
  chunkName: string,
  devPath: string,
) => {
  if (!ctx?.bundle) return devPath
  const chunk = Object.values(ctx.bundle).find(
    (candidate) => candidate.type === "chunk" && candidate.name === chunkName,
  )
  if (!chunk) throw new Error(`Could not find chunk ${chunkName}`)
  return `/${chunk.fileName}`
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "inject-html-data",
      transformIndexHtml(html, ctx) {
        const serviceWorkerUrl = resolveWorkerUrl(
          ctx,
          SERVICE_WORKER_CHUNK_NAME,
          "/src/browser/offline-support/service-worker/index.ts",
        )
        const pingWorkerUrl = resolveWorkerUrl(
          ctx,
          PING_WORKER_CHUNK_NAME,
          "/src/browser/pings/worker.ts",
        )
        const appData: AppData = { serviceWorkerUrl, pingWorkerUrl }
        return html
          .replace("__OFFLINE_SUPPORT__", renderOfflineSupport())
          .replace("__BUILD_DATE__", buildDate())
          .replace("__APP_DATA_PLACEHOLDER__", JSON.stringify(appData))
      },
    },
  ],
  server: {
    headers: {
      "Service-Worker-Allowed": "/",
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  publicDir: "static",
  build: {
    outDir: "dist/browser",
    assetsDir: "scripts",
    rollupOptions: {
      input: {
        main: path.resolve(rootDir, "index.html"),
        [SERVICE_WORKER_CHUNK_NAME]: path.resolve(
          rootDir,
          "src/browser/offline-support/service-worker/index.ts",
        ),
        [PING_WORKER_CHUNK_NAME]: path.resolve(
          rootDir,
          "src/browser/pings/worker.ts",
        ),
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === SERVICE_WORKER_CHUNK_NAME
            ? "scripts/service-worker.js"
            : "scripts/[name].[hash].js",
        chunkFileNames: "scripts/[name].[hash].js",
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css")
            ? "styles/[name].[hash][extname]"
            : "assets/[name].[hash][extname]",
      },
    },
  },
})
