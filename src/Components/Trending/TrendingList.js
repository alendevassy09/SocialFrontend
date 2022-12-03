import { Box, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../Axios/axios";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size *
      rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}
function TrendingList() {
  const Data = [
    {
      img: "",
      title: "Breakfast",
      rows: 2,
      cols: 2,
    },
    {
      img: "",
      title: "Burger",
    },
    {
      img: "",
      title: "Camera",
    },
    {
      img: "",
      title: "Coffee",
    },
    {
      img: "",
      title: "Hats",
    },
    {
      img: "",
      title: "Honey",
      author: "@arwinneil",
    },
    {
      img: "",
      title: "Basketball",
    },
    {
      img: "",
      title: "Fern",
      rows: 2,
      cols: 2,
    },
    {
      img: "",
      title: "Mushrooms",
    },
    {
      img: "",
      title: "Tomato basil",
    },
    {
      img: "",
      title: "Sea star",
      rows: 2,
      cols: 2,
    },
    {
      img: "",
      title: "Bike",
    },
  ];
  const [itemData, setItemData] = useState([
    {
      img: "",
      title: "Breakfast",
      rows: 2,
      cols: 2,
      check: false,
    },
    {
      img: "",
      title: "Burger",
      check: false,
    },
    {
      img: "",
      title: "Camera",
      check: false,
    },
    {
      img: "",
      title: "Coffee",
      check: false,
    },
    {
      img: "",
      title: "Hats",
      check: false,
    },
    {
      img: "",
      title: "Honey",
      author: "@arwinneil",
      check: false,
    },
    {
      img: "",
      title: "Basketball",
      check: false,
    },
    {
      img: "",
      title: "Fern",
      rows: 2,
      cols: 2,
      check: false,
    },
    {
      img: "",
      title: "Mushrooms",
      check: false,
    },
    {
      img: "",
      title: "Tomato basil",
      check: false,
    },
    {
      img: "",
      title: "Sea star",
      rows: 2,
      cols: 2,
      check: false,
    },
    {
      img: "",
      title: "Bike",
      check: false,
    },
  ]);

  const token = localStorage.getItem("userToken");
  useEffect(() => {
    axios.get("/getPost", { headers: { token } }).then((response) => {
      console.log("this is the trending", response.data);
      let check = 0;
      for (let index = 0; index < response.data.length; index++) {
        for (let i = 0; i < itemData.length; i++) {
          if (!itemData[i].check) {
            console.log("yes inside");
            itemData[i].img =
              "https://res.cloudinary.com/dcytixl43/image/upload/v1667718830/" +
              response.data[index].postId +
              ".png";
            itemData[i].check = true;
            setItemData([...itemData]);
            break;
          }
        }
      }
      console.log("this the image data from post", itemData);
    });
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <ImageList
          sx={{
            width: "100%",
            height: "100%",
            "&::-webkit-scrollbar": {
              width: "5px",
            },

            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
            },
          }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {console.log("this the link to image", itemData)}
          {itemData.map((item) =>
            item.img ? (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ) : (
              ""
            )
          )}
        </ImageList>
      </Box>
    </Box>
  );
}

export default TrendingList;
