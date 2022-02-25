const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    Nome:{
        type:String,
        required:true
    },
    CPF:{
        type:String,
        required:true
    },
    Salario:{
        type:Number,
        required:true
    },
    Admissao:{
        type:String,
        required:true
    },
    Data_Nascimento: {
        type:String,
        required:true
    },
    Ativo:{
        type: Boolean,
        required: true
    },
    codParque:{
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'Parques'
    },
    Demissao:{
        type: String
    }
})

employeeSchema.virtual('parks', {
    ref: 'Park',
    localField: 'CodParque',
    foreignField: 'Cod'
})

employeeSchema.pre('save', async function(next){
    next()
})

const Employee = mongoose.model('Funcionarios', employeeSchema)
module.exports = Employee