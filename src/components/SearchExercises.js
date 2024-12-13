import React, { useEffect, useState, useCallback } from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import { exerciseOptions, fetchData } from "../utils/fetchData"
import HorizontalScrollbar from "./HorizontalScrollbar"

// Theme and style configurations
const theme = {
  primary: "#1E88E5", // Vibrant blue
  secondary: "#FF6B00", // Vibrant orange
  hover: "#1565C0", // Darker blue
  hoverSecondary: "#F65100", // Darker orange
  gradient: "linear-gradient(135deg, #1E88E5 0%, #FF6B00 100%)",
  lightGradient:
    "linear-gradient(135deg, rgba(30,136,229,0.1) 0%, rgba(255,107,0,0.1) 100%)",
}

// Reusable styles
const styles = {
  searchContainer: {
    width: { lg: "800px", md: "600px", sm: "450px", xs: "320px" },
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    borderRadius: "100px",
    backgroundColor: "#fff",
    "&:hover": {
      boxShadow: "0 6px 25px rgba(0,0,0,0.12)",
    },
    transition: "all 0.3s",
  },
  searchField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: "65px",
      borderRadius: "100px",
      padding: "0 30px",
      paddingRight: "180px",
      "& fieldset": {
        border: "2px solid #e0e0e0",
        transition: "border-color 0.3s",
      },
      "&:hover fieldset": {
        borderColor: theme.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.primary,
        borderWidth: "2px",
      },
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "16px",
      fontWeight: "500",
      color: theme.primary,
      "&::placeholder": {
        color: "rgba(0,0,0,0.5)",
        opacity: 1,
      },
    },
  },
  searchButton: {
    position: "absolute",
    right: "6px",
    top: "6px",
    height: "53px",
    padding: "0 40px",
    background: theme.gradient,
    borderRadius: "100px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    textTransform: "none",
    transition: "all 0.3s",
    "&:hover": {
      background: theme.gradient,
      opacity: 0.9,
      transform: "translateY(-1px)",
      boxShadow: "0 4px 15px rgba(255,107,0,0.4)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  gradientText: {
    background: theme.gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
    letterSpacing: "-1px",
    textShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
}

/**
 * SearchExercises Component
 *
 * A smart search interface for exercises with the following features:
 * 1. Intelligent search that detects body part queries
 * 2. Multi-word search across exercise properties
 * 3. Dynamic endpoint selection based on search type
 * 4. Body part filter shortcuts
 * 5. Error handling with fallbacks
 *
 * @param {Object} props
 * @param {Function} props.setExercises - Callback to update exercise results
 * @param {string} props.bodyPart - Currently selected body part filter
 * @param {Function} props.setBodyPart - Callback to update body part filter
 */
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("")
  const [bodyParts, setBodyParts] = useState(["all"]) // Initialize with 'all'

  /**
   * Fetches the list of available body parts from the API
   * Includes error handling and fallback
   */
  const fetchBodyParts = useCallback(async () => {
    try {
      const data = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      )
      const bodyPartsArray = Array.isArray(data) ? data : []
      setBodyParts(["all", ...bodyPartsArray])
    } catch (error) {
      // Fallback to basic body parts if API fails
      setBodyParts([
        "all",
        "back",
        "cardio",
        "chest",
        "lower arms",
        "lower legs",
        "neck",
        "shoulders",
        "upper arms",
        "upper legs",
        "waist",
      ])
    }
  }, [])

  // Initialize body parts on mount
  useEffect(() => {
    fetchBodyParts()
  }, [fetchBodyParts])

  /**
   * Performs exercise search with the following strategy:
   * 1. First checks if search term matches a body part
   * 2. If yes, fetches exercises for that body part
   * 3. If no, performs a general search across all exercises
   * 4. Supports multi-word search across different properties
   */
  const handleSearch = async () => {
    const searchTerm = search.trim().toLowerCase()
    if (!searchTerm) return

    try {
      // Check for body part match
      const matchingBodyPart = bodyParts.find(
        (part) =>
          part.toLowerCase().includes(searchTerm) ||
          searchTerm.includes(part.toLowerCase())
      )

      let exercisesData
      if (matchingBodyPart) {
        // Fetch exercises for matching body part
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${matchingBodyPart}`,
          exerciseOptions
        )
        setBodyPart(matchingBodyPart)
      } else {
        // Perform general search
        const allExercises = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        )

        // Multi-term search across all properties
        const searchTerms = searchTerm.split(/\s+/)
        exercisesData = allExercises.filter((item) => {
          const searchableText = [
            item.name,
            item.target,
            item.equipment,
            item.bodyPart,
          ]
            .join(" ")
            .toLowerCase()

          return searchTerms.every((term) => searchableText.includes(term))
        })
      }

      // Update UI
      window.scrollTo({ top: 1800, behavior: "smooth" })
      setSearch("")
      setExercises(exercisesData)
    } catch (error) {
      setExercises([])
      // Could add a toast notification here for error feedback
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      {/* Title */}
      <Typography
        fontWeight={800}
        sx={{
          fontSize: { lg: "50px", xs: "35px" },
          mb: "49px",
          ...styles.gradientText,
        }}
      >
        Discover Your Perfect <br /> Workout
      </Typography>

      {/* Search Box */}
      <Box position="relative" mb="72px" sx={styles.searchContainer}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search Exercises..."
          type="text"
          sx={styles.searchField}
        />
        <Button
          className="search-btn"
          onClick={handleSearch}
          sx={styles.searchButton}
        >
          <SearchIcon sx={{ mr: 1 }} />
          Search
        </Button>
      </Box>

      {/* Body Part Filters */}
      <Box sx={{ width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </Box>
    </Stack>
  )
}

export default SearchExercises
