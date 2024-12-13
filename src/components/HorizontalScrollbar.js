import React, { useRef, useState, useEffect, useCallback } from "react"
import { Box, IconButton } from "@mui/material"
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material"

import ExerciseCard from "./ExerciseCard"
import BodyPart from "./BodyPart"

// Theme configuration for consistent styling
const theme = {
  primary: "#1E88E5", // Vibrant blue
  secondary: "#FF6B00", // Vibrant orange
  hover: "#1565C0", // Darker blue
  hoverSecondary: "#F65100", // Darker orange
  gradient: "linear-gradient(135deg, #1E88E5 0%, #FF6B00 100%)",
  lightGradient:
    "linear-gradient(135deg, rgba(30,136,229,0.1) 0%, rgba(255,107,0,0.1) 100%)",
}

// Scroll behavior configuration
const SCROLL_CONFIG = {
  DISTANCE: 350, // Distance to scroll on arrow click (pixels)
  DRAG_THRESHOLD: 5, // Minimum distance to trigger drag (pixels)
  DRAG_TIMEOUT: 150, // Time window to differentiate click from drag (ms)
  RESET_DELAY: 50, // Delay before resetting drag state (ms)
}

/**
 * HorizontalScrollbar Component
 *
 * A reusable horizontal scrolling container with the following features:
 * 1. Mouse drag-to-scroll with intelligent click/drag detection
 * 2. Arrow button navigation for precise scrolling
 * 3. Dynamic button state management (disabled when can't scroll)
 * 4. Touch-friendly with proper event handling
 * 5. Prevents text selection during drag
 *
 * @param {Object} props
 * @param {Array} props.data - Items to display in the scrollbar
 * @param {boolean} props.bodyParts - Flag to determine if rendering body parts
 * @param {Function} props.setBodyPart - Callback to update selected body part
 * @param {string} props.bodyPart - Currently selected body part
 */
const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  // Drag state management
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartScroll, setDragStartScroll] = useState(0)
  const [hasMoved, setHasMoved] = useState(false)
  const [dragStartTime, setDragStartTime] = useState(0)

  // Refs and scroll state
  const scrollContainerRef = useRef(null)
  const dragTimeout = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  /**
   * Updates the scroll buttons' enabled/disabled state based on scroll position
   */
  const checkScrollButtons = useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(
      scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 1
    )
  }, [])

  // Initialize and maintain scroll button states
  useEffect(() => {
    requestAnimationFrame(checkScrollButtons)
  }, [data, checkScrollButtons])

  // Set up scroll and resize event listeners
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollButtons)
      window.addEventListener("resize", checkScrollButtons)
    }

    // Cleanup listeners and timeouts
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollButtons)
      }
      window.removeEventListener("resize", checkScrollButtons)
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current)
      }
    }
  }, [checkScrollButtons])

  /**
   * Initializes drag operation
   * Sets up initial positions and visual feedback
   */
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setHasMoved(false)
    setDragStartX(e.clientX)
    setDragStartTime(Date.now())
    setDragStartScroll(scrollContainerRef.current.scrollLeft)
    scrollContainerRef.current.style.cursor = "grabbing"

    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current)
    }
  }

  /**
   * Handles drag end and determines if interaction was a drag or click
   * Uses timing and movement thresholds for intelligent detection
   */
  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab"
    }

    const dragDuration = Date.now() - dragStartTime
    const wasQuickDrag = dragDuration < SCROLL_CONFIG.DRAG_TIMEOUT

    // Reset drag state based on interaction type
    if (wasQuickDrag) {
      setHasMoved(false)
    } else {
      dragTimeout.current = setTimeout(() => {
        setHasMoved(false)
      }, SCROLL_CONFIG.RESET_DELAY)
    }
  }

  /**
   * Handles the drag operation
   * Updates scroll position and tracks movement
   */
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()

    const dx = e.clientX - dragStartX
    if (Math.abs(dx) > SCROLL_CONFIG.DRAG_THRESHOLD) {
      setHasMoved(true)
    }
    scrollContainerRef.current.scrollLeft = dragStartScroll - dx
  }

  /**
   * Prevents click events if significant drag movement occurred
   */
  const handleClick = (e) => {
    if (hasMoved) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  /**
   * Scroll handlers for arrow buttons
   */
  const scrollPrev = () => {
    scrollContainerRef.current?.scrollBy({
      left: -SCROLL_CONFIG.DISTANCE,
      behavior: "smooth",
    })
  }

  const scrollNext = () => {
    scrollContainerRef.current?.scrollBy({
      left: SCROLL_CONFIG.DISTANCE,
      behavior: "smooth",
    })
  }

  // Common styles for scroll buttons
  const scrollButtonStyles = {
    background: theme.gradient,
    color: "#fff",
    width: "45px",
    height: "45px",
    "&:hover": {
      background: theme.gradient,
      opacity: 0.9,
      transform: "scale(1.1)",
      boxShadow: "0 4px 15px rgba(30,136,229,0.3)",
    },
    "&.Mui-disabled": {
      background: "#e0e0e0",
      opacity: 0.7,
    },
    transition: "all 0.3s",
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scrollable container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            gap: "40px",
            padding: "20px",
            overflowX: "auto",
            cursor: "grab",
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "pan-y pinch-zoom",
            "& img": {
              pointerEvents: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitUserDrag: "none",
              MozUserSelect: "none",
              KhtmlUserSelect: "none",
              msUserSelect: "none",
            },
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          draggable="false"
        >
          {/* Render items */}
          {data.map((item) => (
            <Box
              key={item.id || item}
              sx={{
                flex: "0 0 auto",
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                KhtmlUserSelect: "none",
                msUserSelect: "none",
                WebkitUserDrag: "none",
                transition: isDragging ? "none" : "transform 0.2s",
                "&:hover": {
                  transform: isDragging ? "none" : "scale(1.02)",
                },
                pointerEvents: hasMoved ? "none" : "auto",
              }}
              draggable="false"
            >
              {bodyParts ? (
                <BodyPart
                  item={item}
                  setBodyPart={setBodyPart}
                  bodyPart={bodyPart}
                />
              ) : (
                <ExerciseCard exercise={item} />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
        <IconButton
          onClick={scrollPrev}
          disabled={!canScrollLeft}
          sx={scrollButtonStyles}
        >
          <ArrowBackIos sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          onClick={scrollNext}
          disabled={!canScrollRight}
          sx={scrollButtonStyles}
        >
          <ArrowForwardIos sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default HorizontalScrollbar
