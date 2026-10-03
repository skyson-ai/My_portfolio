"use client"

import { useEffect, useRef } from "react"

const INTERACTIVE = "a, button, input, textarea, select, .projects__card, .achievements__content"

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = ref.current
    if (!cursor) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    cursor.style.display = "block"

    let frame = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const render = () => {
      frame = 0
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const onMove = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = requestAnimationFrame(render)
    }

    const isInteractive = (target: EventTarget | null) =>
      (target as Element | null)?.closest(INTERACTIVE) != null

    const onOver = (event: MouseEvent) => {
      cursor.classList.toggle("hide-cursor", isInteractive(event.target))
    }

    const onLeave = () => cursor.classList.add("hide-cursor")

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseleave", onLeave)
    render()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return <div ref={ref} className="cursor" style={{ display: "none" }} aria-hidden="true" />
}