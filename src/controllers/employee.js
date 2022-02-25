const Employee = require('../schemas/employee')
const Parks = require('../schemas/parks')

// fazer paginação aqui
const allEmployees = async(req, res)=>{
    try{
        const employees = await Employee.find({}).sort({"Nome": 1})
        if(!employees) return res.status(404).json({error: 'Sem funcionários'})


        const employees_ = await Employee.aggregate([
            {
                $lookup:{
                    from: 'parques',
                    let: {codParque: '$codParque'},
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$cod", "$$codParque"] }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                Nome: 1,
                                Ativo: 1
                            }
                        }
                    ],
                    as: 'parque'
                }
            },
            {
                $project: {
                    _id: 0,
                    __v: 0,
                    codParque: 0,

                }
            }

        ]).allowDiskUse(true)

        res.status(200).send(employees_)
    }catch(err){
        res.status(500).send(err.message)
    }
}

// nome, cpf
const register = async(req, res, next)=>{
    
    const {Nome, CPF, CodParque} = req.body
    
    try{
        
        if(await Employee.findOne({Nome}) || await Employee.findOne({CPF})){
            return res.status(400).json('Usuário já existente')
        }

        if(!await Parks.findOne({Cod: CodParque})) return res.status(404).json({message: 'Esse parque não existe'})

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