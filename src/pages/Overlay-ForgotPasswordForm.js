
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Overlay_ForgotPasswordForm = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {

    onForgotPassword();
  };

  return (
    <form>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Send Reset Link
      </Button>
    </form>
  );
};

export default Overlay_ForgotPasswordForm;
