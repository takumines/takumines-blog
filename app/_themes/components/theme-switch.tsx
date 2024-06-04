"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { RiMoonClearFill, RiSunFill } from "react-icons/ri"

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  if (resolvedTheme === "dark") {
    return (
      <button onClick={() => setTheme("light")}>
        <RiMoonClearFill color="#fde047" size={30} />
      </button>
    )
  }

  if (resolvedTheme === "light") {
    return (
      <button onClick={() => setTheme("dark")}>
        <RiSunFill color="#d97706" size={30} />
      </button>
    )
  }
}
