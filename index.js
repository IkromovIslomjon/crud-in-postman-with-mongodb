const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
mongoose.connect('mongodb://localhost/virtualdars').then(()=>{
    console.log('Mongodbga ulandi...');
}).catch((err)=>{
    console.log('error occured in mongodb',err);
    
})
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    }
});
const Category=new  mongoose.model("category",categorySchema);

app.get('/virtualdars.com/api/categories', async (req,res)=>{
    const categories= await Category.find().sort('name')
    res.send(categories);
});

app.put('/virtualdars.com/api/categories/:id', async (req,res)=>{
    const category=await Category.findByIdAndUpdate(req.params.id, {name:req.body.name});

    if(!category){
        return res.status(404).send('Invalid id');
    }
    if(req.body.name<3){
      return  res.status(400).send('The name of the category shouldl be at least 3 characters')
    }
    if(!req.body.name){
        return res.status(400).send('The name of the category is required');
    }
    res.send(category);
});

app.post('/virtualdars.com/api/categories', async (req,res)=>{
    if(!req.body.name){
        return res.status(400).send('The name of the category is required');
    }
    if(req.body.name<3){
        return  res.status(400).send('The name of the category shouldl be at least 3 characters')
      }
      const category= new Category({
        name:req.body.name
      })
      await category.save();
      res.status(201).send(category);

      
});
app.get('/virtualdars.com/api/categories/:id', async (req,res)=>{
    let category= await Category.findById(req.params.id);
    if(!category){
        res.status(404).send('Invalid id')
    }
    res.send(category);
})

app.delete('/virtualdars.com/api/categories/:id', async (req,res)=>{
    const category=await Category.findbAndDelete(req.params.id);
    if(!category){
        return res.status(404).send('Invalid id');
    }
    res.send(category);
})



const port=process.env.PORT||8000;
app.listen(8000, ()=>{
    console.log(`server is running or port ${port}  `);
    
})