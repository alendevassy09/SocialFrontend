import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import SignUp from "../signUp/signUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Container, Button, Typography } from "@mui/material";
import styles from "./LoginStyles";
import { useState } from "react";
const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(4)
    .max(8)
    .required(),
});
function Login() {
  const navigate = useNavigate();
  const [LoginState, SetLoginState] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
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
  const submitForm = (data) => {
    console.log("sdfsd");
    console.log(data);
    axios.post("/userlogin", data).then((response) => {
      if (response.data.user) {
        if (response.data.password) {
          localStorage.setItem("auth", true);
          navigate("/home");
        } else {
          SetLoginState("Wrong Password");
        }
      } else {
        SetLoginState("User Does Not Exist");
      }
    });
  };
  return (
    <div>
      <Container sx={styles.container}>
        <Box sx={styles.ContainerMainBox}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ ...styles.LockIconBox }}>
                <LockIcon sx={{ fontSize: 50 }}></LockIcon>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justfyContent: "center",
                marginTop: 2,
                width: "100%",
              }}
            >
              <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
                {LoginState && <Alert severity="error">{LoginState}</Alert>}
              </Box>
            </Box>

            <TextField
              {...register("email")}
              error={errors.email ? true : false}
              required
              type="text"
              id="standard-basic"
              label="UserEmail"
              variant="standard"
              fullWidth
            />
            <small  style={{ color: "red",marginBottom:3 }}>
              {errors.email ? errors.email.message : ""}
            </small>

            <FormControl fullWidth variant="standard">
              <InputLabel
              
                style={{ color: errors.password ? "red" : "" }}
                htmlFor="standard-adornment-password"
              >
                Password*
              </InputLabel>

              <Input
                
                error={errors.password ? true : false}
                {...register("password")}
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
              <small style={{ color: "red" }}>
                {errors.password ? errors.password.message : ""}
              </small>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box>
                <Button type="submit" sx={{ marginTop: 3 }} variant="contained">
                  Login In
                </Button>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <Typography sx={{ marginTop: 2, color: "#9bc0ff" }} variant="p">
                  Or Login With
                </Typography>
              </Box>

              <Box>
                <IconButton sx={styles.googleIcon} aria-label="delete">
                  <GoogleIcon style={{ color: "white" }}></GoogleIcon>
                </IconButton>
              </Box>
            </Box>
          </form>
          <Box sx={styles.TextBox}>
            <SignUp></SignUp>
            <Typography sx={styles.TextBoxQuestion} variant="p">
              forgot password?
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
