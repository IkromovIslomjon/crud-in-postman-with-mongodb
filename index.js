const express=require('express');
const app=express();
const mongoose=require('mongoose');
const categoriesRoute=require('./routes/categories');
const customersRoute=require("./routes/customers");
app.use(express.json());
mongoose.connect('mongodb://localhost/virtualdars').then(()=>{
    console.log('Mongodbga ulandi...');
}).catch((err)=>{
    console.log('error occured in mongodb',err);
})
app.use("/virtualdars.com/api/categories", categoriesRoute);
app.use("/virtualdars.com/api/customers", customersRoute)




const port=process.env.PORT||8000;
app.listen(8000, ()=>{
    console.log(`server is running or port ${port}  `);
    
})