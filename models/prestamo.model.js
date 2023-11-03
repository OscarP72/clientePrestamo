const mongoose= require ("mongoose");

const PrestamoSchema= new mongoose.Schema({

    tipo:{type: String, required: true, trim: true},
    cantidad:{type: Number, required: true},
    amortización:{type: Number, required: true},
    interes:{type: String, required: true}
},
{
    timestamps:true,
})
const Prestamo= mongoose.model("prestamo", PrestamoSchema);

module.exports=Prestamo;