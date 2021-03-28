import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const CustomAlert = props => {
  const [open, setOpen] = useState(false);
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={4000}
      onClose={props.handleClose}
    >
      <Alert onClose={props.handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};
