import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

interface props {
  open: boolean;
  handleClose: () => void;
}

export default function CustomBackDrop(props: props) {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
        open={props.open}
        onClick={props.handleClose}
      />
    </div>
  );
}
