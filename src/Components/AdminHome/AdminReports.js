import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../Axios/axios";
import AdminReportCard from "./AdminReportCard";
function AdminReports() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("/admin/reported").then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {posts[0]
        ? posts.map((obj) => {
            return (
                <AdminReportCard data={obj}></AdminReportCard>
            );
          })
        : "No Recent Reports"}
    </Box>
  );
}

export default AdminReports;
