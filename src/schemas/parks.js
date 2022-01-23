const mongoose = require('mongoose')

const parkSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true
    },
    Ativo: {
        type: Boolean,
        required: true
    },
    Horario_Abertura:{
        type: Date, // ver se o que seria melhor
        required: true
    },
    Horario_encerramento:{
        type: Date,
        required: true
    },
    Data_Abertura:{
        type: Date,
        required: true
    },
    Id_localizacao: {
        type: Number,
        unique: true,
        required:true
    }
})

parkSchema.pre('save', async function(next){
    next()
})

const Park = mongoose.model('Parques', parkSchema)
module.exports = Park