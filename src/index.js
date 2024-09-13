const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const moment = require("moment");

const app = express();
const port = 3000;

app.use(cors());

// Crear servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.io en el servidor HTTP
const io = socketIo(server, {
  cors: {
    origin: "*", // Reemplaza con tu dominio si es necesario
    methods: ["GET", "POST"],
    credential: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
  },
});

app.get("/", (req, res) => {
  res.json({ mensaje: "hola desde nodejs" });
  console.log("hola desde el navegador de front end");
});

// Cambiar app.listen por server.listen
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("SE CONECTO", socket.id, moment().format("hh:mm:ss"));

  socket.on("click", (imagen) => {
    console.log("hizo click ", imagen);
  });

  // Evento para manejar la desconexión del cliente
  socket.on("disconnect", () => {
    console.log("SE DESCONECTO", socket.id, moment().format("hh:mm:ss"));
  });
});
