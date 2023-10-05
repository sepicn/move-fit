import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import HeroBannerImage from "../assets/images/banner.png";

const HeroBanner = () => {
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
        color="error"
        href="#exercises"
        mb={4}
        sx={{
          backgroundColor: "#423E78",
          padding: "10px",
        }}
      >
        Explore Exercises
      </Button>
      <Typography
        fontWeight={600}
        color="#423E78"
        sx={{
          opacity: 0.1,
          display: { lg: "block", xs: "none" },
        }}
        fontSize="200px"
      >
        Move Fit
      </Typography>
      <img src={HeroBannerImage} alt="banner" className="hero-banner-img" />
    </Box>
  );
};

export default HeroBanner;
