"use client";

import React, { useState } from "react";
import { login } from "@/lib/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  AlertColor,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Alerts from "@/components/Alerts";
import axios from "axios";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    id: number;
    message: string;
    severity: AlertColor;
  } | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setAlert({ id: Date.now(), message: "Please enter email and password", severity: "warning" });
      return;
    }

    try {
      const res = await login(email, password);
      setAlert({
        id: Date.now(),
        message: res.data.message || "Login successful",
        severity: "success",
      });
      window.location.href = "/";
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || "Login failed"
        : "Login failed";
      setAlert({
        id: Date.now(),
        message: errorMessage,
        severity: "error",
      });
    }
  };

  function handleClickShowPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShowPassword((s) => !s);
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  function handleMouseUpPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-500">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow w-80 rounded-2xl">
        <Typography variant="h5" className="mb-4 text-center">Login</Typography>
        {alert && <Alerts key={alert.id} message={alert.message} severity={alert.severity} />}

        <TextField
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "hide the password" : "display the password"}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </Box>
  );
}
