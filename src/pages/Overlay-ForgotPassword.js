import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';

const Overlay_ForgotPassword = ({ onNext }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <Typography variant="h6">Forgot Password</Typography>
      <TextField label="Email" fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={onNext}>
        Send OTP
      </Button>
    </Paper>
  );
};

export default Overlay_ForgotPassword;
