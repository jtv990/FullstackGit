import { useState } from 'react'

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
            <div>
                filter shown with <input value={filter} onChange={handleFilterChange} />
            </div>
            <div>debug: {filter}</div>
            <form onSubmit={addPerson}>
                <div>
                <h3>Add a new</h3>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handeNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
                <div>debug: {newName}</div>
            </form>
            <h2>Numbers</h2>
            {showPersons.map(person =>
                <p key={person.name}>{person.name} {person.number}</p>
            )}
        </div>
    )
}

export default App
