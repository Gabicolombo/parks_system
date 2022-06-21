const User = require('../schemas/user');
const UserService = require('../services/User');
// informacao do usuario

const getInformation = async(req, res, next => {

})
// login

// atualizarSenha

// cadastro
const register = async(req, res, next => {
    try{
        const {email} = req.body;

        if(await User.findOne({email: email})) return res.status(200).json({message: 'Esse email já está cadastrado'});

        await User.create(req.body);
        

        res.status(200).json({message: 'Usuário cadastrado com sucesso'});


    }catch (e){
        console.log(e.message)
        res.status(500).json({message: 'Erro ao cadastrar'});
    }
})

module.exports = {
    getInformation,
    register
}

