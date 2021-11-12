const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//3.8 - morgan - logger middleware
morgan.token('body', req => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.get('/api/persons',(req,res) =>{
  res.json(persons)
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
app.post('/api/persons', (req, res) => { 
  const person = req.body
  const nameExists = persons.find(p=>p.name === person.name)

  ////3.6 -error handling
  if(!person.name){
    return res.status(400).json({ 
      error: 'name missing' 
    })
  }
  else if  (!person.number){
    return respresonse.status(400).json({ 
      error: 'name missing' 
    })
  }else if  (nameExists){
    return res.status(400).json({ 
      error: 'name exists' 
    })
  }
  const newPerson = {
    id: generateId(),
    name: person.name,
    number: person.number
  }
  //note - if i tried to add id to the person constant, it would manipulate the req.body object.
  persons = persons.concat(newPerson)
  res.json(newPerson)
})



//3.4 - delete a resource
//Note: you need the / before api - too tired to notice i misspelled api...
app.delete('/api/persons/:id', (req, res)=>{
  const id = Number(req.params.id)
  persons = persons.filter(p=>p.id !== id)
  res.status(204).end()

})



//3.3 - Fetching a single resource
//the url directs the functionality
//here the route indicates fetching a single resource based off id
//we take the id by looking at the parameters of the request (more details on the express routing page)
//this id is a string so we make it a numberr, and compare it to all the person objects in the person array and return the matching person
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


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)