// src/components/Login.js
import React from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Avvvatars from "avvvatars-react";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    forzar: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    ///usa fetch para hacer la peticion post
    e.preventDefault();
    axios
      .post("https://perfectosri.software-total.com/api/v1/login/", FormData)
      .then((response) => {
        //guardar el toke id y la opcion boleana de forzar en cookie
        const token = response.data.token;
        const force = response.data.force;
        document.cookie = `token=${token}`;
        document.cookie = `force=${force}`;
        //redirigir a la pagina de inicio
        window.location.href = "/";
      })
      .catch((error) => {
        // alert(error.response.data.message);
        const statusCode = error.response.data.code;
        switch (statusCode) {
          case 400:
            setError("Contraseña incorrecta");
            break;
          case 401:
            setError("Campos requeridos no enviados");
            break;
          case 402:
            setError("Existe otro token activo");
            handleOpenModal();
            break;
          case 403:
            setError("Usuario bloqueado");
            break;
          case 404:
            setError("Usuario no encontrado");
            break;
          default:
            setError("Error desconocido");
            break;
        }
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const navigate = useNavigate();

  const handleForceLogin = () => {

    //enviar los mismos datos pero con la opcion de forzar=true
    axios.post("https://perfectosri.software-total.com/api/v1/login/", {
      username: FormData.username,
      password: FormData.password,
      forzar: true,
    })
    .then((response) => {
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");

    })
    handleCloseModal();
  };

  return (
    <>
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
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avvvatars
                  size={64}
                  value={FormData.username ? FormData.username : "HC"}
                />
              </Box>
              <Typography variant="h4" align="center" sx={{ mt: 1, mb: 1 }}>
                Iniciar Sesión
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  error={error ? true : false}
                  fullWidth
                  type="text"
                  label="Usuario"
                  name="username"
                  onChange={handleChange}
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                />
                {/* olvidaste la Contraseña? */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      window.location.href = "/forgot";
                    }}
                  >
                    Olvidaste la Contraseña?
                  </Button>
                </Box>

                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  error={error ? true : false}
                  name="password"
                  label="Password"
                  id="outlined-adornment-password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 3, mb: 1.5 }}
                >
                  {" "}
                  Iniciar Sesión
                </Button>
              </Box>

              <hr></hr>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body2">
                  ¿No tienes una cuenta? Regístrate{" "}
                </Typography>

                <Link to="/register" variant="body2">
                  Aquí
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" id="modal-title" gutterBottom>
              ¿Desea forzar el inicio de sesión?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleForceLogin}
            >
              Sí
            </Button>
            <Button onClick={handleCloseModal}>No</Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Login;
