import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';

const Overlay_ResetPassword = ({ onSubmit }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <Typography variant="h6">Reset Password</Typography>
      <TextField label="New Password" type="password" fullWidth margin="normal" />
      <TextField label="Confirm Password" type="password" fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit
      </Button>
    </Paper>
  );
};

export default Overlay_ResetPassword;
