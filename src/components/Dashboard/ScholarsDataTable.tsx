import React, { useEffect, useState } from "react";
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
import { fetchScholarAccountData } from "../../utils/functions";
import { Button, Skeleton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteAlert from "../Alerts/DeleteAlert";

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

function SkeletonRows() {
  return (
    <React.Fragment>
      {[...Array(5).keys()].map((el, index) => {
        return (
          <TableRow key={index}>
            <TableCell colSpan={8}>
              <Skeleton animation="wave" />
            </TableCell>
          </TableRow>
        );
      })}
    </React.Fragment>
  );
}

interface props {
  scholarIdArray?: string[];
}

export default function ScholarsDataTable(props: props) {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    let isMounted: Boolean = true;

    if (isMounted) {
      const populateRowDataFunction = async (dataArray: string[]) => {
        let scholarDataObject: any[] = [];
        for (let index = 0; index < dataArray.length; index++) {
          const scholarId = dataArray[index];
          try {
            let res = await fetchScholarAccountData(scholarId);
            if (res?.success) scholarDataObject.push(res?.data);
          } catch (error) {
            throw error;
          }
        }
        setRows(scholarDataObject);
        setIsLoading(false);
      };
      if (props?.scholarIdArray) populateRowDataFunction(props?.scholarIdArray);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnDelete = (id: string) => {
    console.log("deleting user");
    handleClickClose();
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const onActionClick = (id: string, action: string) => {
    console.log(id, action);
  };

  return (
    <TableContainer component={Paper} style={{ marginBottom: "2rem" }}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
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
          {isLoading
            ? SkeletonRows()
            : rows.map((row, i) => (
                <React.Fragment key={i}>
                  <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.slpAverage}</TableCell>
                    <TableCell align="center">{row.unclaimedSlp}</TableCell>
                    <TableCell align="center">0</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                    <TableCell align="center">{row.lastClaimedDays}</TableCell>
                    <TableCell align="center">
                      {row.managerShare.slp} ({row.managerShare.percentage}%)
                    </TableCell>
                    <TableCell align="center">
                      {row.scholarShare.slp} ({row.scholarShare.percentage}%)
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => onActionClick(row.id, "details")}
                      >
                        More details
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip
                        sx={{ fontSize: 14 }}
                        title={`Edit details of ${row.name}`}
                      >
                        <IconButton
                          color="info"
                          aria-label="edit scholar"
                          component="span"
                          onClick={() => onActionClick(row.id, "edit")}
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </Tooltip>
                      /
                      <DeleteAlert
                        alertText="You are about to delete this scholar, do you want to continue?"
                        alertTitle="Delete scholar?"
                        handleClose={handleClickClose}
                        onDeleteFunction={() => handleOnDelete(row.id)}
                        open={open}
                      >
                        <Tooltip title={`Delete ${row.name}`}>
                          <IconButton
                            color="error"
                            aria-label="delete scholar"
                            component="span"
                            onClick={handleClickOpen}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </DeleteAlert>
                    </TableCell>
                  </StyledTableRow>
                </React.Fragment>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
