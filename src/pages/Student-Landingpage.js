import React, { useState, useEffect} from "react";
import { Paper, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import './Student-Landingpage.css';

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    width: `calc(100vw - 10%)`,
    height: `calc(100vh - 10%)`, // 10% less than screen width
    borderRadius: 16,
    padding: 24,
    elevation: 3,
  },
  roundedBox: {
    backgroundColor: "blue",
    borderRadius: 16,
    padding: 24,
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "normal",
  },
  segmentBox: {
    display: "flex",
    justifyContent: "space-between",
    width: 'calc(100vw - 33%)',
    height: 10,
    padding: '5px'

    
  },
  segmentHolder:{
    display:"flex",
    justifyContent:'center',
  },
  segment: {
    borderRadius: 8,
    flexGrow: 1,
    padding:'1px',
    backgroundColor: "red", 
  },
  greenSegment: {
    borderRadius: 8,
    flexGrow: 1,
    padding:'1px',
    backgroundColor: "limegreen", 
  },
  purpleSegment: {
    borderRadius: 8,
    flexGrow: 1,
    padding:'1px',
    backgroundColor: "#9b59b6", 
  },
});

function Student_Landingpage() {

  const [backgroundImage, setBackgroundImage] = useState('/bg/sec.png');

  const preloadImages = ['/bg/sec.png', '/bg/sit.png', '/bg/faculty.png'];

  useEffect(() => {
    preloadImages.forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  const handleImageChange = (newImage) => {
    setBackgroundImage(`/bg/${newImage}`);
  };

  const studname = "Srivatsan Venkatesh";
  const points = 45;
  const classes = useStyles();

  const segmentColors = () => {
    if (points > 45) {
      return ["purpleSegment", "purpleSegment", "purpleSegment"];
    } else if (points === 45) {
      return ["greenSegment", "greenSegment", "greenSegment"];
    } else if (points >= 30) {
      return ["greenSegment", "greenSegment", "segment"];
    } else if (points >= 15) {
      return ["greenSegment", "segment", "segment"];
    } else {
      return ["segment", "segment", "segment"];
    }
  };

  return (
    <div className={classes.container} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Paper className={classes.innerContainer} style = {{ minWidth:'calc(80vh) ',minHeight:'calc(80vh )'}}>
      <Paper
          className="rounded-box"
          style={{ backgroundColor: "blue", borderRadius: 16, padding: 24,backgroundImage: `url(${backgroundImage})` }}
        >
        <Typography className="welcome-text" style={{ fontSize: 32, fontWeight: "normal", color:'white' }}>
            Welcome,
          </Typography>
          <Typography className="name-text" style={{ fontSize: 48, fontWeight: "bold", color:'white' }}>
            {studname}
          </Typography>
          <br/>
          <br/>
          <Typography className="name-text" style={{ fontSize: 24, fontWeight: "bold", color:'white' }}>
            no. of intern days attended : {points}
          </Typography>
          <br/>
          <br/>
          <div style={{display:'flex', justifyContent:'center', alignSelf:'end'}}>
          <Box style={{borderRadius: 8,backgroundColor:'white',display:"flex",justifyContent:'center',   width: 'calc(100vw - 33%)',}}>
        <Box className={classes.segmentBox}>
          {segmentColors().map((color) => (
            <Box key={color} className={classes[color]} />
          ))}
        </Box>
        </Box>
        </div>
        </Paper>
        <br/>
      <Paper
          className="rounded-box"
          style={{ backgroundColor: "grey", borderRadius: 16, padding: 24 }}
        >
        <Typography className="welcome-text" style={{ fontSize: 32, fontWeight: "normal", color:'white' }}>
          News:
          </Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non consectetur a erat nam at lectus. Non quam lacus suspendisse faucibus interdum posuere lorem. Magna sit amet purus gravida quis blandit. Quis risus sed vulputate odio ut enim blandit. Purus semper eget duis at tellus at. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Montes nascetur ridiculus mus mauris vitae ultricies. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Ullamcorper morbi tincidunt ornare massa eget.
        </Paper>
      </Paper>
      
    </div>
  );
}

export default Student_Landingpage;