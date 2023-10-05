import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/images/Logo-1.png";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <Box mt="80px" bgcolor={"#ecebf1"}>
      <Stack gap={"20px"} alignItems={"center"} px={"40px"} pt={"24px"}>
        <img src={Logo} alt="logo" width={"200px"} height={"50px"} />
        <Typography variant="h5" pb={"40px"} mt={"5px"}>
          &copy; Nikola Sepic {year}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
