const bcryptjs = require('bcryptjs');

class User {

    constructor(email, senha, funcao){
        this.email = email,
        this.senha = senha,
        this.funcao = funcao
    }

    static comparePassword(senha){
        return await bcryptjs.compare(this.senha, senha);
    }

}


module.exports = User;