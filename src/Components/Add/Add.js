import {
  Avatar,
  Box,
  Fab,
  Modal,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const UserBox = styled(Box)({
  display: "flex",

  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});
function Add() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip
        onClick={(e) => {
          setOpen(true);
        }}
        title="New Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={280} bgcolor="white" borderRadius={5} p={3}>
          <Typography variant="h6" color="grey" textAlign="center">
            Create Post
          </Typography>
          <UserBox>
            <Avatar src="" alt="R" sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">Alen Devassy</Typography>
          </UserBox>
        </Box>
      </StyledModal>
    </>
  );
}

export default Add;
