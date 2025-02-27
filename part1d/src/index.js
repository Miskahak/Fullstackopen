import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
) 


const StatisticLine = ({text, value}) =>{
    return(
    <tr>
        <td>{text}:</td>
          
        <td>{value}</td>       
    </tr>

)
}
const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && bad === 0 && neutral ===0){ 
    return(
        <div>
            <h1>statistics</h1>
            <p>
                no feedback available
            </p>
        </div>
    )
    }
    return (
    <div>
    <h1>statistics</h1>
    <table>
        <tbody>
    <StatisticLine text="good" value ={good} />
    <StatisticLine text="neutral" value ={neutral} />
    <StatisticLine text="bad" value ={bad} />
    <StatisticLine text="total" value ={good + bad + neutral} />
    <StatisticLine text="average" value ={(good-bad)/(good + bad + neutral)} />
    <StatisticLine text="positive %" value ={(good/(good + neutral + bad))*100} /> 
        </tbody>
    </table>
    </div>
    )
  }

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (

    <div>
        <h1>give feedback</h1>
        <p>        
            <Button handleClick = {() => setGood(good+1)} text = "good"/>
            <Button handleClick = {() => setNeutral(neutral+1)} text = "neutral"/>
            <Button handleClick = {() => setBad(bad+1)} text = "bad"/>
        </p>
    <Statistics good = {good} neutral = {neutral} bad = {bad}   />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
