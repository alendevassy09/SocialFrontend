import React from "react";
import {
  Badge,
  Box,
  Checkbox,
  Collapse,
  Menu,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chat, Favorite, FavoriteBorder, Send } from "@mui/icons-material";
import axios from "../../../Axios/axios";
import { useState } from "react";
import Fade from "@mui/material/Fade";
//import {  useSelector } from "react-redux";
import cloudinary from "cloudinary/lib/cloudinary";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openUpdate } from "../../../Redux/ReportModalSlice";
cloudinary.config({
  cloud_name: "dcytixl43",
  api_key: "299429838137541",
  api_secret: "T1fAGO5nrpydYi07guzgqHYJpfE",
});
function Post(props) {
  console.log(props.data, "this is profile");
  const navigate = useNavigate();
  const [comment, SetComment] = useState("");
  const [existingComments, setExistingComments] = useState(
    props.data.comment ? props.data.comment : []
  );
  //const saved = useSelector((state) => state.saved.saved);
  const [show, setShow] = useState("block");
  const [data, setData] = useState(props.data);
  const [check, setcheck] = useState(data.likeStatus ? true : false);
  const [likes, setLikes] = useState(data.likes ? data.likes.length : 0);
const [reoprt,setReport]=useState(false)
  const token = localStorage.getItem("userToken");
    const dispatch=useDispatch()
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 20,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      color: "black",
      backgroundColor: "#61A5C2",
    },
  }));

  const likePost = () => {
    axios
      .post("/likePost", { postId: data._id }, { headers: { token } })
      .then((response) => {
        console.log(response.data);
        setcheck(response.data.status);
        setLikes(response.data.likes);
      });
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let userData = JSON.parse(localStorage.getItem("userData"));

  const sendComment = () => {
    if (comment !== "") {
      axios
        .post("/comment", { comment, id: data._id }, { headers: { token } })
        .then((response) => {
          setExistingComments([
            {
              user: {
                firstName: userData.firstName,
                profile: userData.profile,
              },
              text: comment,
              _id: "22",
            },
            ...existingComments,
          ]);
          SetComment("");
        });
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [save, setSave] = useState(data.save);
  // const [location, setLocation] = useState(data.area);
  const Close = () => {
    setAnchorEl(null);
  };
  function handleClose(id) {
    try {
      if (id) {
        axios
          .patch("/save", { post: id }, { headers: { token: token } })
          .then((response) => {
            console.log(data);
            setAnchorEl(null);
            setSave(save ? false : true);
          });
      } else {
        setAnchorEl(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function reportPost(id) {
    localStorage.setItem("reportId",id)
   
      setAnchorEl(null);
      dispatch(
        openUpdate({
          open:true
        })
      )

  }
  function removeFromSave(id) {
    try {
      if (id) {
        axios
          .patch("/removeFromSave", { post: id }, { headers: { token: token } })
          .then((response) => {
            console.log(data);
            setAnchorEl(null);
            //setSave(save ? false : true);
            setShow("none");
            // dispatch(
            //   getSaved({
            //     saved:id
            //   })
            // )
          });
      } else {
        setAnchorEl(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function removePost(id) {
    try {
      if (id) {
        axios
          .patch("/removePost", { post: id }, { headers: { token: token } })
          .then((response) => {
            console.log(data);
            setAnchorEl(null);
            //setSave(save ? false : true);
            setShow("none");
            // dispatch(
            //   getSaved({
            //     saved:id
            //   })
            // )

            cloudinary.v2.uploader
              .destroy(response.data, function(error, result) {
                console.log("yes");
                console.log(result, error);
              })
              .then((resp) => console.log(resp))
              .catch((_err) =>
                console.log("Something went wrong, please try again later.")
              );
          });
      } else {
        setAnchorEl(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function session(call) {
    axios
      .get("/authCheck", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        if (!response.data.status) {
          localStorage.removeItem("userToken");
          navigate("/");
        } else {
          // likePost()
          call();
        }
      });
  }
  return (
    <Card
      id={data._id}
      sx={{
        marginBottom: { md: 2 },
        width: "100%",
        boxShadow: 2,
        display: show,
        borderRadius: 2,
        position: "relative",
        backgroundColor: "#e9e9e9",
      }}
      key={data._id}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: { md: 36, lg: 56 },
              height: { md: 36, lg: 56 },
              //border: "solid",
              // borderWidth: "large",
              // borderColor: "#fd1d1d",
              position: "relative",
            }}
            aria-label="recipe"
            src={
              !data.user.profile
                ? "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png"
                : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.user.profile}.png`
            }
          >
            R
          </Avatar>
        }
        action={
          data.area === "home" ? (
            <div>
              <IconButton
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={Close}
                TransitionComponent={Fade}
              >
                <MenuItem
                  onClick={() => {
                    handleClose(data._id);
                  }}
                >
                  {save ? "Remove" : "Save"}
                </MenuItem>
                {data.reportPost && (
                  <MenuItem
                    disabled={data.report?true:false}
                    onClick={() => {
                      reportPost(data._id);
                    }}
                  >
                    {data.report?"Reported":"Report"}
                  </MenuItem>
                )}
              </Menu>
            </div>
          ) : data.area === "saved" ? (
            <div>
              <IconButton
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={Close}
                TransitionComponent={Fade}
              >
                <MenuItem
                  onClick={() => {
                    removeFromSave(data._id);
                  }}
                >
                  Delete
                </MenuItem>
              
              </Menu>
            </div>
          ) : data.area === "profile" ? (
            <div>
              <IconButton
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={Close}
                TransitionComponent={Fade}
              >
                <MenuItem
                  onClick={() => {
                    removePost(data._id);
                  }}
                >
                  Remove Post
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={Close}
                TransitionComponent={Fade}
              >
                <MenuItem
                  onClick={() => {
                    handleClose(data._id);
                  }}
                >
                  {save ? "Remove" : "Save"}
                </MenuItem>
              </Menu>
            </div>
          )
        }
        title={
          data.user.firstName.toUpperCase() +
          " " +
          data.user.LastName.toUpperCase()
        }
        subheader={data.dt}
      />

      {data.description && (
        // CardContent
        <Box>
          <Typography
            sx={{ marginLeft: "10%" }}
            variant="body2"
            color="text.secondary"
          >
            {data.description}
          </Typography>
        </Box>
      )}
      {data.postId ? (
        <CardMedia
          component="img"
          width="100%"
          image={`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.postId}.png`}
        />
      ) : (
        ""
      )}

      <CardActions disableSpacing sx={{ width: "100%" }}>
        <IconButton
          onClick={() => {
            session(likePost);
          }}
          aria-label="add to favorites"
          disableRipple
        >
          <StyledBadge badgeContent={likes} max={999}>
            <Checkbox
              checked={check}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            ></Checkbox>
          </StyledBadge>
          {/* <small style={{ color: "black" }}>{likes} Likes</small> */}
        </IconButton>
        {/* <Box sx={{ width: "70%", padding: 1, borderRadius: 3, boxShadow: 2 }}>
          <TextField
            id="standard-basic"
            placeholder="Write something"
            InputProps={{ disableUnderline: true }}
            fullWidth
            variant="standard"
          />
        </Box> */}
        <IconButton
          sx={{ marginLeft: 1 }}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Chat></Chat>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box
            sx={{
              width: "97%",
              display: "flex",
              alignItems: "center",
              padding: 1,
              borderRadius: 3,
              boxShadow: 2,
              backgroundColor: "#a594f9",
            }}
          >
            <TextField
              id="standard-basic"
              placeholder="Write something"
              InputProps={{ disableUnderline: true }}
              fullWidth
              variant="standard"
              multiline
              value={comment}
              onChange={(event) => {
                SetComment(event.target.value);
              }}
            />
            <IconButton onClick={() => session(sendComment)}>
              <Send></Send>
            </IconButton>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            {existingComments[0] ? (
              existingComments.map((obj) => {
                return (
                  <Box
                    key={obj._id}
                    sx={{
                      padding: 2,
                      display: "flex",
                      height: "auto",
                      borderRadius: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { md: 20, lg: 40 },
                        height: { md: 20, lg: 40 },
                      }}
                      alt="Remy Sharp"
                      src={
                        !obj.user.profile
                          ? "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/profile_pic/tyye6ctzdt8c9qqhegdj.png"
                          : `https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${obj.user.profile}.png`
                      }
                    />
                    <Box
                      sx={{
                        width: "auto",
                        maxWidth: "70%",
                        padding: 1,
                        display: "flex",
                        backgroundColor: "whitesmoke",
                        marginLeft: 1,
                        borderRadius: 2,
                      }}
                    >
                      {obj.user.firstName + " : "}
                      {obj.text}
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  height: "auto",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: "auto",
                    maxWidth: "70%",
                    padding: 1,
                    display: "flex",
                    backgroundColor: "whitesmoke",
                    marginLeft: 1,
                    borderRadius: 2,
                  }}
                >
                  No Comments Yet
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
