import React from "react"
import { Link } from "react-router-dom"
import { Stack } from "@mui/material"

import Logo from "../assets/images/Logo.png"

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

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{
        gap: { sm: "122px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        justifyContent: "none",
      }}
      px="20px"
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{
            width: "64px",
            height: "64px",
            margin: "0 20px",
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: theme.primary,
            borderBottom: `3px solid ${theme.primary}`,
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = theme.secondary
            e.currentTarget.style.borderBottom = `3px solid ${theme.secondary}`
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = theme.primary
            e.currentTarget.style.borderBottom = `3px solid ${theme.primary}`
          }}
        >
          Home
        </Link>
        <a
          href="#exercises"
          style={{
            textDecoration: "none",
            color: theme.primary,
            transition: "all 0.3s ease",
          }}
          onClick={() => {
            window.scrollTo({ top: 1800, left: 100, behavior: "smooth" })
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = theme.secondary)}
          onMouseOut={(e) => (e.currentTarget.style.color = theme.primary)}
        >
          Exercises
        </a>
      </Stack>
    </Stack>
  )
}

export default Navbar
