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
import { registrationFormControls } from "../ulits";
import { registerNewUser } from "@/services/register";
interface pageProps {}
interface FormData {
  [key: string]: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};
const Register: FC<pageProps> = ({}) => {
  const [formData, setFormData] = useState(initialFormData);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log(formData);
    const data = await registerNewUser(formData);
    console.log(data);
    setFormData(initialFormData);
  }
  console.log(formData);

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
          {isRegistered ? (
            <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          ) : (
            <Box>
              {registrationFormControls.map((item, index) =>
                item.componentType === "input" ? (
                  <TextField
                    key={index}
                    margin="normal"
                    required
                    fullWidth
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [item.id]: event.target.value as string,
                      });
                    }}
                    name={item.id}
                    label={item.label}
                    type={item.type}
                    value={formData[item.id]}
                    id={item.id}
                  />
                ) : item.componentType === "select" ? (
                  <>
                    <InputLabel id="demo-simple-select-label">{item.label}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [item.id]: event.target.value,
                        });
                      }}
                      value={formData[item.id]}
                    >
                      {item.options?.map((item, i) => (
                        <MenuItem key={item.id} id={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : null
              )}
              <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Sign up
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default Register;
