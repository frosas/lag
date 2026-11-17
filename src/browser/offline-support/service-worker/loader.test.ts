import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import ServiceWorkerLoader from "./loader"

class FakeServiceWorkerContainer extends EventTarget {
  controller: object | null = null

  register() {
    return Promise.resolve({})
  }

  // Like the service worker calling clients.claim() once it activates
  claimPage() {
    this.controller = {}
    this.dispatchEvent(new Event("controllerchange"))
  }
}

describe("ServiceWorkerLoader", () => {
  let serviceWorkerContainer: FakeServiceWorkerContainer

  beforeEach(() => {
    serviceWorkerContainer = new FakeServiceWorkerContainer()
    vi.stubGlobal("navigator", { serviceWorker: serviceWorkerContainer })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("does not ask for a reload when the service worker already controls the page", async () => {
    const loader = new ServiceWorkerLoader({ url: "/service-worker.js" })
    await vi.waitFor(() => {
      expect(loader.statusMessage).toBe("reload required")
    })

    serviceWorkerContainer.claimPage()

    expect(loader.statusCode).toBe("READY")
  })
})
