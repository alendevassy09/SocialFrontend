import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Box, Snackbar, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  LastName: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: yup.string().email(),
  gender: yup.string().required(),
  pasword: yup
    .string()
    .min(4)
    .max(8)
    .required(),
});
function SignUp() {
  const [state, setSnackbar] = React.useState({
    snackBar: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, snackBar } = state;

  const [age, setAge] = React.useState("");
  const navigate = useNavigate();
  const handleChangeGender = (event) => {
    setAge(event.target.value);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    outline: "none",
    borderRadius: 3,
  };
  

  const submitForm = (data) => {
    axios.post("/signup", data).then((response) => {
      if (response.data.response.exist) {
        console.log(response.data.response.exist);
        setSnackbar({ snackBar: true, vertical: "top", horizontal: "center" });
        console.log(snackBar);
      } else {
        localStorage.setItem("userToken", response.data.token);
        navigate("/home");
      }
    });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBar}
        onClose={() => {
          setSnackbar({ open: false, vertical: "top", horizontal: "center" });
        }}
        message="User Already Exists"
        key={vertical + horizontal}
      />
      <Typography sx={{ cursor: "pointer" }} onClick={handleOpen}>
        Create Account
      </Typography>

      <Grid container>
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Grid
              container
              xs={11}
              md={4}
              sm={6}
              xl={4}
              lg={4}
              sx={{
                ...style,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                sx={{
                  borderBottom: 1,
                  borderColor: "grey.500",
                  marginBottom: 1,
                }}
                item
                xs={12}
              >
                <Box>
                  <Typography variant="h4">Sign Up</Typography>
                </Box>
                <Box>
                  <Typography variant="p">It's Quick And Easy</Typography>
                </Box>
              </Grid>
              <form onSubmit={handleSubmit(submitForm)}>
                <Grid
                  item
                  container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item xs={12} md={5.8} sx={{ marginBottom: 1 }}>
                    <TextField
                      {...register("firstName")}
                      type="text"
                      name="firstName"
                      required
                      fullWidth
                      id="outlined-required"
                      error={errors.firstName ? true : false}
                      label={
                        errors.firstName
                          ? errors.firstName.message
                          : "First Name"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={5.8} sx={{ marginBottom: 1 }}>
                    <TextField
                      {...register("LastName")}
                      type="text"
                      name="LastName"
                      fullWidth
                      required
                      id="outlined-required"
                      error={errors.email ? true : false}
                      label={
                        errors.LastName ? errors.LastName.message : "Last Name"
                      }
                    />
                  </Grid>
                </Grid>

                <TextField
                  error={errors.email ? true : false}
                  required
                  name="email"
                  type={"email"}
                  {...register("email")}
                  fullWidth
                  id="outlined-required"
                  label={errors.email ? errors.email.message : "Email"}
                />
                <TextField
                  {...register("pasword")}
                  name="pasword"
                  required
                  type="password"
                  sx={{ marginTop: 1 }}
                  fullWidth
                  id="outlined-required"
                  error={errors.pasword ? true : false}
                  label={errors.pasword ? errors.pasword.message : "Passsword"}
                />

                <FormControl fullWidth>
                  <Grid
                    container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid item xs={12} md={12}>
                      <Box sx={{ marginTop: 2 }}>
                        <InputLabel
                          sx={{ marginTop: 2 }}
                          id="demo-simple-select-label"
                        >
                          {errors.gender ? (
                            <p style={{ color: "red" }}>
                              {errors.gender.message}
                            </p>
                          ) : (
                            "Gender"
                          )}
                        </InputLabel>
                        <Select
                          error={errors.gender ? true : false}
                          fullWidth
                          {...register("gender")}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label={
                            errors.gender ? errors.gender.message : "Gender"
                          }
                          onChange={handleChangeGender}
                        >
                          <MenuItem value={"female"}>female</MenuItem>
                          <MenuItem value={"male"}>male</MenuItem>
                          <MenuItem value={"other"}>other</MenuItem>
                        </Select>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  ></Grid> */}
                </FormControl>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    sx={{ marginTop: 2 }}
                    type="submit"
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Fade>
        </Modal>
      </Grid>
    </div>
  );
}

export default SignUp;
