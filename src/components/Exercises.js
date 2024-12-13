import React, { useEffect, useState } from "react"
import { Pagination } from "@mui/material"
import { Box, Stack, Typography } from "@mui/material"
import { exerciseOptions, fetchData } from "../utils/fetchData"
import ExerciseCard from "./ExerciseCard"

// Theme colors
const theme = {
  primary: "#1E88E5", // Vibrant blue
  secondary: "#FF6B00", // Vibrant orange
  hover: "#1565C0", // Darker blue
  hoverSecondary: "#F65100", // Darker orange
  gradient: "linear-gradient(135deg, #1E88E5 0%, #FF6B00 100%)",
  lightGradient:
    "linear-gradient(135deg, rgba(30,136,229,0.1) 0%, rgba(255,107,0,0.1) 100%)",
}

// Gradient text style
const gradientTextStyle = {
  background: theme.gradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: 600,
  display: "inline-block",
}

/**
 * Exercises Component
 *
 * Displays a paginated grid of exercise cards with dynamic loading based on body part selection.
 * Handles both filtered views (by body part) and the complete exercise list.
 *
 * @param {Object} props
 * @param {Array} props.exercises - List of exercises to display
 * @param {Function} props.setExercises - Function to update the exercises list
 * @param {string} props.bodyPart - Selected body part filter
 */
const Exercises = ({ exercises, setExercises, bodyPart }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const exercisesPerPage = 9

  // Calculate pagination indices
  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  )

  /**
   * Handles pagination changes and scrolls to the exercise section
   * @param {Event} e - Event object
   * @param {number} value - New page number
   */
  const paginate = (e, value) => {
    setCurrentPage(value)
    window.scrollTo({ top: 1800, behavior: "smooth" })
  }

  /**
   * Fetches exercises based on selected body part.
   * If bodyPart is "all", fetches all exercises.
   * Otherwise, fetches exercises for the specific body part.
   */
  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = []
      if (bodyPart === "all") {
        // Fetch all exercises
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        )
      } else {
        // Fetch exercises for specific body part
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        )
      }
      setExercises(exercisesData)
    }
    fetchExercisesData()
  }, [bodyPart, setExercises]) // Re-fetch when bodyPart changes

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt={"50px"} p={"20px"}>
      <Typography
        variant="h3"
        mb={"46px"}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
          fontWeight: 700,
          ...gradientTextStyle,
          textAlign: "center",
        }}
      >
        Showing Results
      </Typography>
      {/* Exercise cards grid with responsive spacing */}
      <Stack
        direction={"row"}
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      {/* Pagination - only show if more than 9 exercises */}
      <Stack mt={"100px"} alignItems={"center"}>
        {exercises.length > 9 && (
          <Pagination
            color="primary"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme.primary,
                "&.Mui-selected": {
                  background: theme.gradient,
                  color: "white",
                  "&:hover": {
                    background: theme.gradient,
                    opacity: 0.9,
                  },
                },
                "&:hover": {
                  background: theme.lightGradient,
                },
              },
            }}
          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises
