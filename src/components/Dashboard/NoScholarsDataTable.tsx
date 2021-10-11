import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  deleteOneScholar,
  fetchScholarAccountData,
} from "../../utils/functions";
import { Button, Skeleton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteAlert from "../Alerts/DeleteAlert";
import { updateManagerScholarsArray } from "../store/slices/managerSlice";
import { useAppDispatch } from "../store/hooks";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black, //#11131B  for black
    color: theme.palette.common.white, //##FFFFFF  for white
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 50,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function NoScholarsDataTable() {
  return (
    <TableContainer component={Paper} style={{ marginBottom: "2rem" }}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={1}>
              Scholar
            </StyledTableCell>
            <StyledTableCell align="center" colSpan={5}>
              SLP
            </StyledTableCell>
            <StyledTableCell align="center" colSpan={2}>
              SLP Split
            </StyledTableCell>
            <StyledTableCell align="center" colSpan={2}>
              Actions
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Average</StyledTableCell>
            <StyledTableCell align="center">Unclaimed</StyledTableCell>
            <StyledTableCell align="center">Claimed</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center">Last claim (days)</StyledTableCell>
            <StyledTableCell align="center">Manager</StyledTableCell>
            <StyledTableCell align="center">Scholar</StyledTableCell>
            <StyledTableCell align="center">Details</StyledTableCell>
            <StyledTableCell align="center">Modify/Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell align="center" component="th" scope="row" colSpan={12}>
              No data
            </TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
