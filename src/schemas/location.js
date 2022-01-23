const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    UF:{
        type: String,
        required: true
    },
    CEP:{
        type: String,
        unique: true,
        required: true // fazer uma validação com o número exato
    },
    Cidade: {
        type: String,
        required: true
    },
    Logradouro: {
        type: String,
        required: true
    },
    Numero: {
        type: Number,
        required: true
    },
    Complemento: {
        type: String,
        required: true
    }
})

locationSchema.pre('save', async function(next){
    next()
})

const Location = mongoose.model('Localizações', locationSchema)
module.exports = Location