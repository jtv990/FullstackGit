import { useState } from 'react'
import PhoneBookComponents from './components/puhelinluettelo_components'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '123-456' },
        {name: 'Pekka Puu', number: '234-567' },
        {name: 'Ismo Laitela', number: '555-555'}

    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handeNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if(persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        event.preventDefault()
        if(persons.some(person => person.number === newNumber)){
            alert(`${newNumber} is already added to phonebook`)
            return
        }
        const newPerson = { name: newName, number: newNumber }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }

    let showPersons
    if (filter === '') {
        showPersons = persons
    } else {
        showPersons = persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase())
        )
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <PhoneBookComponents.Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h3>Add a new</h3>
            <PhoneBookComponents.Person
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handeNumberChange}
                addPerson={addPerson}
            />
            <h3>Numbers</h3>
            <PhoneBookComponents.Persons showPersons={showPersons} />
            </div>
    )
}

export default App
