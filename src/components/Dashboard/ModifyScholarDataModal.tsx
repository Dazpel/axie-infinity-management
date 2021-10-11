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
import { createNewScholar, updateScholarData } from "../../utils/functions";
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

type scholarData = {
  index: number;
  id: string;
};

interface Props {
  scholarData: any;
  index: number;
  openModal: boolean;
  handleModalClose: () => void;
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
  scholarsStateObj: any[];
}

export const ModifyScholarDataModal = (props: Props) => {
  const {
    openModal,
    handleModalClose,
    index,
    scholarData,
    setRows,
    scholarsStateObj,
  } = props;
  const [roninError, setRoninError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [localScholarData, setLocalScholarData] = React.useState({
    id: scholarData.id,
    name: scholarData.name,
    roninAddress: scholarData.roninAddress,
    payoutAddress: scholarData.payoutAddress,
    managerShare: scholarData.managerShare.percentage,
  });
  const [scholar_share, setScholar_share] = React.useState(
    scholarData.scholarShare.percentage
  );

  const handleOnDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocalScholarData({
      ...localScholarData,
      [event.target.name]: event.target.value,
    });
  };

  const handleShareChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setScholar_share(100 - Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //check if provided string is in a ronin format otherwise, return error
    const roningAddress = localScholarData.payoutAddress.toString();
    if (!roningAddress?.match("ronin:")) {
      return setRoninError(true);
    } else {
      setRoninError(false);
    }

    let scholarData = {
      ...localScholarData,
      name: data.get("name"),
      payoutAddress: data.get("payoutAddress"),
      managerShare: {
        slp: scholarsStateObj[index].managerShare.slp,
        percentage: Number(data.get("managerShare")),
      },
      scholarShare: {
        slp: scholarsStateObj[index].scholarShare.slp,
        percentage: Number(scholar_share),
      },
    };

    let res = await updateScholarData(scholarData);

    if (!res.success) {
      return setErrorMessage(res.message);
    }

    let newState = {
      ...scholarsStateObj[index],
      ...scholarData,
    };

    setRows({
      ...scholarsStateObj,
      [scholarsStateObj[index]]: { ...newState },
    });

    handleModalClose();
  };

  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
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
            id="payout"
            label="Payout address"
            name="payoutAddress"
            onChange={handleOnDataChange}
            autoFocus
            placeholder="ronin:8087c5b601da59e60bfee4a9e3d0b6a1e2c6c8ec"
            helperText={
              roninError
                ? "Invalid ronin address, must start with 'ronin: '"
                : "Here you can save your scholar's payout address"
            }
            error={roninError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={localScholarData.name}
            onChange={handleOnDataChange}
            name="name"
            label="Scholar name"
            id="scholarName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            defaultValue={localScholarData.managerShare}
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
          <TextField
            margin="normal"
            type="number"
            fullWidth
            name="roninAddress"
            label={localScholarData.roninAddress}
            helperText="*Account ronin address"
            id="ronin"
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
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
