
  let styles={
    container:{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      },
    ContainerMainBox:{
      width: 300,
      height: 350,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 3,
      alignItems: "center",
      boxShadow: 3,
      alignSelf: "center",
      marginTop: 3,
      borderRadius: "16px",
    },
    LockIconBox:{
      boxShadow: 3,
      width: 100,
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      textAlign: "center",
      backgroundColor: "#9adcfb",
    },
    TextBox:{
      width: 300,
      display: "flex",
      justifyContent: "space-between",
      marginTop: 3,
    },
    TextBoxQuestion:{
      color: "#005ecb",
      textDecoration: "underline",
      cursor: "pointer",
    },
    googleIcon:{
      boxShadow: 2,
      marginTop: 2,
      backgroundColor: "#f50057",
      "&:hover": {
        backgroundColor: "#ab003c",
        color: "#3c52b2",
      },
    }

  }
  export default styles