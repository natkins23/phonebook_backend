//3.13 module to fetch data from mongodb server with mongoose
const mongoose = require('mongoose')
//3.19 - validation
var uniqueValidator = require('mongoose-unique-validator');


const url = process.env.MONGODB_URI

console.log(`connecting to`, url);

mongoose.connect(url).then(result=>{
    console.log(`connected to MongoDB`);
}).catch(error=>{
    console.log(`error connecting to MongoDB`, error.message);
})

//3.19 - unique required
const personSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true
    },
    number: {
      type: String
    }
  })


personSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//3.19 - add plugin
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)