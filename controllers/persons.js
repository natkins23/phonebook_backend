const personRouter = require('express').Router() //
const Person = require('../models/person')

personRouter.get('/', (req, res, next) => {
    Person.find({})
        .then(persons => {
            res.json(persons.map(person => person.toJSON()))
        })
        .catch(error => next(error))
})

personRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

personRouter.post('/', (req, res, next) => {
    const { name, number } = req.body
    if (name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }
    if (number === undefined) {
        return res.status(400).json({ error: 'number missing' })
    }
    const person = new Person({
        name,
        number,
    })
    person
        .save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

personRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

personRouter.put('/:id', (req, res, next) => {
    const { name, number } = req.body
    const person = { name, number }
    const opts = {
        new: true,
        runValidators: true,
        context: 'query',
    }
    Person.findByIdAndUpdate(req.params.id, person, opts)
        .then(newPerson => {
            res.json(newPerson)
        })
        .catch(error => next(error))
})

module.exports = personRouter
