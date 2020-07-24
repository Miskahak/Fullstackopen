import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    console.log("put " +id)
    console.log("put object " +newObject)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  const deletePerson = (id, person) =>{
      console.log("ads")
      console.log(person)
      console.log(person.id)
    const request = axios.delete(`${baseUrl}/${person.id}`,person)
    console.log(request)
    return request.then(response => response.data)
  }

    export default { 
    getAll, 
    create, 
    update,
    deletePerson
  }