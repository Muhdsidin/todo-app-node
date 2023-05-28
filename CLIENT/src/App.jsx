import { useEffect, useState } from 'react'
import axios from "axios"

import './App.css'

function App() {
  const [data, setData] = useState([])
  const [inputvalue, setInputvalue] = useState("")
  const [editinputvalue, setEditInputValue] = useState("")
  
  const handleChange = (event) => {
    const value = event.target.value
    setInputvalue(value)
  }
  //console.log(inputvalue)
  const fetchApi = () => {
    fetch('http://localhost:3005/api/todo')
      .then(response => response.json())
      .then((json) => {
        setData(json)
        // console.log(json)
      })

  }

  const PostApi = async () => {
    try {
      const response = await axios("http://localhost:3005/api/todo", {
        method: "POST",
        data: {
          value: inputvalue
        }
      })

      setData(response.data)

      console.log(data)

    } catch (error) {
      console.log(error)
    }

  }

  const postApiUsingId = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3005/api/${id}`);
      console.log(response.data);
      setData(response.data) // Handle the response as per your requirements
    } catch (error) {
      console.error(error);
    }

  };

  const updateHandle = (event)=>{
    const value = event.target.value
    console.log(value)
    setEditInputValue(value)
  }

  const updateApi = (id , title)=>{
    
  }





  /*const response = await fetch("http://localhost:3005",{
      method : "post",
      data:{
        Value:inputvalue
      }
    })
    const data = await response.json()
    setData(data)
    console.log(data)
}*/
  /*fetch('http://localhost:3005/users')
      .then(response => response.json())
      .then(json => setData(json))

  console.log(data)*/

  // useEffect(()=>{
  //fetchApi()
  // },[inputvalue])

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <>
      <input type="text" name='inputvalue' onChange={handleChange} placeholder='Add Todo' />
      <button onClick={PostApi}>Click Me</button>

      {data.map((value) => (
        <span>
          <div key={value.id}>{value.title}</div>
          <button onClick={() => { postApiUsingId(value.id) }}>delete </button>,
          <button onClick={() => { updateApi(value.id, value.title) }}>Update</button>
        </span>
      ))}

       

       {inputvalue?  <input type="text" onChange={updateHandle} placeholder='Update'  /> : null}  


    </>
  )
}

export default App
