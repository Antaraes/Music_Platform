"use client";
import { FC, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { loginFormControls, registrationFormControls } from "../ulits";
import { useRouter } from "next/navigation";
interface pageProps {}
const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};
const Login: FC<pageProps> = ({}) => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const isRegistered = false;
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Box
        component="main"
        sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography component="h1" variant="h5">
          {isRegistered ? "Registeration Successful" : "Sign up for an account"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {loginFormControls.map((item, index) => (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id={item.id}
                label={item.label}
                name={item.id}
                autoFocus
              />
            </>
          ))}

          <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => router.push("/register")}
          >
            Register for
          </Button>

          <Box></Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Login;
