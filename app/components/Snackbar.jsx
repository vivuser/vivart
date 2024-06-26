"use client"
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../redux/slices/commonSlice';

export default function AutohideSnackbar() {
  const dispatch = useDispatch();
  const { isOpen, autoHideDuration, content } = useSelector((state) => state.common.snackbar)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        message={content}
      />
    </div>
  );
}