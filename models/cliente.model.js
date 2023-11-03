const mongoose= require ("mongoose");

const ClienteShema= new mongoose.Schema({

    nombre:{type: String, required:true},
    DNI:{type: String, required: true},
    dirección:{type:String, required:true},
    prestamos:[{type: mongoose.Types.ObjectId, ref:"prestamo"}],
},
{
    timestamps:true,
});

const Cliente = mongoose.model ("cliente", ClienteShema);

module.exports= Cliente;