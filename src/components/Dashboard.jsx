import React from "react";
import axios from "axios";
import useStore from "../useStore.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Update } from "@mui/icons-material";

function Dashboard() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);

  const [nombrePais, setNombrePais] = React.useState("");

  const [pais, setPais] = React.useState([]);
  const [idPais, setIdPais] = React.useState("");

  //obtener el pais
  const getPais = async () => {
    //usa fetch con los headers de autorizacion token
    fetch("https://perfectosri.software-total.com/api/v1/pais/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPais(data.data.data);
      });
  };

  console.log(pais);

  const postPais = async () => {
    //metodo post para enviar el pasi
    fetch("https://perfectosri.software-total.com/api/v1/pais/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombrePais,
        estado: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //actualizar la tabla
        getPais();
      });
  };

  //cargar los datos en el input
  const editarPais = (id) => {
    //obtener el pais por id
    fetch(`https://perfectosri.software-total.com/api/v1/pais/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //guardar el id
        setIdPais(data.data.id_pais);
        //cargar el nombre en el input
        document.getElementById("nombre").value = data.data.nombre;
      });
  };

  //eliminar
  const eliminarPais = async (id) => {
    //metodo delete
    fetch(`https://perfectosri.software-total.com/api/v1/pais/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>{
        //actualizar la tabla
        getPais();
      });
  };

  const udatePais = () => {
    //metodo put
    fetch(`https://perfectosri.software-total.com/api/v1/pais/${idPais}/`, {
      method: "PUT",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: nombrePais,
            estado: true,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        //actualizar la tabla
        getPais();
    });
  };

  useEffect(() => {
    getPais();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* mostrar el token */}
      <p>{token}</p>
      <h1>Pais</h1>
      <input
        type="text"
        id="nombre"
        name="nombre"
        onChange={(e) => {
          setNombrePais(e.target.value);
        }}
        placeholder="Nombre"
      />
      <button onClick={postPais}>Guardar</button>
      <button onClick={udatePais} >Editar</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {pais.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.estado ? "Activo" : "Inactivo"}</td>
                <td>
                  <button onClick={() => editarPais(item.id_pais)}>
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      eliminarPais(item.id_pais);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
