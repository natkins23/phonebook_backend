//3.13 - dotenv added / Person model imported

//requiring dotenv allows us to reference enviornment variables when creating a Person model
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { json } = require('express')


const app = express()

//3.8 - morgan - logger middleware
morgan.token('body', req => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/',(req,res) =>{
  res.send('<h1>Hello World!</h1>')
})

//3.13 - updated to recieve persons from mongodb server
app.get('/api/persons',(req,res) =>{
  Person.find({}).then(persons=>{
  res.json(persons)
})
})

app.get('/api/info',(req,res) =>{
  res.send(`<p>phonebook has info for ${persons.length} people </p> <p>${new Date()}</p>`)
})


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

//3.5 - Post request - adding entries - increment ids
//3.5 post - deprecated
// app.post('/api/persons', (req, res) => { 
//   const person = req.body
//   const nameExists = persons.find(p=>p.name === person.name)

//   ////3.6 -error handling
//   if(!person.name){
//     return res.status(400).json({ 
//       error: 'name missing' 
//     })
//   }
//   else if  (!person.number){
//     return respresonse.status(400).json({ 
//       error: 'name missing' 
//     })
//   }else if  (nameExists){
//     return res.status(400).json({ 
//       error: 'name exists' 
//     })
//   }
//   const newPerson = {
//     id: generateId(),
//     name: person.name,
//     number: person.number
//   }
//   //note - if i tried to add id to the person constant, it would manipulate the req.body object.
//   persons = persons.concat(newPerson)
//   res.json(newPerson)
// })//end of post

//3.14 post req - using MongoDB server
app.post('/api/persons', (req, res) => { 
  const body = req.body
  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }else if (body.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  }
  const person = new Person({
    name: req.body.name,
    number: req.body.number
})
  person.save().then(savedPerson=>{
    res.json(savedPerson);
  })
})

//3.15 - delete using mongoDB schema
app.delete('/api/persons/:id', (req, res)=>{
  Person.findByIdAndRemove(req.params.id).then(result=>{
    res.status(204).end()
  }).catch(error=>{
    //using 3.16 errorHandling middleware
    next(error)
  })
})

app.get('/api/persons/:id',(req,res) =>{
  const id = req.params.id
  const person = persons.find(person=>person.id === Number(id))
  if (person) res.json(person)
  else res.status(404).end()
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)