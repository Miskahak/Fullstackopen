import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props.header.name)
  return (
    <div>
      <h1>{props.header.name}</h1>    
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      { props.parts.parts.map((part)=>
        <Part name = {part.name} exercises={part.exercises} />  
    )}
    </div>
  )
}

const Total = (props) => {
  
  const exercises =  props.parts.parts.map((part)=>part.exercises );
  var sum = 0;
  for (var i =0; i<exercises.length; i++){
    sum+=exercises[i]
  }

  
  console.log(sum)
  return (
    <div>
      <p> Number of exercises {sum}</p>    
    </div>
  )
}

const Part = (props) => {
  return (
      <p>{props.name} {props.exercises}</p>    
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header = {course}/>
      <Content parts ={course}/>
      <Total parts={course} />
    </div>
  )
}

ReactDOM.render(<App  />, document.getElementById('root'))