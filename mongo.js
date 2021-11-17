// //3.13 - mongo.js deprecated
// const mongoose = require('mongoose')


// if (process.argv.length < 3) {
//   console.log('To display your phonebook, please provide the password as an argument: node mongo.js <password>')
//   console.log('To save a contact, please provide the 3 arguments (a password, a name, and a number): node mongo.js <password> <name> <number>')
//   process.exit(1)
// }
// const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.nqtht.mongodb.net/phonebook?retryWrites=true&w=majority`

// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// })

// const Person = mongoose.model('Person', personSchema)

// const name = process.argv[3]
// const number = process.argv[4]
// const person = new Person({
//     name: name,
//     number: number
// })

// if (process.argv.length === 3) {
//   Person.find({}).then(result =>{
//     console.log('phonebook')
//     result.forEach(person=>{
//       console.log(person.name, person.number)
//     })
//     mongoose.connection.close()
//   })

// }

// if (process.argv.length > 3 && process.argv.length  < 5) {
//   console.log('Please provide the 3 arguments (a password, a name, and a number): node mongo.js <password> <name> <number>')
//   process.exit(1)
// }
// else if (process.argv.length === 5) {
//   person.save().then(result => {
//     console.log(`added ${name} number ${number} to phonebook`)
//     mongoose.connection.close()
//   })
// }



