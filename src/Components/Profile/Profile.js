import {
  Create,
  PhotoCamera,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ImageList,
  ImageListItem,

  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useState } from "react";
import ProfileContents from "./ProfileContents";
import axiosImage from "../../Axios/ImageUpload";
import axios from "../../Axios/axios";
import { useEffect } from "react";
import ProfileModal from "./ProfileModal";
import { openUpdate } from "../../Redux/profileModalSlice";
import { singleProfileUpdate } from "../../Redux/SingleProfileSlice";
import { useDispatch } from "react-redux";
import Bio from "./Bio";
function Profile() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("userToken");
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [value] = useState("");
  const [profile, setProfile] = useState({});
  const [cover, setCover] = useState({});
  const [option, setOption] = useState(0);
  const [FollowersCount, setFollowersCount] = useState();
  const [followers, setFollowers] = useState([]);
  const [FollowingCount, setFollowingCount] = useState();
  const [following, setFollowing] = useState([]);
  const [useTitle, setUserTitle] = useState("");
  const [swith, setSwitch] = useState(true);
  const [button, setButton] = useState(false);

  const [study, setStudy] = useState();
  const [live, setLive] = useState();
  const [worksAt, setWorksAt] = useState();
  function profielModal(open, id) {
    console.log(id);
    localStorage.setItem("profileModal", JSON.stringify(id));

    dispatch(
      singleProfileUpdate({
        singleProfile: id,
      })
    );
    dispatch(
      openUpdate({
        open: open,
      })
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
      .get("/profilePicGet", { headers: { token: token } })
      .then((response) => {
        console.log(response.data);
        setWorksAt(response.data.followers.user.worksAt);
        setStudy(response.data.followers.user.studiedAt)
        setLive(response.data.followers.user.liveAt)
        setProfilePic(response.data.followers.user.profile);
        setCoverPic(response.data.followers.user.cover);
        setUserTitle(
          response.data.followers.user.firstName +
            " " +
            response.data.followers.user.LastName
        );
        let a = [];
        a = response.data.followers.followers;
        a = a.length;
        setFollowersCount(a);
        let b = [];
        b = response.data.following;
        b = b.length;
        setFollowingCount(b);

        setFollowing(response.data.following);
        setFollowers(response.data.followers.followers);
      });
  }, []);

  useEffect(() => {
    if (option !== 0) {
      handleClickOpen();
    }
  }, [profile, cover]);
  const uploadImage = async () => {
    if (option === 1) {
      const formData = new FormData();
      formData.append("file", profile);
      formData.append("upload_preset", "mpeyz3lt");
      formData.append("api_key", "299429838137541");
      axiosImage
        .post("/image/upload", formData)
        .then((response) => {
          setProfilePic(response.data.public_id);
          return axios.put(
            "/profile",
            { postId: response.data.public_id, description: value },
            { headers: { token: token } }
          );
        })
        .then((response) => {});
    } else if (option === 2) {
      console.log("3");
      const formData = new FormData();
      formData.append("file", cover);
      formData.append("upload_preset", "ppnu2okz");
      formData.append("api_key", "299429838137541");
      axiosImage
        .post("/image/upload", formData)
        .then((response) => {
          console.log(response);
          setCoverPic(response.data.public_id);
          return axios.put(
            "/cover",
            { storyId: response.data.public_id, description: value },
            { headers: { token: token } }
          );
        })
        .then((response) => {
          console.log(response);
        });
    }
  };
  return (
    <Box width={"100%"}>
      <ProfileModal></ProfileModal>
      <Stack
        width={"100%"}
        sx={{ marginTop: { md: 8 } }}
        spacing={{ md: 3 }}
        justifyContent="space-between"
      >
        <Box width={"100%"}>
          <Card
            sx={{
              width: "100%",
              maxHeight: 370,
              borderRadius: 2,
              marginTop: { xs: 2, md: 1 },
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="auto"
              sx={{ maxHeight: 250 }}
              image={
                coverPic
                  ? `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${coverPic}.png`
                  : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png`
              }
            />
            <Box sx={{ display: "flex" }}>
              <Avatar
                alt="Remy Sharp"
                src={
                  profilePic
                    ? `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${profilePic}.png`
                    : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png`
                }
                sx={{
                  width: 130,
                  height: 130,
                  position: "relative",
                  bottom: 50,
                  left: 6,
                  border: "solid",
                  borderWidth: "large",
                  borderColor: "white",
                }}
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: { md: "2rem", xs: "1.5rem" } }}
                  component="div"
                >
                  {useTitle}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {FollowersCount} Followers
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {FollowingCount} Following
                  </Typography>
                </Box>
              </CardContent>
            </Box>
            <IconButton
              aria-label="upload picture"
              component="label"
              sx={{
                position: "relative",
                bottom: 100,
                left: 100,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "whitesmoke" },
              }}
            >
              <input
                onChange={(e) => {
                  setOption(1);
                  setCover({});
                  setProfile(e.target.files[0]);
                }}
                hidden
                accept="image/*"
                type="file"
              />
              <Create />
            </IconButton>
            <IconButton
              aria-label="upload picture"
              component="label"
              sx={{
                position: "relative",
                bottom: 190,
                left: { lg: "75%", xs: "80%" },
                backgroundColor: "white",
                "&:hover": { backgroundColor: "whitesmoke" },
              }}
            >
              <input
                onChange={async (e) => {
                  setOption(2);
                  setProfile({});
                  setCover(e.target.files[0]);
                }}
                hidden
                accept="image/*"
                type="file"
              />
              <PhotoCamera />
            </IconButton>
          </Card>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 200,
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",

            justifyContent: "space-evenly",
            backgroundColor: "white",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            height="100%"
            width="100%"
            justifyContent={"space-evenly"}
            marginLeft={1}
          > 
            <Bio data={{bio:worksAt,item:worksAt?true:false,work:true}}></Bio>
            <Bio data={{bio:study,item:study?true:false,study:true}}></Bio>
            <Bio data={{bio:live,item:live?true:false,live:true}}></Bio>
        
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            boxShadow: 1,
            borderRadius: 2,
            paddingBottom: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              my: 1,
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                onClick={() => {
                  setButton(false);
                  setSwitch(true);
                }}
                variant={!button ? "contained" : "outlined"}
              >
                Following
              </Button>
              <Button
                onClick={() => {
                  setButton(true);
                  setSwitch(false);
                }}
                variant={button ? "contained" : "outlined"}
              >
                Followers
              </Button>
            </Box>
          </Box>

          {swith ? (
            <ImageList
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 450,
                marginBottom: 1,
                minHeight: 190,
              }}
              cols={3}
              rowHeight={164}
            >
              {following.map((item) => (
                <ImageListItem
                  onClick={() => {
                  
                    profielModal(true, item);
                  }}
                  sx={{ cursor: "pointer", textAlign: "center" }}
                  key={item.img}
                >
                  <img
                    style={{ maxHeight: "164px" }}
                    src={`${
                      !item.user.profile
                        ? "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png"
                        : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${item.user.profile}.png`
                    }?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${
                      !item.user.profile
                        ? "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png"
                        : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${item.user.profile}.png`
                    }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <Typography sx={{ zIndex: 1 }}>
                    {item.user.firstName}
                  </Typography>
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <ImageList
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 450,
                marginBottom: 1,
                minHeight: 190,
              }}
              cols={3}
              rowHeight={164}
            >
             
              {followers.map((item) => (
                <ImageListItem
                  onClick={() => {
                    
                    profielModal(true,{user:item})
                  }}
                  sx={{ cursor: "pointer", textAlign: "center" }}
                  key={item.img}
                >
                  <img
                    style={{ maxHeight: "164px" }}
                    src={`${
                      !item.profile
                        ? "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png"
                        : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${item.profile}.png`
                    }?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${
                      !item.profile
                        ? "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png"
                        : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${item.profile}.png`
                    }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <Typography sx={{ zIndex: 1 }}>{item.firstName}</Typography>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
        <ProfileContents></ProfileContents>
        {/* <RightBar></RightBar> */}
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure about changing your{" "}
            {option === 1 ? "profile" : "cover"} picture.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleClose();
              uploadImage();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;
