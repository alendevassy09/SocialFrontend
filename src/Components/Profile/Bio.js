import {
  AddCircle,
  Cancel,
  CheckCircle,
  Delete,
  Edit,
  Home,
  School,
  Work,
} from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "../../Axios/axios";

function Bio(props) {
  const token = localStorage.getItem("userToken");

  let data = props.data;
  //const [work, setWork] = useState(props.data.bio !== undefined ? false : true);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  function addBio(data) {
    if (text !== "") {
      axios
        .post("/addBio", data, { headers: { token: token } })
        .then((response) => {
          setText(Object.values(data)[0]);
          setCheck(true);
          setAdd(false);
        });
    }
  }
  // function deleteBio() {
  //   if (text !== "") {
  //     axios
  //       .delete("/deleteBio", { headers: { token: token } })
  //       .then((response) => {});
  //   }
  // }
  function editBio(data) {
    if (text !== "") {
      axios
        .post("/editBio", data, { headers: { token: token } })
        .then((response) => {
          setText(Object.values(data)[0]);
          setCheck(true);
          setEdit(false);
        });
    }
  }
 function deletebio(data){
  axios
  .patch("/deleteBio", data, { headers: { token: token } })
  .then((response) => {
    setText('');
    setCheck(false);
    setEdit(false);
  });
 }

  return (
    <Box display={"flex"} alignItems={"center"} width="100%">
      {props.data.bio || check ? (
        !edit ? (
          <Box
            display={"flex"}
            sx={{
              border: "none",
              borderColor: "skyblue",
              borderRadius: 2,
              paddingX: 1,
            }}
          >
            {data.live && (
              <Home fontSize="small" sx={{ color: "grey" }}></Home>
            )}
            {data.study && (
              <School fontSize="small" sx={{ color: "grey" }}></School>
            )}
            {data.work && (
              <Work fontSize="small" sx={{ color: "grey" }}></Work>
            )}
            {data.live && (
              <Typography sx={{ marginTop: "auto" }}>
                <b>Lives At {check ? ":" + text : ":" + props.data.bio}</b>
                {/* {":" + data.bio} */}
              </Typography>
            )}
            {data.study && (
              <Typography sx={{ marginTop: "auto" }}>
                <b>Studied At {check ? ":" + text : ":" + props.data.bio}</b>
              </Typography>
            )}
            {data.work && (
              <Typography sx={{ marginTop: "auto" }}>
                <b>Works At {check ? ":" + text : ":" + props.data.bio}</b>
              </Typography>
            )}
          </Box>
        ) : (
          <Box display={"flex"} width="80%">
            <TextField
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              id="outlined-size-small"
              size="small"
              fullWidth
            />
          </Box>
        )
      ) : !add ? (
        <Box
          display={"flex"}
          sx={{
            border: "dotted",
            borderColor: "skyblue",
            borderRadius: 2,
            paddingX: 1,
            width: "100%",
          }}
        >
          {data.live && <Home fontSize="small" sx={{ color: "grey" }}></Home>}
          {data.study && (
            <School fontSize="small" sx={{ color: "grey" }}></School>
          )}
          {data.work && <Work fontSize="small" sx={{ color: "grey" }}></Work>}
          {data.live && (
            <Typography sx={{ marginTop: "auto" }}>
              <b>Lives At</b>
            </Typography>
          )}
          {data.study && (
            <Typography sx={{ marginTop: "auto" }}>
              <b>Studied At</b>
            </Typography>
          )}
          {data.work && (
            <Typography sx={{ marginTop: "auto" }}>
              <b>Works At</b>
            </Typography>
          )}
        </Box>
      ) : (
        <Box display={"flex"} width="80%">
          <TextField
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            id="outlined-size-small"
            size="small"
            fullWidth
          />
        </Box>
      )}

      {props.data.bio || check ? (
        !edit ? (
          <Box display={"flex"} flexDirection="row">
            <Delete
            onClick={() => {
              
              if (data.live) {
                deletebio({ liveAt: '' });
              } else if (data.work) {
                deletebio({ worksAt: '' });
              } else {
                deletebio({ studiedAt: '' });
              }
              // setCheck(true)
            }}
            fontSize="medium"
            sx={{ color: "skyblue", cursor: "pointer" }}
          ></Delete>
             <Edit
            onClick={() => {
              setEdit(true);
              // setCheck(true)
            }}
            fontSize="medium"
            sx={{ color: "skyblue", cursor: "pointer" }}
          ></Edit>
          </Box>
         
        ) : (
          <Box display={"flex"}>
            <Cancel
              onClick={() => {
                setEdit(false);
                //setCheck(true)
              }}
              fontSize="large"
              sx={{ color: "skyblue", cursor: "pointer" }}
            ></Cancel>
            <CheckCircle
              onClick={() => {
                if (data.live) {
                  editBio({ liveAt: text });
                } else if (data.work) {
                  editBio({ worksAt: text });
                } else {
                  editBio({ studiedAt: text });
                }
              }}
              fontSize="large"
              sx={{ color: "skyblue", cursor: "pointer" }}
            ></CheckCircle>
          </Box>
        )
      ) : !add ? (
        <AddCircle
          onClick={() => {
            setAdd(true);
          }}
          fontSize="large"
          sx={{ color: "skyblue", cursor: "pointer" }}
        ></AddCircle>
      ) : (
        <Box display={"flex"}>
          <Cancel
            onClick={() => {
              setAdd(false);
            }}
            fontSize="large"
            sx={{ color: "skyblue", cursor: "pointer" }}
          ></Cancel>
          <CheckCircle
            onClick={() => {
              if (data.live) {
                addBio({ liveAt: text });
              } else if (data.work) {
                addBio({ worksAt: text });
              } else {
                addBio({ studiedAt: text });
              }
            }}
            fontSize="large"
            sx={{ color: "skyblue", cursor: "pointer" }}
          ></CheckCircle>
        </Box>
      )}
    </Box>
  );
}

export default Bio;
