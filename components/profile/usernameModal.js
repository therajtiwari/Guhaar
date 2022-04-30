import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Edit, RemoveRedEye, Save } from "@mui/icons-material";
import { TextField } from "@material-ui/core";

import { useMoralis } from "react-moralis";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 4,
};

const UserModal = ({ value, onChangeUsername }) => {
  const { isAuthenticated, user, Moralis } = useMoralis();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState(value);
  const handleChangeUsername = async () => {
    user.set("username", username);
    await user.save();

    handleClose();
    // re render parent component
  };
  const handleSave = () => {
    console.log(username);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <IconButton component="span">
          <Edit />
        </IconButton>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    component="span"
                    onClick={(event) => {
                      handleChangeUsername();
                      onChangeUsername(username);
                    }}
                  >
                    <Save />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal;
