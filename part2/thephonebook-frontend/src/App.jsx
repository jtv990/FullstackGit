import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null)
    return null

    const style = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    border: `3px solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={style}>{message}</div>
}
  
const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, handleDelete }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id || person._id, person.name)}>delete</button>
      </li>
    ))}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        const normalized = initialPersons.map(p => ({
          ...p,
          id: p.id || p._id
        }))
        setPersons(normalized)
      })
  }, [])

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

const handleSubmit = (event) => {
  event.preventDefault()

  const existingPerson = persons.find(person => person.name === newName)

  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )

    if (confirmUpdate) {
      const updatedPerson = { ...existingPerson, number: newNumber }

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(`Information of ${newName} has already been removed from server`)
          setMessageType('error')
          setTimeout(() => setMessage(null), 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
    }

    return
  }

  const nameObject = {
    name: newName,
    number: newNumber,
  }

  personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setMessage(`Added ${newName}`)
      setMessageType('success')
      setTimeout(() => setMessage(null), 5000)
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      setMessage(error.response?.data?.error || 'An unexpected error occured')
      setMessageType('error')
      setTimeout(() => setMessage(null), 5000)
    })
}

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`)
    if (!confirm) return

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setMessage(`Deleted ${name}`)
        setMessageType('success')
        setTimeout(() => setMessage(null), 5000)
})
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />

      <Filter value={filter} onChange={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleInput}
        newNumber={newNumber}
        handleNumberChange={handleNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App

