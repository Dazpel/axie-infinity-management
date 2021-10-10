import { Backdrop } from "@mui/material";
import React, { ReactElement } from "react";
import AxieLoadingImg from "../../assets/img/axie-loading.png";
import "./styles.css";

export default function LoadingOverlay(): ReactElement {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <img src={AxieLoadingImg} style={{ maxWidth: "64px" }} className="spin" />
    </Backdrop>
  );
}
