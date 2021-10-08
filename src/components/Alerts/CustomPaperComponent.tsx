import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface props {
  children: React.ReactNode;
}

export default function CustomPaperComponent(props: any) {
  console.log(props);

  return (
    <Box>
      <Paper elevation={8}>{props.children}</Paper>
    </Box>
  );
}
