import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ExtendButtonBase, IconButtonTypeMap } from "@mui/material";
import CustomBackDrop from "./CustomBackDrop";
import CustomPaperComponent from "./CustomPaperComponent";

interface props {
  children: React.ReactNode;
  alertTitle: string;
  alertText: string;
  open: boolean;
  handleClose: () => void;
  onDeleteFunction: () => Promise<void>;
}

export default function DeleteAlert(props: props) {
  const {
    onDeleteFunction,
    handleClose,
    alertTitle,
    alertText,
    open,
    children,
  } = props;

  return (
    <span>
      {children}
      <Dialog
        BackdropComponent={() => (
          <CustomBackDrop open={open} handleClose={handleClose} />
        )}
        PaperProps={{
          //   sx: { boxShadow: "none" },
          elevation: 10,
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteFunction}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
