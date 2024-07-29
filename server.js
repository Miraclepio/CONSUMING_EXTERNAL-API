
const express=require("express")
const mongoose=require("mongoose")
  

require("dotenv").config()     

const PORT=process.env.PORT 
const DB=process.env.Database

const dataRouter=require("./Router/dataRouter") 
 
const app=express();    
app.use(express.json())
app.use("/api/v1",dataRouter) 
mongoose.connect(DB).then(()=>{
    console.log("successfully connected to the database") 
}).catch((err)=>{
    console.log("error connecting to database: ", err.massage);
});
app.all('*',(res)=>{
    return res.status(200).send('welcome to my homepage')
})

app.listen(PORT,() => {
    console.log(`server is listening to PORT:${PORT}`) 
})    