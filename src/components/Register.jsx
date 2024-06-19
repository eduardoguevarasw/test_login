import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatars from "avvvatars-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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
            {/* flecha en la izquierda para regresar */}
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

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatars
                    size={64}
                    value={formData.firstName ? formData.firstName : "HC"}
                />
            </Box>

            <Typography variant="h4" align="center" sx={{ mt: 1, mb: 1 }}>
              Registro de Usuario
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
                Por favor complete el siguiente formulario
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombres"
                    variant="outlined"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Apellidos"
                    variant="outlined"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Correo Electronico "
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Contraseña
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Contraseña"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirmar Contraseña"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
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
                    Registerse
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

export default Register;
