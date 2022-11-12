import React from "react";
import {
  Badge,
  Box,
  Checkbox,
  Collapse,
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
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Chat,
  Favorite,
  FavoriteBorder,
  Send,
  TextFields,
} from "@mui/icons-material";
import axios from "../../Axios/axios";
import { useState } from "react";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function Post(props) {
  const [comment,SetComment]=useState('')
  const [existingComments,setExistingComments]=useState(props.data.comment?props.data.comment:[])
  const data = props.data;
  console.log(existingComments,'comment');
  const [check, setcheck] = useState(data.likeStatus ? true : false);
  const [likes, setLikes] = useState(data.likes ? data.likes.length : 0);

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
  const sendComment=()=>{
if(comment!=''){
    axios.post('/comment',{comment,id:data._id},{headers:{token}}).then((response)=>{
      
      setExistingComments([{user:"",text:comment,_id:"22"},...existingComments])
      SetComment('')
    })
  
  }
  }

  return (
    <Card
      id={data._id}
      sx={{
        marginBottom: { md: 2 },
        width: "100%",
        boxShadow: 2,
        my: 2,
        borderRadius: 3,
        position: "relative",
        backgroundColor: "#EDF2F3",
      }}
      key={data._id}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.user.firstName + " " + data.user.LastName}
        subheader={data.dt}
      />
      {data.description && (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      )}
      <CardMedia
        sx={{ borderRadius: 2 }}
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
              onChange={(event)=>{
                SetComment(event.target.value)
              }}
            />
            <IconButton onClick={sendComment}>
              <Send></Send>
            </IconButton>
          </Box>
          <Box sx={{marginTop:2}}>

            {
              existingComments[0]?existingComments.map((obj)=>{


                return(<Box
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
                    sx={{ width: { md: 20, lg: 40 }, height: { md: 20, lg: 40 } }}
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
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
                    {obj.text}
                  </Box>
                </Box>)

              }):<Box
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
            }

      
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
