// src/hooks/useTransitionNavigate.js
import { useNavigate } from "react-router-dom"
import { usePageTransition } from "@/context/PageTransitionContext"

export function useTransitionNavigate() {
  const navigate = useNavigate()
  const { show } = usePageTransition()

  return (to, title) => {
    // 1. tampilkan animasi dulu
    show([title])

    // 2. tunggu animasi masuk selesai
    setTimeout(() => {
      navigate(to)
    }, 900) // > duration enter (0.8s)
  }
}
