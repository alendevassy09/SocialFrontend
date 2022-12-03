import { Box, Fab, IconButton, Modal, styled, Tooltip } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

import { openUpdate } from "../../Redux/StoryModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function StoryModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.open.open);
  const singleStory = useSelector((state) => state.singleStory.singleStory);
  console.log(singleStory);
  const setOpen = (openModal) => {
    dispatch(
      openUpdate({
        open: openModal,
      })
    );
  };
  return (
    <>
      <Tooltip
        onClick={(e) => {
          setOpen(true);
        }}
        title="New Post"
        sx={{
          display: "none",
          backgroundColor: "#1F3541",
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        sx={{ outline: "none" }}
        onClose={(e) => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          height={"auto"}
          bgcolor="white"
          borderRadius={1}
          p={3}
          sx={{ outline: "none", padding: 1, width: { xs: "90%", md: "30%" } }}
        >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <IconButton
              onClick={(e) => {
                setOpen(false);
              }}
              size="large"
            >
              <Close sx={{ marginLeft: "auto" }} />
            </IconButton>
          </Box>
          {/* {Object.keys(singleStory).length !== 0?singleStory.storyId.map((obj) => {
            return (
              <img
                style={{ width: "100%" }}
                src={`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${obj}.png`}
                alt=""
              />
            );
          }):""} */}
          {Object.keys(singleStory).length !== 0 ? (
            <Carousel>
              {singleStory.storyId.map((item, i) => (
                <Item key={i} item={{ img: item }} />
              ))}
            </Carousel>
          ) : (
            ""
          )}
        </Box>
      </StyledModal>
    </>
  );
}

export default StoryModal;

function Item(props) {
  return (
    <Paper>
      <img
        style={{ width: "100%" }}
        src={`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${props.item.img}.png`}
        alt=""
      />
    </Paper>
  );
}
