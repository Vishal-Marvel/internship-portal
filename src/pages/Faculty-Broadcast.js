import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Container, Typography, Paper } from '@mui/material';

function Faculty_Broadcast() {
  const [inputText, setInputText] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('/bg/faculty.png'); // state for background image, default picture is sec image

  const preloadImages = ['/bg/sec.png', '/bg/sit.png', '/bg/faculty.png'];// preloading initializxation

  useEffect(() => {
    preloadImages.forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  return (
    <div style={{ width:'100vw',height:'100vh',alignItems:'center', backgroundImage: `url(${backgroundImage})` }}>
    <Container maxWidth="sm" >
      <Paper elevation={3} sx={{fullWidth:"calc(100vw - 10px)",padding:2}}>
      <Typography variant="h1">Broadcast</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            label="Enter Text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="error" fullWidth>
            Alert
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" fullWidth>
            Info
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="success" fullWidth>
            Praise
          </Button>
        </Grid>
      </Grid>
      </Paper>
    </Container>
    </div>
  );
}

export default Faculty_Broadcast;
