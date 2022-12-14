import React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "../../Axios/axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import styles from "./LoginStyles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../Redux/UserSlice";
import { AdminPanelSettings } from "@mui/icons-material";
const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  pasword: yup
    .string()
    .min(4)
    .max(8)
    .required(),
});
//const google = window.google;
function AdminLogin() {
  const navigate = useNavigate();
  const [LoginState, SetLoginState] = useState();
  const dispatch = useDispatch();
  const [wait, setWait] = useState(false);
  const [err, setErr] = useState(false);
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
    setWait(true);
    setErr(false);
    axios
      .post("/admin/adminlogin", data)
      .then((response) => {
        if (response.data.user) {
          if (response.data.password) {
            console.log(response.data.userData._id);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.userData)
            );
            dispatch(
              update({
                userId: response.data.userData._id,
                fname: response.data.userData.firstName,
                lname: response.data.userData.LastName,
              })
            );
            localStorage.setItem("adminToken", response.data.token);
            navigate("/admin-home");
            setWait(false);
          } else {
            SetLoginState("Wrong Password");
            setWait(false);
          }
        } else {
          SetLoginState("User Does Not Exist");
          setWait(false);
        }
      })
      .catch((err) => {
        setWait(false);
        setErr(true);
      });
  };
  return (
    <Box sx={{ backgroundColor: "whitesmoke" }}>
      <Container sx={styles.container}>
        <Box sx={styles.ContainerMainBox}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ ...styles.LockIconBox }}>
                <AdminPanelSettings sx={{ fontSize: 50 }}></AdminPanelSettings>
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
              label="User Email"
              variant="standard"
              fullWidth
            />
            <small style={{ color: "red", marginBottom: 3 }}>
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
                error={errors.pasword ? true : false}
                {...register("pasword")}
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
                {errors.pasword ? errors.pasword.message : ""}
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
                {!wait ? (
                  <Button
                    type="submit"
                    sx={{ marginTop: 3 }}
                    variant="contained"
                  >
                    Login In
                  </Button>
                ) : (
                  <CircularProgress sx={{ marginTop: 3 }} />
                )}
              </Box>
            </Box>
            <Box sx={{ textAlign: "center", width: "100%" }}>
              {err ? (
                <small style={{ color: "red", marginTop: 1 }}>
                  Something Went Wrong.Try Refresh Page
                </small>
              ) : (
                ""
              )}
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminLogin;
