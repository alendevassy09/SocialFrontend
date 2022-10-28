import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
function SignUp() {
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
  return (
    <div>
      <Typography onClick={handleOpen}>Create Account</Typography>
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

              <Grid item xs={12} md={5.8} sx={{ marginBottom: 1 }}>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} md={5.8} sx={{ marginBottom: 1 }}>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Last Name"
                />
              </Grid>

              {/* {<Box
                sx={{
                  display: "flex",
                  marginTop: 2,
                  justifyContent: "space-between",
                }}
              >
                
                <TextField  required id="outlined-required" label="First Name" />
                <TextField required id="outlined-required" label="Last Name" />
              </Box>} */}
              <TextField
                required
                type={"email"}
                fullWidth
                id="outlined-required"
                label="Email"
              />
              <TextField
                required
                type={"password"}
                sx={{ marginTop: 1 }}
                fullWidth
                id="outlined-required"
                label="password"
              />

              <FormControl fullWidth>
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Date Of Birth"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField
                          sx={{marginTop: 2}}
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
               
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                    fullWidth
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                

                </Grid>
                  
              </FormControl>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant="contained">Sign Up</Button>
              </Grid>
            </Grid>
          </Fade>
        </Modal>
      </Grid>
    </div>
  );
}

export default SignUp;
