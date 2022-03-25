const Locations = require('../schemas/location');
const Parks = require('../schemas/parks');

const getById= async(id) =>{
    const location = await Locations.find({})
        .then(result => {
            const location = result.filter(location => location._id.toString() === id.toString());
            return location[0];
        }).catch(err => console.log(err));

    return location;
}


const getAll = async(req, res, next)=>{
    try{
        const locations = await Locations.aggregate([
            {
                $project: {
                    _id: 0,
                    __v: 0
                }
            },
            {
                $sort: {
                    CEP: 1
                }
            }
        ])
        if(!locations) return res.status(200).json({message: 'Nenhuma localização encontrada'})
        res.status(200).send(locations)
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

const getId = async(req, res, next) => {
    try{
        const id = req.params.id;
        const location = await getById(id);
        if(!location) return res.status(200).json({message: 'Essa localização não existe'})
        const locationInformation = await Locations.aggregate([
            {
                $match:{
                    _id: location._id
                }
            },
            
            {
                $project: {
                    _id: 0,
                    __v: 0
                }
            }
        ])
        res.status(200).send(locationInformation);
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
const updateLocation = async(req, res, next) => {
    try{
        const id = req.params.id;
        const location = await getById(id);

        if(!location) return res.status(404).json({message: 'Localização não existente'});
        
        if(await Locations.findOne({CEP: req.body.CEP})) return res.status(400).json({message: 'Localização já existente'})

        if(await Parks.findOne({id_localizacao: location.CEP})) {
            const newCep = req.body.CEP;
            await Parks.updateOne({id_localizacao: location.CEP}, {$set: {id_localizacao: newCep}});
            
        }

        await Locations.updateOne({_id: location._id}, {$set: req.body});
        

        res.status(200).json({message: 'Localização atualizada com sucesso'});

    }catch(err){
        res.status(400).json(err.message);
    }
}

// deleteLocation

module.exports = {
    getAll,
    getId,
    registerLocation,
    updateLocation
}