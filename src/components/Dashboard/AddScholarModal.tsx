import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import {
  ManagerState,
  updateManagerScholarsArray,
} from "../store/slices/managerSlice";
import { createNewScholar } from "../../utils/functions";
import { useAppDispatch } from "../store/hooks";
import AddIcon from "@mui/icons-material/Add";

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface props {
  managerState: ManagerState;
}

export default function AddScholarModal(props: props) {
  const [open, setOpen] = React.useState(false);
  const [scholar_share, setScholar_share] = React.useState(100);
  const [roninError, setRoninError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setScholar_share(100);
    setRoninError(false);
    setErrorMessage(null);
    setOpen(false);
  };

  const handleShareChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setScholar_share(100 - Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const roningAddress = data?.get("ronin")?.toString();
    if (!roningAddress?.match("ronin:")) {
      return setRoninError(true);
    } else {
      setRoninError(false);
    }

    let scholarData = {
      name: data.get("scholarName"),
      axie_roninAddress: data.get("ronin"),
      manager_share: Number(data.get("managerShare")),
      scholar_share,
    };

    let res = await createNewScholar(scholarData, props.managerState.uid);
    if (!res.success) {
      return setErrorMessage(res.message);
    }
    dispatch(updateManagerScholarsArray(res.scholarId));
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
        Add new scholar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "absolute", ...style }}>
          <Box
            component="form"
            className="scholar_form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="ronin"
              label="Ronin address"
              name="ronin"
              autoFocus
              placeholder="ronin:8087c5b601da59e60bfee4a9e3d0b6a1e2c6c8ec"
              helperText={
                roninError
                  ? "Invalid ronin address, must start with 'ronin: '"
                  : ""
              }
              error={roninError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="scholarName"
              label="Scholar name"
              id="scholarName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              defaultValue={0}
              onChange={handleShareChange}
              name="managerShare"
              label="Manager share"
              id="managerShare"
            />
            <TextField
              margin="normal"
              type="number"
              value={scholar_share}
              fullWidth
              name="scholarShare"
              label="Scholar Share"
              id="scholarShare"
              helperText="This is calculated automatically"
              disabled
            />
            {errorMessage && (
              <Typography variant="body2" style={{ color: "red" }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              className="signIn_btn"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
