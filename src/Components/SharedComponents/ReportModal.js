import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import axios from "../../Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { openUpdate } from "../../Redux/ReportModalSlice";
const StyledProfileModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 8,
});

function ReportModal() {
    const [reason,setReason]=useState('')
  let dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  const reportModal = useSelector((state) => state.report.open);
  useEffect(() => {
    console.log("this is report modal");
  }, [reportModal]);
  function report() {
    let id = localStorage.getItem("reportId");
    if(reason!==''){
    axios
      .post("/reportPost", { postId: id,reason }, { headers: { token: token } })
      .then((response) => {
        dispatch(
            openUpdate({
              open: false,
            })
          );
      });}
  }
  return (
    <Box>
      <StyledProfileModal
        open={reportModal}
        sx={{ outline: "none" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          height={"auto"}
          bgcolor="white"
          borderRadius={1}
          p={3}
          sx={{
            outline: "none",
            padding: 3,
            width: { xs: "100%", md: "25%" },
            height: { md: "50%", xs: "100%" },
          }}
        >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <IconButton
              onClick={() => {
                dispatch(
                  openUpdate({
                    open: false,
                  })
                );
              }}
              size="large"
            >
              <Close sx={{ marginLeft: "auto" }} />
            </IconButton>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6">
              Why Are You Reporting This Post?
            </Typography>
          </Box>
          <Box width={"100%"}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={(e) => {
                console.log(e.target.value);
                //(e.target.value===1)
                setReason(e.target.value)
              }}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={"type1"}
                control={<Radio />}
                label="Its a Spam"
              />
              <FormControlLabel
                value={"type2"}
                control={<Radio />}
                label="Hate Speech or Symbol"
              />

              <FormControlLabel
                value={"type3"}
                control={<Radio />}
                label="False Information"
              />

              <FormControlLabel
                value={"type4"}
                control={<Radio />}
                label="I Just Don't Like It"
              />
            </RadioGroup>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                report();
              }}
              size="small"
              color="error"
              variant="contained"
            >
              Report
            </Button>
          </Box>
        </Box>
      </StyledProfileModal>
    </Box>
  );
}

export default ReportModal;
