import React from "react"
import { createRoot } from "react-dom/client"
import Pings from "../pings"
import User from "../user"
import ChartComponent from "./components"

interface ConstructorParams {
  user: User
  pings: Pings
  element: Element
}

export default class Chart {
  constructor({ user, pings, element }: ConstructorParams) {
    createRoot(element).render(<ChartComponent user={user} pings={pings} />)
  }
}
