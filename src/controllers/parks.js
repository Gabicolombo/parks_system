const Parks = require('../schemas/parks')
const Locations = require('../schemas/location')

const getAll = async(req, res, next)=>{
    try{
        const parks = await Parks.find({})

        if(!parks) return res.status(404).json({message: 'Nenhum parque encontrado'})
        const parks_ = await Parks.aggregate([
            {
                $lookup:{
                    from: 'localizações',
                    let: {id_localizacao: '$id_localizacao'},
                    pipeline:[
                        {
                            $match: {$expr: {
                                $eq: ["$CEP", "$$id_localizacao"]
                            }}
                        },
                        {
                            $project:{
                                _id: 0,
                                Cidade: 1,
                                Numero: 1,
                                CEP: 1, 
                            }
                        }
                    ],
                    as: 'localizacao'
                }
            },
            {
                $project:{
                    _id: 0,
                    __v: 0,
                    Ativo: 0,
                    id_localizacao: 0
                }
            },
            {
                $lookup:{
                    from: 'funcionarios',
                    let: {cod: '$cod'},
                    pipeline:[
                    {
                        $match: {$expr: {
                        $eq: ["$codParque", "$$cod"]
                        }}
                    },
                    
                    {
                        $group:{
                        _id: '$$cod',
                        count: {$sum: 1}
                        }
                    }
                    ],
                    as: 'NumFuncionarios'
                }
            }
            
           
        ]).allowDiskUse(true)

        return res.status(200).json(parks_)
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
}
// ver o pipeline aqui
const getId = async(req, res, next) => {
    try{
        const id = req.params.id
        
        if(!await Parks.findOne({cod: id})) return res.status(404).json({message: 'Esse parque não existe'})

        const park = await Parks.aggregate([
            {
                $match:{
                    cod: id
                }
            },
            {
                $lookup:{
                    from: 'localizações',
                    let: {id_localizacao: '$id_localizacao'},
                    pipeline:[
                        {
                            $match: {$expr: {
                                $eq: ["$CEP", "$$id_localizacao"]
                            }}
                        },
                        {
                            $project:{
                                _id: 0,
                                Cidade: 1,
                                Numero: 1,
                                CEP: 1, 
                            }
                        }
                    ],
                    as: 'localizacao'
                }
            },
            {
                $project: {
                    _id: 0,
                    __v: 0,
                    id_localizacao: 0
                }
            },
            {
                $lookup:{
                    from: 'funcionarios',
                    let: {cod: '$cod'},
                    pipeline:[
                    {
                        $match: {$expr: {
                        $eq: ["$codParque", "$$cod"]
                        }}
                    },
                    
                    {
                        $group:{
                        _id: '$$cod',
                        count: {$sum: 1}
                        }
                    }
                    ],
                    as: 'NumFuncionarios'
                }
            }
        ]).allowDiskUse(true)
        res.status(200).send(park)
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

// registerPark -> talvez usar o $lookup para pegar a collection location
const registerPark = async(req, res, next)=>{
    try{
        const {id_localizacao} = req.body
        console.log(await Locations.findOne({CEP: id_localizacao}))
        if(await Locations.findOne({CEP: id_localizacao}) == null) return res.status(404).json({message: 'Localização não existente'})
        if(await Parks.findOne({id_localizacao: req.body.id_localizacao})) return res.status(400).json({message: 'Já existe um parque nessa localização'})
   
        const park = await Parks.create(req.body)

        res.status(200).json('Parque cadastrado com sucesso')

    }catch(err){
        res.status(400).json(err.message)
    }
}

// updatePark
const updatePark = async(req, res, next)=>{
    try{
        const id = req.params.id
     
        if(!await Parks.findOne({id_localizacao: id})) return res.status(404).json({message: 'Não encontrei nenhum Parque em meus registros'})

        if(req.body && req.body.id_localizacao){
            if(!await Locations.findOne({CEP: req.body.id_localizacao})) return res.status(200).json({message: 'Essa localização é inexistente'})
            if(await Parks.findOne({id_localizacao: req.body.id_localizacao})) return res.status(200).json({message: 'Já existe um parque nesse endereço'})
        }

        await Parks.updateOne({CEP: id}, {$set: req.body})
        
        return res.status(200).json({message: 'Parque atualizado com sucesso'})

    }catch(err){
        console.log(err.message)
        res.status(400).json({message: 'Não foi possível atualizar esse Parque'})
    }
}
// deletePark

const deletePark = async(req, res, next) => {
    try{
        const id = req.params.id

        if(!await Parks.findOne({Cod: id})) return res.status(404).json({message: 'Não foi encontrado nenhum Parque'})

        await Parks.deleteOne({Cod: id})

        res.status(200).json({message: 'Parque deletado com sucesso'})

    }catch(err){
        console.log(err.message)
        res.status(400).json({message: 'Erro ao deletar o Parque'})
    }
}

module.exports = {
    getAll,
    getId,
    registerPark,
    updatePark,
    deletePark
}