import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  firstName: yup.string().required(),
  LastName: yup.string().required(),
  email: yup.string().email(),
  birth: yup.string().required(),
  gender: yup.string().required(),
  pasword: yup
    .string()
    .min(4)
    .max(8)
    .required(),
});
function SignUp() {
  const navigate=useNavigate()
  const [age, setAge] = React.useState("");

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
  const [value, setValue] = React.useState(dayjs(Date.now()));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
      if(response.data.exist){
        console.log(response.data.exist);
      }else{
        localStorage.setItem('auth',true)
        navigate('/home')
       
      }
    });
  };

  return (
    <div>
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
                      label="First Name"
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
                      label="Last Name"
                    />
                  </Grid>
                </Grid>

                <TextField
                  required
                  name="email"
                  type={"email"}
                  {...register("email")}
                  fullWidth
                  id="outlined-required"
                  label="Email"
                />
                <TextField
                  {...register("pasword")}
                  name="pasword"
                  required
                  type="password"
                  sx={{ marginTop: 1 }}
                  fullWidth
                  id="outlined-required"
                  label="password"
                />

                <FormControl fullWidth>
                  <Grid
                    container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid item xs={12} md={5.8}>
                      <Box sx={{ marginTop: 2 }}>
                        <InputLabel
                          sx={{ marginTop: 2 }}
                          id="demo-simple-select-label"
                        >
                          Gender
                        </InputLabel>
                        <Select
                          fullWidth
                          {...register("gender")}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Age"
                          onChange={handleChangeGender}
                        >
                          <MenuItem value={"female"}>female</MenuItem>
                          <MenuItem value={"male"}>male</MenuItem>
                          <MenuItem value={"other"}>other</MenuItem>
                        </Select>
                      </Box>
                    </Grid>
                    <Grid xs={12} md={5.8}>
                      <Box>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            {...register("birth")}
                            label="Date Of Birth"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                type="text"
                                name="birth"
                                sx={{ marginTop: 2 }}
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
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
                  <Button sx={{marginTop:2}} type="submit" variant="contained">
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
