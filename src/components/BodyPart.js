import React from "react"
import { Stack, Typography } from "@mui/material"
import Icon from "../assets/icons/gym.png"

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
 * BodyPart Component
 *
 * Renders a clickable card for each body part category with:
 * 1. Visual indicator for selected state (border)
 * 2. Consistent styling for all body part options
 * 3. Auto-scroll behavior when selected
 */
const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  return (
    <Stack
      type="button"
      alignItems={"center"}
      justifyContent={"center"}
      className="bodyPart-card"
      sx={{
        background: "white",
        borderRadius: "20px",
        width: "270px",
        height: "280px",
        cursor: "pointer",
        gap: "47px",
        border: "2px solid #e0e0e0",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: bodyPart === item ? theme.gradient : "transparent",
          transition: "all 0.3s",
        },
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderColor: "transparent",
          background: theme.lightGradient,
          "&::before": {
            height: "4px",
            background: theme.gradient,
          },
        },
      }}
      onClick={() => {
        setBodyPart(item)
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" })
      }}
    >
      <img
        src={Icon}
        alt="dumbbell"
        style={{
          width: "80px",
          height: "80px",
          filter:
            bodyPart === item
              ? "brightness(1) drop-shadow(0 2px 5px rgba(30,136,229,0.5))"
              : "brightness(1)",
          transition: "all 0.3s",
        }}
      />
      <Typography
        fontSize={"24px"}
        fontWeight={"bold"}
        color={theme.primary}
        textTransform={"capitalize"}
        sx={{
          transition: "all 0.3s",
          background: bodyPart === item ? theme.gradient : "none",
          WebkitBackgroundClip: bodyPart === item ? "text" : "none",
          WebkitTextFillColor: bodyPart === item ? "transparent" : "inherit",
        }}
      >
        {item}
      </Typography>
    </Stack>
  )
}

export default BodyPart
