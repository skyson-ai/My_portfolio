"use client"

import type React from "react"

// Adapted from: https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/hooks/use-toast.ts
import { useState, useEffect, useCallback } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type Toast = Omit<ToasterToast, "id">

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  useEffect(() => {
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))
      }, TOAST_REMOVE_DELAY)

      return { id: toast.id, timer }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer.timer))
    }
  }, [toasts])

  const toast = useCallback(({ ...props }: Toast) => {
    const id = genId()

    setToasts((prevToasts) => {
      const newToasts = [
        {
          ...props,
          id,
        },
        ...prevToasts,
      ]

      return newToasts.slice(0, TOAST_LIMIT)
    })

    return {
      id,
      dismiss: () => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id)),
      update: (props: Toast) =>
        setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, ...props } : t))),
    }
  }, [])

  return {
    toast,
    toasts,
    dismiss: (toastId?: string) => {
      if (toastId) {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toastId))
      } else {
        setToasts([])
      }
    },
  }
}
