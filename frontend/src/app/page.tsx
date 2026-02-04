"use client";

import { Button, Typography, Container } from "@mui/material";

export default function HomePage() {
  
  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Next + MUI
      </Typography>
      <Button variant="contained" color="warning" href="/auth/login" className="">
        Get Started
      </Button>
    </Container>
  );
}
