import React from "react"
import { Box, Typography, Button } from "@mui/material"
import HeroBannerImage from "../assets/images/banner.png"

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

const HeroBanner = () => {
  const scrollToExercises = () => {
    const exercisesSection = document.getElementById("exercises")
    exercisesSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Box
      sx={{
        mt: { lg: "212px", xs: "70px" },
        ml: { sm: "50px" },
      }}
      position="relative"
      p="20px"
    >
      <Typography color="#160E25" fontWeight="600" fontSize="26px">
        Move Fit
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "40px", xs: "36px" } }}
        mb="23px"
        mt="30px"
      >
        Get Moving, Get Fit <br />
        with MoveFit!
      </Typography>
      <Typography fontSize={"22px"} lineHeight={"35px"} mb={3}>
        Ignite Your Workout Journey!
      </Typography>
      <Button
        variant="contained"
        onClick={scrollToExercises}
        sx={{
          background: theme.gradient,
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#fff",
          textTransform: "none",
          borderRadius: "100px",
          transition: "all 0.3s",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          "&:hover": {
            background: theme.gradient,
            opacity: 0.9,
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        }}
      >
        Explore Exercises
      </Button>
      <Typography
        fontWeight={600}
        sx={{
          opacity: 0.1,
          display: { lg: "block", xs: "none" },
          background: theme.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }}
        fontSize="200px"
      >
        Move Fit
      </Typography>
      <img src={HeroBannerImage} alt="banner" className="hero-banner-img" />
    </Box>
  )
}

export default HeroBanner
