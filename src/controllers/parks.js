const Parks = require('../schemas/parks')
const Locations = require('../schemas/location')

const getAll = async(req, res, next)=>{
    try{
        const parks = await Parks.find({}).sort({"Nome": 1})

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
        const park = Parks.findById(req.params.id)
        if(!park) return res.status(404).json({message: 'Esse parque não existe'})
        res.status(200).send(park)
    }catch(err){
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
        console.log(park)

        res.status(200).json('Parque cadastrado com sucesso')

    }catch(err){
        res.status(400).json(err.message)
    }
}

// updatePark

// deletePark

module.exports = {
    getAll,
    getId,
    registerPark
}