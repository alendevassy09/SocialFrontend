import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "../../Axios/axios";
const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function ForgotPass() {
  const [code, setCode] = useState(0);
  const [err, seterr] = useState(false);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(1);
  const [match, setMatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.match(mailformat)) {
      setEmail(inputText);
      console.log("correct");
      seterr(false);
    } else {
      console.log("not correct");
      seterr(true);
      setEmail(inputText);
      setMsg("Enter a valid email address");
    }
  }
  function matchValidate(string) {
    if (string.length === 0) {
      seterr(true);
      setMsg("6 Digit Varification Code Is Required To Continue");
    } else {
      seterr(false);
      setMatch(string);
    }
  }
  function sendEmail() {
    if (email && !err) {
      setLoading(true);
      axios
        .get("/sendEmail", { headers: { email: email } })
        .then((response) => {
          console.log(response);
          if (!response.data.status) {
            // setsendCode(true);
            setCode(response.data.code);
            setOption(2);
            setLoading(false);
          } else {
            setMsg("Enter a valid email address");
            seterr(true);
            setLoading(false);
          }
        });
    }
    //setOption(2);
  }
  function verify() {
    if (parseInt(match) === parseInt(code)) {
      seterr(false);
      setMsg("");
      setOption(3);
    } else {
      setMsg("Entered Code Is Wrong");
      seterr(true);
    }
  }
  function enterPass(pass) {
    if (pass.length < 5) {
      seterr(true);
      setMsg("Minimum Length Is Five");
      setPassword(pass);
    } else {
      seterr(false);
      setMsg("");
      setPassword(pass);
    }
  }
  function confirmPass(pass) {
    if (pass !== password) {
      seterr(true);
      setMsg("Enter The Same Password");
    } else {
      seterr(false);
      setMsg("");
    }
  }
  function set() {
    if (password.length > 4 && password === confirmPassword) {
      seterr(false);
      setMsg("");
      setLoading(true);
      axios.patch("/passwordUpdate", { email, password }).then((response) => {
        console.log(response);

        setOption(4);
      });
    } else if (password.length < 5) {
      seterr(true);
      setMsg("Minimum Length Is Five");
    } else if (password !== confirmPassword) {
      seterr(true);
      setMsg("Enter The Same Password");
    }
  }
  return (
    <>
      <Button
        size="small"
        onClick={(e) => {
          setOpen(true);
        }}
      >
        Forgot Password?
      </Button>
      <StyledModal
        open={open}
        // onClose={(e) => {
        //   setOpen(false);
        // }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          minHeight={"auto"}
          maxHeight={500}
          bgcolor="white"
          borderRadius={5}
          p={3}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" color="grey" textAlign="center">
              Forgot Password?
            </Typography>
            <IconButton
              onClick={() => {
                setEmail("");
                setOpen(false);
                setCode(0);
                seterr(false);
                setMsg("");
                setEmail("");
                setPassword("");
                setMatch("");
                setLoading(false);
                setConfirmPassword("");
              }}
            >
              <Close></Close>
            </IconButton>
          </Box>

          <hr />
          {option === 1 && (
            <Box sx={{ width: "100%", height: "40%" }}>
              <small>
                Enter Your Registered Email Address.You Will Receive a 6 Digit
                Verification Code.
              </small>
            </Box>
          )}
          {option === 2 && (
            <Box sx={{ width: "100%", height: "40%" }}>
              <small>
                Enter The 6 Digit Verification Code Received In Your Email
                Adress.
              </small>
            </Box>
          )}
          {option === 3 && (
            <Box sx={{ width: "100%", height: "40%" }}>
              <small>Set Your New Password .</small>
            </Box>
          )}
          {option === 1 && (
            <Box sx={{ marginTop: 2 }}>
              <TextField
                error={err ? true : false}
                size="small"
                onInput={(e) => {
                  ValidateEmail(e.target.value);
                }}
                required
                type={"email"}
                id="outlined-multiline-flexible"
                label="email"
                fullWidth
                value={email}
              />
            </Box>
          )}

          {option === 2 && (
            <Box
              sx={{
                marginTop: 2,
                with: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                onInput={(e) => {
                  setMatch(e.target.value);
                  matchValidate(e.target.value);
                }}
                type={"text"}
                size="small"
                id="outlined-multiline-flexible"
                label="Verification"
                value={match}
              />
            </Box>
          )}

          {option === 3 && (
            <Box sx={{ marginTop: 2 }}>
              <TextField
                onInput={(e) => {
                  //setPassword(e.target.value);
                  enterPass(e.target.value);
                }}
                size="small"
                required
                type={"password"}
                id="outlined-multiline-flexible"
                label="Password"
                fullWidth
                value={password}
              />
            </Box>
          )}
          {option === 3 && (
            <Box sx={{ marginTop: 2 }}>
              <TextField
                onInput={(e) => {
                  setConfirmPassword(e.target.value);
                  confirmPass(e.target.value);
                }}
                size="small"
                required
                type={"password"}
                id="outlined-multiline-flexible"
                label="Confirm Password"
                fullWidth
                value={confirmPassword}
              />
            </Box>
          )}
          {option === 4 && (
            <Box
              sx={{
                marginTop: 2,
                with: "100%",
                height: 60,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="#00e676">
                Password Updated Successfully
              </Typography>
            </Box>
          )}
          {err && (
            <Box sx={{ width: "100%", height: "40%", color: "red" }}>
              <small>{msg}</small>
            </Box>
          )}
          {option === 1 && (
            <Box
              marginTop={2}
              width={"100%"}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={() => {
                    sendEmail();
                  }}
                  variant="contained"
                >
                  Next
                </Button>
              )}
            </Box>
          )}
          {option === 2 && (
            <Box
              marginTop={2}
              width={"100%"}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {/* <CircularProgress/> */}
              <Button
                onClick={() => {
                  verify();
                }}
                variant="contained"
              >
                Verify
              </Button>
            </Box>
          )}
          {option === 3 && (
            <Box
              marginTop={2}
              width={"100%"}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={() => {
                    set();
                  }}
                  variant="contained"
                >
                  Submit
                </Button>
              )}
            </Box>
          )}
        </Box>
      </StyledModal>
    </>
  );
}

export default ForgotPass;
