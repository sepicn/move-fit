import React from "react"
import { Link } from "react-router-dom"
import { Button, Stack, Typography } from "@mui/material"

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

/**
 * ExerciseCard Component
 *
 * A card component that displays exercise information with:
 * - Exercise GIF demonstration
 * - Body part and target muscle badges
 * - Exercise name
 * The card is clickable and navigates to detailed exercise information.
 */
const ExerciseCard = ({ exercise }) => (
  <Link
    className="exercise-card"
    to={`/exercise/${exercise.id}`}
    style={{
      textDecoration: "none",
      width: "400px",
      height: "445px",
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      transition: "all 0.3s",
      display: "block",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    }}
    sx={{
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        "& img": {
          transform: "scale(1.05)",
        },
      },
    }}
  >
    <img
      src={exercise.gifUrl}
      alt={exercise.name}
      loading="lazy"
      style={{
        width: "100%",
        height: "326px",
        objectFit: "cover",
        transition: "transform 0.3s",
      }}
    />

    <Stack direction="row" sx={{ mt: "20px", px: "20px", gap: "12px" }}>
      <Button
        sx={{
          background: theme.gradient,
          fontSize: "14px",
          borderRadius: "20px",
          textTransform: "capitalize",
          color: "#fff",
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        {exercise.bodyPart}
      </Button>
      <Button
        sx={{
          background: theme.lightGradient,
          fontSize: "14px",
          borderRadius: "20px",
          textTransform: "capitalize",
          color: theme.primary,
          border: `1px solid ${theme.primary}`,
          "&:hover": {
            background: theme.lightGradient,
            opacity: 0.9,
          },
        }}
      >
        {exercise.target}
      </Button>
    </Stack>

    <Typography
      ml="20px"
      mt="12px"
      pb="10px"
      textTransform="capitalize"
      sx={{
        fontSize: { lg: "22px", xs: "18px" },
        color: theme.primary,
        fontWeight: "bold",
      }}
    >
      {exercise.name}
    </Typography>
  </Link>
)

export default ExerciseCard
