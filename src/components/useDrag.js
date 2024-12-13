import { useState, useCallback, useEffect } from "react"

export default function useDrag() {
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(false)
      document.body.style.cursor = "default"
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const dragStart = useCallback((ev) => {
    setStartX(ev.clientX)
    setDragging(true)
    document.body.style.cursor = "grabbing"
  }, [])

  const dragStop = useCallback(() => {
    setDragging(false)
    document.body.style.cursor = "default"
  }, [])

  const dragMove = useCallback(
    (ev, cb) => {
      if (dragging && ev.clientX) {
        const diff = ev.clientX - startX
        setStartX(ev.clientX)
        cb?.(diff)
      }
    },
    [dragging, startX]
  )

  return {
    dragStart,
    dragStop,
    dragMove,
    dragging,
  }
}
