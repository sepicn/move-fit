import React from "react"
import { Typography, Stack, Button } from "@mui/material"

import BodyPartImage from "../assets/icons/body-part.png"
import TargetImage from "../assets/icons/target.png"
import EquipmentImage from "../assets/icons/equipment.png"

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

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ]

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img
        src={gifUrl}
        alt={name}
        loading="lazy"
        className="detail-image"
        style={{
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          maxWidth: "700px",
          width: "100%",
        }}
      />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography
          sx={{
            fontSize: { lg: "64px", xs: "30px" },
            fontWeight: 700,
            textTransform: "capitalize",
            lineHeight: 1.2,
            ...gradientTextStyle,
          }}
        >
          {name}
        </Typography>
        <Typography
          className="exercise-description"
          sx={{
            fontSize: { lg: "24px", xs: "18px" },
            color: "#4A4A4A",
            lineHeight: 1.6,
            "& span": {
              color: theme.primary,
              fontWeight: 600,
              textTransform: "capitalize",
            },
          }}
        >
          Exercises keep you strong. <span>{name}</span> is one of the best
          exercises to target your <span>{target}</span>. It will help you
          improve your mood and gain energy.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: { lg: "30px", xs: "24px" },
            mb: "33px",
            mt: "11px",
          }}
        >
          Watch <span style={gradientTextStyle}>{name}</span> exercise videos
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: { lg: "30px", xs: "24px" },
            mb: "33px",
          }}
        >
          Similar <span style={gradientTextStyle}>Target Muscle</span> exercises
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: { lg: "30px", xs: "24px" },
            mb: "33px",
          }}
        >
          Similar <span style={gradientTextStyle}>Equipment</span> exercises
        </Typography>

        {extraDetail?.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button
              sx={{
                background: theme.gradient,
                borderRadius: "20px",
                width: "90px",
                height: "90px",
                minWidth: "90px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(30,136,229,0.2)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 25px rgba(30,136,229,0.3)",
                  background: theme.gradient,
                },
              }}
            >
              <img
                src={item.icon}
                alt={bodyPart}
                style={{
                  width: "45px",
                  height: "45px",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </Button>
            <Typography
              textTransform="capitalize"
              sx={{
                fontSize: { lg: "30px", xs: "20px" },
                color: theme.primary,
                fontWeight: 600,
              }}
            >
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default Detail
