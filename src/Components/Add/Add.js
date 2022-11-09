import {
  Avatar,
  Box,
  Button,
  Fab,
  IconButton,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Image } from "@mui/icons-material";
import axiosImage from "../../Axios/ImageUpload";
import axios from "../../Axios/axios";
import { postAdd } from "../../Redux/PostSlice";
import { useDispatch } from "react-redux";
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
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [description,SetDescription]=useState('')
  const [post, setPost] = useState({});
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", post);
    formData.append("upload_preset", "wnwycvqk");
    formData.append("api_key", "299429838137541");
    const token=localStorage.getItem('userToken')
    axiosImage
      .post("/image/upload", formData)
      .then((response) => {
        console.log(response);
        return axios.post("/post", { postId: response.data.public_id ,description:value},{headers:{token:token}});
      })
      .then((response) => {
        console.log(response);
        dispatch(
          postAdd({
            post:response.data
          })
        )
        setOpen(false);
      });
  };
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
          backgroundColor:"#ff5252"
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
            <Typography fontWeight={500} variant="span">
              Alen Devassy
            </Typography>
          </UserBox>
          <Box>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              size="large"
              sx={{backgroundColor:"pink"}}
            >
              <input
                onChange={(e) => {
                  setPost(e.target.files[0]);
                }}
                hidden
                accept="image/*"
                type="file"
              />
              <Image style={{ color: "red" }} />
            </IconButton>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              fullWidth
              maxRows={4}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
          </Box>
          <Box marginTop={2} width={"100%"} sx={{display:"flex",justifyContent:"center"}}>
            <Button onClick={uploadImage} variant="contained">
              Post
            </Button>
          </Box>
        </Box>
      </StyledModal>
    </>
  );
}

export default Add;
