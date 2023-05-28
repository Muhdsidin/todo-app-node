const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3005
const Data = require("./data.json")

app.use(express.json())
app.use(cors())

app.get("/api/todo", (req, res) => {
    res.status(200).json(Data)
    //console.log(Data) 
})


app.post("/api/todo", (req, res) => {
    const value = req.body
   // console.log(value.value, "==value")
    const values = value.value
    const newTodo = {
        id: Date.now(),
        title: values,
    }
    Data.push(newTodo)
    //console.log(newTodo,"==newtOdo array");
    res.status(200).json(Data)
})

app.delete('/api/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    // Handle the id as needed
    const filteredData = Data.splice(Data, id)
    Data === filteredData
    console.log(Data);
    res.status(200).json(Data)
  });

  app.put("/api/todo",(req,res)=>{
    
  })
  

   
//app.use()
     
app.listen(PORT, () => {
    console.log(`server is starting ---> ${PORT}`)
})

