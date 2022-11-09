import React from 'react'
import {  Checkbox } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
function Post(props) {

  const data=props.data
  console.log(data);
  return (
    <Card sx={{margin:{md:5},width:"100%",boxShadow:3,my:2}}>
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
      title={data.user.firstName+" "+data.user.LastName}
      subheader={data.dt}
    />
    <CardMedia
      component="img"
      
      width="100%"
      image={`https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/${data.postId}.png`}
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
      {data.description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
      <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}} />} />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
     
    </CardActions>
   
  </Card>
  )
}

export default Post
