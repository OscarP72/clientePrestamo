const mongoose= require("mongoose");
const dotenv= require("dotenv");
dotenv.config();

const MONGO_URI=process.env.MONGO_URI;

const connect= async()=> {
    try {
       const db= await mongoose.connect(MONGO_URI);
       const {name, host} =db.connection;
       console.log (`Conectado a la base de datos: ${name}, en el host: ${host}`); 
    } catch (error) {
        console.log("Error al conectar a la base de datos", error);
    }
}
module.exports= connect;