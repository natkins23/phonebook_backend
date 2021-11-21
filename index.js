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
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
//3.13 - updated to recieve persons from mongodb server
app.get('/api/persons', (req, res, next) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
  .catch((error) => next(error))
})

//3.18 - updated get function based off info
app.get('/api/info', (req, res, next) => {
  Person.find({}).then((persons) => {
    const content = `phonebook has info for ${persons.length} people
    <br><br>
    ${new Date()}`
    res.send(content)
  })
  .catch((error) => next(error))
})

//3.18 - updated get function based on id
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

//3.14 post req - using MongoDB server
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (body.name === undefined) {
    return res.status(400).json({ error: 'name missing' })
  } else if (body.number === undefined) {
    return res.status(400).json({ error: 'number missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then((savedPerson) => {
    res.json(savedPerson)
  })
  .catch((error) => next(error))
})

//3.15 - delete using mongoDB schema
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

//3.17 post using mongoDB
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  person = { name: body.name, number: body.number }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((newPerson) => {
      res.json(newPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//3.16 -error handler middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
