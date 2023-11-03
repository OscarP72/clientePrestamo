const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connect = require("./utils/db");

const Prestamo = require("./models/prestamo.model");
const Cliente = require("./models/cliente.model");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

connect();

const router = express.Router();

router.get("/prestamos", async (req, res) => {
  try {
    const prestamos = await Prestamo.find();
    return res.status(200).json(prestamos);
  } catch (error) {
    return res.status(404).json("Prestamo no encontrado", error);
  }
});

router.get("/prestamos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prestamo = await Prestamo.findById(id);
    return res.status(200).json(prestamo);
  } catch (error) {
    return res.status(404).json("Prestamo no encontrado");
  }
});

router.get("/prestamos/optimum", async (req, res) => {
  try {
    const prestamos = await Prestamo.find({ cantidad: { $gt: 100000 } });
    return res.status(200).json(prestamos);
  } catch (error) {
    return res.status(404).json("Prestamo no encontrado");
  }
});

router.get("/search/:tipo", async (req, res) => {
  try {
    const { tipo } = req.params;
    const prestamo = await Prestamo.findOne({ tipo: tipo }).populate(
      "prestamos"
    );
    return res.status(200).json(prestamo);
  } catch (error) {
    return res.status(404).json("Prestamo no encontrado", error);
  }
});

router.get("/prestamos/ordered", async (req, res)=>{
    try {
        const prestamos = await Prestamo.find().sort({cantidad: 1});
        return res.status(200).json(prestamos);
    } catch (error) {
        return res.status (404).json("Prestamo no encontrado");
    }
})

router.get("/clientes", async (req, res) => {
  try {
    const cliente = await Cliente.find().populate("prestamos");
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(404).json("Cliente no encontrado", error);
  }
});

router.get("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(404).json("Cliente no encontrado", error);
  }
});

router.post("/prestamos", async (req, res) => {
  try {
    const newPrestamo = new Prestamo(req.body);
    await newPrestamo.save();
    return res.status(201).json(newPrestamo);
  } catch (error) {
    return res.status(500).json("Fallo al crear el prestamo", error);
  }
});

router.post("/clientes", async (req, res) => {
  try {
    const newCliente = new Cliente(req.body);
    await newCliente.save();
    return res.status(201).json(newCliente);
  } catch (error) {
    return res.status(500).json("Fallo al crear el cliente", error);
  }
});
router.delete("/prestamos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Prestamo.findByIdAndDelete(id);
    return res.status(200).json("Prestamo borrado");
  } catch (error) {
    return res.status(500).json("Error al borrar prestamo");
  }
});

router.delete("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    return res.status(200).json("Cliente borrado");
  } catch (error) {
    return res.status(500).json("Error al borrar cliente");
  }
});

router.patch("/prestamos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newPrestamo = new Prestamo(req.body);
    newPrestamo._id = id;
    await Prestamo.findByIdAndUpdate(id, newPrestamo);
    return res.status(200).json(newPrestamo);
  } catch (error) {
    return res.status(500).json("Error al modificar el prestamo");
  }
});
router.patch("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newCiente = new Cliente(req.body);
    newCiente._id = id;
    await Cliente.findByIdAndUpdate(id, newCiente);
    return res.status(200).json(newCiente);
  } catch (error) {
    return res.status(500).json("Error al modificar un cliente");
  }
});

server.use("/", router);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});
