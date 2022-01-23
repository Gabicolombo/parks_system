const Employee = require('../schemas/employee')


// fazer paginação aqui
const allEmployees = async(req, res)=>{
    try{
        const employees = await Employee.find({}).sort({"Nome": 1})
        if(!employees) return res.status(404).json({error: 'Sem funcionários'})
        res.status(200).send(employees)
    }catch(err){
        res.status(500).send(err.message)
    }
}

// nome, cpf
const register = async(req, res, next)=>{
    
    const {Nome, CPF} = req.body
    console.log(Nome)
    try{
        console.log(await Employee.findOne({Nome}))
        if(await Employee.findOne({Nome}) || await Employee.findOne({CPF})){
            return res.status(400).json('Usuário já existente')
        }
        await Employee.create(req.body)

        res.status(200).json('Funcionário cadastrado com sucesso')

    }catch(err){
        res.status(400).json('Erro no registro')
        next(err)
    }
}

const update = async(req, res, next)=>{
    const id = req.params.id
    try{
        if(!await Employee.findById(id)) return res.status(404).json('Funcionário não encontrado')

        await Employee.updateOne({_id: id}, {$set: req.body})
        res.status(200).json('Funcionário atualizado com sucesso')
    }catch(err){
        res.status(400).json('Erro ao atualizar o funcionário')
    }
}

const deleteEmployee = async(req, res, next)=>{
    try{
        const id = req.params.id
        if(! await Employee.findById(id)) return res.status(404).json('Funcionário não encontrado')
        await Employee.deleteOne({_id: id})
        res.status(200).json('Funcionário deletado com sucesso')
    }catch(err){
        res.status(400).json('Erro ao deletar o funcionário')
    }
}

module.exports={
    register,
    allEmployees,
    update,
    deleteEmployee
}