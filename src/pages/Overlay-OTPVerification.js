import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';

const Overlay_OTPVerification = ({ onConfirm, onResend }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <Typography variant="h6">Verify OTP</Typography>
      <TextField label="OTP" fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={onConfirm}>
        Confirm
      </Button>
      <Button variant="outlined" color="primary" onClick={onResend} style={{ marginTop: '10px' }}>
        Resend OTP
      </Button>
    </Paper>
  );
};

export default Overlay_OTPVerification;
