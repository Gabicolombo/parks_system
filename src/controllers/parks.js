const Parks = require('../schemas/parks')

const getAll = async(req, res, next)=>{
    try{
        const parks = Parks.find({}).sort({"Nome": 1})
        if(!parks) return res.status(200).json({message: 'Nenhum parque encontrado'})
        res.status(200).send(parks)
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

const getId = async(req, res, next) => {
    try{
        const park = Parks.findById(req.params.id)
        if(!park) return res.status(200).json({message: 'Esse parque não existe'})
        res.status(200).send(park)
    }catch(err){
        res.status(400).json(err.message)
    }
}

// registerPark -> talvez usar o $lookup para pegar a collection location

// updatePark

// deletePark

module.exports = {
    getAll,
    getId
}