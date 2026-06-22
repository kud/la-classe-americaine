"use client"

import { useEffect } from "react"

const ConsoleEasterEgg = () => {
  useEffect(() => {
    console.log(
      "%cAttention ! Ce flim n'est pas un flim sur le cyclimse.",
      "color: #fbbf24; font-size: 14px; font-weight: bold;",
    )
    console.log(
      "%cMerci de votre compréhension. — Je dis ça, je dis rien.",
      "color: #9ca3af; font-style: italic;",
    )
  }, [])

  return null
}

export default ConsoleEasterEgg
