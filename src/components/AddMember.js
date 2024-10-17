import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { addMember } from "../services/api";

const AddMember = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [manager, setManager] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const member = {
        name: name,          
        position: position,  
        picture: picture? picture: null,
        manager: manager? manager: null,
    };
      await addMember(member);

      setSnackbarMessage("Member added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setName("");
      setPosition("");
      setManager("");
      setPicture(null);
    } catch (error) {
      console.error("Error adding member:", error);
      setSnackbarMessage("Failed to add member.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add New Member
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3, width: "100%" }}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Picture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Member"}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddMember;
