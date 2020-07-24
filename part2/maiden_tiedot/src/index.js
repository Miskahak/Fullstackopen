import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Language = (props) => {
    return(
        <div>
            {props.language.name}
        </div>
    )
}

const Countries = (props) => {
    if (props.countries.length >10){
        return (
            <div key = {props.key}>
                Too many countries to show
            </div>
        )
    }

    if(props.countries.length === 1){
       var country = props.countries[0]
       var languages = country.languages
        return (
            <div>
                <h1>
                    {country.name}
                </h1>
            <p>
              capital: {country.capital}     
            </p>    
            <p>
                population: {country.population}
            </p>
            <div>
            <h2>
                languages
            </h2>
            {languages.map((language,i)=>
                <Language language = {language} key = {i} />
            )}
            </div>
               <img src={country.flag} width = {250} height = {150} alt="error"/> 
            </div>
        )
    }

    return (
        <div>
          { props.countries.map((country, i)=>
            <Country name = {country.name} key ={i} />  
        )}
        </div>
      )
}

const Country = (props) =>{
    return (
        <p>
            {props.name}
        </p>
    )
}



const App = () => {
    const [countries,setCountries] = useState([])
    const[filter, setFilter] = useState("")

    const handleFilter = (event) => {
        setFilter(event.target.value)

    }

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response =>{
        setCountries(response.data)

    })
},[])

const countriesToShow = countries.filter(country=> country.name.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
          <div>
                name: <input 
                value = {filter}
                onChange= {handleFilter} />
          </div>
        <Countries countries= {countriesToShow} />
      </div>
    )
    
  }
  
  ReactDOM.render(<App  />, document.getElementById('root'))
