import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import nameService from './services/names'
import './index.css'


const Filter = (props) =>{
    return (
        <div>
        filter shown with: <input
                                value={props.filter}
                                onChange={props.handleFilter}/>
        </div>
    )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const NameForm = (props) => {
    return(
        <div>
        name: <input 
                value = {props.newName}
                onChange= {props.handleNewName} />
        number: <input
                value = {props.newNumber}
                onChange= {props.HandleNewNumber} />
      </div>
    )
}

const Name = (props) =>{ 
  return (
    <p>
        {props.person.name}:  {props.person.number} <button type="submit" onClick={props.delete}>delete</button>
    </p>
    )
}

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const[newNumber, setNewNumber] = useState("")
    const[filter, setFilter] = useState("")
    const[resultMessage, setResultMessage] =useState("there have been no actions this session")
    useEffect(() => {
      nameService
        .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
    }, [])

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }

        for (var i = 0; i<persons.length;i++){
            if(persons[i].name === newName){
                var result =window.confirm(persons[i].name + " on jo listassa, haluatko korvata numeron uudella")
                if(result ===false) return;
                else{
                  var curPersons = [...persons]
                  nameService.update(persons[i].id,nameObject).then(response =>{                
                    curPersons[i] = response
                    setPersons(curPersons)
                    setResultMessage("number from " + response.name +" has been changed to " + response.number)
                    
                  })
                  return;
                }
            }
        }
        nameService.create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber("")
          setResultMessage("Added "+returnedPerson.name)
        })

      }

    const HandleNewNumber = (event) => {
        setNewNumber(event.target.value)
      }

    const handleFilter = (event) => {
          setFilter(event.target.value)

      }

    

    const handleDelete = (person) => {
      var curPersons = [...persons]
      const array_person = (per) => per === person

      nameService.deletePerson(person.id, person).then(response =>{
        curPersons.splice(persons.findIndex(array_person),1)
        setPersons(curPersons)
        setResultMessage("Removed " + person.name)
      }).catch(error =>{
        setResultMessage("Information of " +  person.name + " has already been removed from the server")
      })
    }

    const namesToShow = persons.filter(person=> person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message ={resultMessage}/>
        <Filter value = {filter} handleFilter={handleFilter}/>
        <form onSubmit={addName} >
        <NameForm newName={newName} handleNewName= {handleNewName} newNumber= {newNumber} HandleNewNumber= {HandleNewNumber} />
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
      
        {namesToShow.map((name, i) => 
          
          <Name key={i} person={name} delete={() =>handleDelete(name)}  />
          
        )}

      </div>
    )
  
  }
  
  ReactDOM.render(<App  />, document.getElementById('root'))