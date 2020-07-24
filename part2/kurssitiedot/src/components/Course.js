import React from "react"

const Header = (props) => {
    console.log(props.name)
    return (
      <div>
        <h1>{props.name}</h1>    
      </div>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    return (
      <div>
        { props.parts.map((part, i)=>
          <Part name = {part.name} exercises={part.exercises} key ={i} />  
      )}
      </div>
    )
  }
  const Course = (props) => {
      //console.log(parts)
      return (
          props.courses.map(course =>
          <div key ={course.id}>
              <Header name = {course.name} />
              <Content parts = {course.parts} />
              <Total parts = {course.parts} />
          </div>
      )
      )
  }
  
  const Total = (props) => {
  
    const exercises =  props.parts.map((part)=>part.exercises );
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
    var sum = exercises.reduce(reducer);
   
   
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

  export default Course