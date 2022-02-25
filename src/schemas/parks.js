const mongoose = require('mongoose')

const parkSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true
    },
    cod:{
        type:  mongoose.Schema.Types.String,
        required: true,
        ref: 'Parques'
    },
    Ativo: {
        type: Boolean,
        required: true
    },
    Horario_Abertura:{
        type: String, // ver se o que seria melhor
        required: true
    },
    Horario_encerramento:{
        type: String,
        required: true
    },
    Data_Abertura:{
        type: String,
        required: true
    },
    id_localizacao: {
       type: mongoose.Schema.Types.String,
       required: true,
       unique: true,
       ref: 'localizacao'
    }
})

parkSchema.pre('save', async function(next){
    next()
})

const Park = mongoose.model('Parques', parkSchema)
module.exports = Park