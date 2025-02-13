import React from 'react'

const Filter = ({ filter, handleFilterChange }) => (
    <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
)

const Person = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => (
    <form onSumbit={addPerson}>
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

const Persons = ({ showPersons }) => (
    <div>
        {showPersons.map(person =>
            <p key={person.name}>{person.name} {person.number}</p>
        )}
    </div>
)

const PhoneBookComponents = {
    Filter,
    Person,
    Persons,
}

export default PhoneBookComponents