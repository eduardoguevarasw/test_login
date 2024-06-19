import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica para enviar un correo de recuperación de contraseña

    setEmail("");
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ minHeight: "90vh" }}
      >
        <Grid item>
          <Paper
            sx={{
              padding: "1.2rem",
              borderRadius: "1rem",
            }}
          >
            {/* boton de regresar al login   */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Regresar
              </Button>
            </Box>
            <Typography variant="h4" align="center" sx={{ mt: 1, mb: 1 }}>
              Recuperar Contraseña
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Reestablecer Contraseña
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Forgot;
