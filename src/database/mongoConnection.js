const mongoose = require('mongoose')

module.exports = async()=>{
    try{
        const url = "mongodb://localhost/RedesParque";
      await mongoose.connect(url);
      console.log('Connected to database.')
    }catch(err){
        console.log(err.message())
    }
}