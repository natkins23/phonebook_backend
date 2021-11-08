const express = require('express')
const app = express()
app.use(express.json())


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

app.get('/',(req,res) =>{
  res.send('<h1>test</h1>')
})

app.get('/api/persons',(req,res) =>{
  res.json(persons)
})

app.get('/api/info',(req,res) =>{
  res.send(`<p>phonebook has info for ${persons.length} people </p> <p>${new Date()}</p>`)
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)