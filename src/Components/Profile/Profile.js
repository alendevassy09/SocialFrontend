import { CameraAlt, Create, PhotoCamera } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import ProfileContents from "./ProfileContents";
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
function Profile() {
  return (
    <Box width={"100%"}>
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
              marginTop: { xs: 0, md: 1 },
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="auto"
              sx={{ maxHeight: 250 }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGhRKVE-dDv-rHK16H5_rvvuez3LxwIl3o3A&usqp=CAU"
            />
            <Box sx={{ display: "flex" }}>
              <Avatar
                alt="Remy Sharp"
                src="data:image/jpeg;base64,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"
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
                  Alen Devassy
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    200 Followers
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    200 Following
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
              <input hidden accept="image/*" type="file" />
              <Create />
            </IconButton>
            <IconButton
              aria-label="upload picture"
              component="label"
              sx={{
                position: "relative",
                bottom: 190,
                left: {lg:"75%",xs:"80%"},
                backgroundColor: "white",
                "&:hover": { backgroundColor: "whitesmoke" },
              }}
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
            {/* <IconButton
              sx={{
                position: "relative",
                bottom: 190,
                left: "85%",
                backgroundColor: "white",
                "&:hover": { backgroundColor: "whitesmoke" },
              }}
              aria-label="delete"
              size="large"
            >
              <input hidden accept="image/*" type="file" />
              <CameraAlt />
            </IconButton> */}
            {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
          </Card>
        </Box>
        <Box sx={{ width: "100%",backgroundColor:"white",boxShadow:1,borderRadius:2 }}>
        <Typography gutterBottom marginTop={1} marginLeft={1} variant="h6">
            FRIENDS
          </Typography>
          <ImageList
            sx={{ width: "100%", height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <ProfileContents></ProfileContents>
        {/* <RightBar></RightBar> */}
      </Stack>
    </Box>
  );
}

export default Profile;
