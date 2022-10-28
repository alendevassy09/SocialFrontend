import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import SignUp from "../signUp/signUp";
import Grid from "@mui/material/Grid";
import { Box, TextField, Container, Button, Typography } from "@mui/material";
import styles from "./LoginStyles";
function Login() {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Container sx={styles.container}>
        <form action="">
          <Box sx={styles.ContainerMainBox}>
            <Box sx={styles.LockIconBox}>
              <LockIcon sx={{ fontSize: 50 }}></LockIcon>
            </Box>

            <TextField
              required
              sx={{ paddingBottom: 3 }}
              type="text"
              id="standard-basic"
              label="userName"
              variant="standard"
              fullWidth
            />

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password*
              </InputLabel>
              <Input
                required
                fullWidth
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button sx={{ marginTop: 3 }} variant="contained">
              Login In
            </Button>
            <Typography sx={{ marginTop: 2, color: "#9bc0ff" }} variant="p">
              Or Login With
            </Typography>
            <IconButton sx={styles.googleIcon} aria-label="delete">
              <GoogleIcon style={{ color: "white" }}></GoogleIcon>
            </IconButton>

            <Box sx={styles.TextBox}>
              <Typography sx={styles.TextBoxQuestion} variant="p">
            <SignUp></SignUp>
           
              </Typography>
              <Typography sx={styles.TextBoxQuestion} variant="p">
                forgot password?
              </Typography>
            </Box>
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default Login;
