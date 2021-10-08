import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./styles.css";

interface Props {
  title: string;
  value: number;
  slpValue: number;
  key: number;
}

export const DashboardInfoCard = (props: Props) => {
  const { title, value, slpValue } = props;
  let slpToUsd = Math.round(value * slpValue);
  return (
    <Card className="dashboard__card--container">
      <CardContent className="dashboard__card--content">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1.5 }}>
          <span style={{ fontSize: 22, fontWeight: 500 }}>{value} </span>SLP
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          SLP to USD: {slpToUsd} USD
        </Typography>
      </CardContent>
    </Card>
  );
};
