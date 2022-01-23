const Locations = require('../schemas/location')

const getAll = async(req, res, next)=>{
    try{
        const locations = Locations.find({}).sort({"Logradouro": 1})
        if(!locations) return res.status(200).json({message: 'Nenhuma localização encontrada'})
        res.status(200).send(locations)
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

const getId = async(req, res, next) => {
    try{
        const location = Locations.findById(req.params.id)
        if(!location) return res.status(200).json({message: 'Essa localização não existe'})
        res.status(200).send(location)
    }catch(err){
        res.status(400).json(err.message)
    }
}

// registerLocation
const registerLocation = async(req, res, next) =>{
    try{
        const {CEP} = req.body
        if(await Locations.findOne({CEP})) return res.status(200).json({message: 'Localização já existente'})

        await Locations.create(req.body)

        res.status(200).json('Localização cadastrada com sucesso')
    }catch(err){
        res.status(400).json(err.message)
    }
}

// updateLocation

// deleteLocation

module.exports = {
    getAll,
    getId,
    registerLocation
}