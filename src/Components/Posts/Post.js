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
import axios from "../../Axios/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fade from "@mui/material/Fade";

function Post(props) {
  let navigate = useNavigate();
  const [comment, SetComment] = useState("");
  const [existingComments, setExistingComments] = useState(
    props.data.comment ? props.data.comment : []
  );
  const data = props.data;
  const [check, setcheck] = useState(data.likeStatus ? true : false);
  const [likes, setLikes] = useState(data.likes ? data.likes.length : 0);
  const [openMenu, setOpen] = useState(false);

  const token = localStorage.getItem("userToken");

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
  const sendComment = () => {
    if (comment !== "") {
      axios
        .post("/comment", { comment, id: data._id }, { headers: { token } })
        .then((response) => {
          setExistingComments([
            { user: { firstName: "Alen" }, text: comment, _id: "22" },
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
  const [location,setLocation]=useState('profile')
  const Close=()=>{
    setAnchorEl(null);
  }
  function handleClose  (id){
    try {
      if(id){axios
        .patch("/save", { post: id }, { headers: { token: token } })
        .then((response) => {
    
          
          console.log(data);
          setAnchorEl(null);
          setSave(save?false:true)
        })}else{
          setAnchorEl(null);
        }
      
    } catch (error) {
      console.log(error);
    }
  
  };

  return (
    <Card
     
      id={data._id}
      sx={{
        marginBottom: { md: 2 },
        width: "100%",
        boxShadow: 2,

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
        action={location=='profile'?
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
                  {save?"Remove":"Save"}
                </MenuItem>
            </Menu>
          </div>
        :<div>
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
          <MenuItem>Delete</MenuItem>
        </Menu>
      </div>}
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
      <CardMedia
        component="img"
        width="100%"
        image={`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.postId}.png`}
        alt="Paella dish"
      />

      <CardActions disableSpacing sx={{ width: "100%" }}>
        <IconButton
          onClick={likePost}
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
            <IconButton onClick={sendComment}>
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
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { md: 20, lg: 40 },
                        height: { md: 20, lg: 40 },
                      }}
                      alt="Remy Sharp"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSynTpwWJqxTrCtIzisHRnSXXY_Ep2wuy5DJw&usqp=CAU"
                    />
                    <Box
                      sx={{
                        width: "auto",
                        maxWidth: "70%",
                        padding: 1,
                        display: "flex",
                        backgroundColor: "#abc4ff",
                        marginLeft: 1,
                        borderRadius: 2,
                      }}
                    >
                      {obj.user.firstName + " :"}
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
                  backgroundColor: "whitesmoke",
                }}
              >
                <Box
                  sx={{
                    width: "auto",
                    maxWidth: "70%",
                    padding: 1,
                    display: "flex",
                    backgroundColor: "#abc4ff",
                    marginLeft: 1,
                    borderRadius: 2,
                  }}
                >
                  No Comments
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
