import React from "react"
import {
  Box,
  Stack,
  Typography,
  Link,
  Container,
  IconButton,
} from "@mui/material"
import Logo from "../assets/images/Logo-1.png"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import LanguageIcon from "@mui/icons-material/Language"

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

const year = new Date().getFullYear()

const Footer = () => {
  return (
    <Box
      sx={{
        background: theme.gradient,
        color: "white",
        py: 4,
        mt: "80px",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* Top Section */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 6 }}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {/* Logo and Description */}
            <Stack spacing={2} maxWidth="400px">
              <img
                src={Logo}
                alt="Move Fit"
                style={{
                  width: "180px",
                  filter: "brightness(0) invert(1)",
                }}
              />
              <Typography
                variant="body2"
                color="rgba(255,255,255,0.9)"
                sx={{ fontSize: "0.9rem" }}
              >
                Your ultimate exercise companion, designed to empower your
                fitness journey. Whether you're a beginner or a seasoned fitness
                enthusiast, Move Fit provides a seamless experience.
              </Typography>
            </Stack>

            {/* Quick Links */}
            <Stack spacing={1.5}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: "1.1rem" }}
              >
                Quick Links
              </Typography>
              <Link
                href="#exercises"
                color="inherit"
                underline="hover"
                sx={{
                  transition: "all 0.3s",
                  "&:hover": {
                    color: "rgba(255,255,255,0.8)",
                    transform: "translateX(5px)",
                  },
                }}
              >
                Exercises
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{
                  transition: "all 0.3s",
                  "&:hover": {
                    color: "rgba(255,255,255,0.8)",
                    transform: "translateX(5px)",
                  },
                }}
              >
                Body Parts
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{
                  transition: "all 0.3s",
                  "&:hover": {
                    color: "rgba(255,255,255,0.8)",
                    transform: "translateX(5px)",
                  },
                }}
              >
                Equipment
              </Link>
            </Stack>

            {/* Contact Info */}
            <Stack spacing={1.5}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: "1.1rem" }}
              >
                Contact
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.9)">
                Email: sepicnikola@gmail.com
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  href="https://github.com/sepicn"
                  target="_blank"
                  sx={{
                    color: "white",
                    padding: "8px",
                    background: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/sepicn/"
                  target="_blank"
                  sx={{
                    color: "white",
                    padding: "8px",
                    background: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  href="https://www.sepic.me"
                  target="_blank"
                  sx={{
                    color: "white",
                    padding: "8px",
                    background: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  <LanguageIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>

          {/* Bottom Section - Copyright */}
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              pt: 2,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              color="rgba(255,255,255,0.7)"
              sx={{ fontSize: "0.85rem" }}
            >
              © {year} Move Fit by Nikola Sepic. All rights reserved.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
