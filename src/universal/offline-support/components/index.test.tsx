// @vitest-environment happy-dom
import EventEmitter from "eventemitter3"
import React from "react"
import { Root, createRoot } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import OfflineSupport from "."

const { act, useLayoutEffect } = React

class FakeServiceWorkerLoader {
  readonly events = new EventEmitter()
  statusCode = "INITIALIZING"
  statusMessage = "initializing..."

  setStatus(code: string, message: string) {
    this.statusCode = code
    this.statusMessage = message
    this.events.emit("change")
  }
}

describe("OfflineSupport", () => {
  let container: HTMLElement
  let root: Root

  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true)
    container = document.createElement("div")
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })
    vi.unstubAllGlobals()
  })

  it("shows the current status once it listens for changes", () => {
    const serviceWorkerLoader = new FakeServiceWorkerLoader()
    // Layout effects run after OfflineSupport renders but before its passive
    // effects, so the status changes before OfflineSupport can listen for it.
    const ChangeStatus = () => {
      useLayoutEffect(() => {
        serviceWorkerLoader.setStatus("READY", "ready")
      }, [])
      return null
    }

    act(() => {
      root.render(
        <>
          <OfflineSupport serviceWorkerLoader={serviceWorkerLoader} />
          <ChangeStatus />
        </>,
      )
    })

    expect(container.textContent).toBe("Offline support: 🟢 (ready)")
  })
})
