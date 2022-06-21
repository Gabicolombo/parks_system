const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const config = require('../config/off.json')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha:{
        type:String,
        trim:true,
        select:false,
        required:true
    },
    funcao: {
        type: String,
        required: true
    },
    token: {
        type: String,
        select: false
    }
});

UserSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('senha')){
        user.senha = await bcryptjs.hash(user.senha, 8)
    }
    
    next();
})

const User = mongoose.model('Usuarios', UserSchema);
module.exports = User;