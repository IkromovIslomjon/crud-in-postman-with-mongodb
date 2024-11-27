const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Joi=require('joi');
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    }
});
const Category=new  mongoose.model("category",categorySchema);

router.get('/', async (req,res)=>{
    const categories= await Category.find().sort('name')
    res.send(categories);
});

router.put('/:id', async (req,res)=>{
    const {error}=validateCategory(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const category=await Category.findByIdAndUpdate(req.params.id, {name:req.body.name});

    res.send(category);
});

router.post('/', async (req,res)=>{
const {error}=validateCategory(req.body);
if(error){
    return res.status(400).send(error.details[0].message)
}
      const category= new Category({
        name:req.body.name
      })
      await category.save();
      res.status(201).send(category);

      
});
router.get('/:id', async (req,res)=>{
    let category= await Category.findById(req.params.id);
    if(!category){
        res.status(404).send('Invalid id')
    }
    res.send(category);
})

router.delete('/:id', async (req,res)=>{
    const category=await Category.findbAndDelete(req.params.id);
    if(!category){
        return res.status(404).send('Invalid id');
    }
    res.send(category);
})

function validateCategory(category){
    const schema={
        name:Joi.string().min(3).require()
    };
    return Joi.validate(category,schema);
}

module.exports=router;