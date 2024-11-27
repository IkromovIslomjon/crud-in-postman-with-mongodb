const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Joi=require('joi');
const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    isVip:{
        type:Boolean,
        default:false

    },
    phone:{
        type:String,
        required:true,
        minlength:3,
        maxlength:10
    }
});
const Customer=new  mongoose.model("customer",customerSchema);
router.get('/', async (req,res)=>{
    const customers= await Customer.find().sort('name')
    res.send(customers);
});

router.post('/', async (req,res)=>{
    const {error}=validateCustomers(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
          const customer= new Customer({
            name:req.body.name,
            isVip:req.body.isVip,
            phone:req.body.phone
          })
          await customer.save();
          res.status(201).send(customer);  
          
    });
    router.get('/:id', async (req,res)=>{
        let customer= await Customer.findById(req.params.id);
        if(!customer){
            res.status(404).send('Invalid id')
        }
        res.send(customer);
    });

    router.put('/:id', async (req,res)=>{
        const {error}=validateCustomers(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        const customer=await Customer.findByIdAndUpdate(req.params.id, {name:req.body.name}, {isVip:req.body.isVip}, {phone:req.body.phone});
    
        res.send(customer);
    });

    router.delete('/:id', async (req,res)=>{
        const customer=await Customer.findByIdAndDelete(req.params.id);
        if(!customer){
            return res.status(404).send('Invalid id');
        }
        res.send(customer);
    })
    

    function validateCustomers(customer){
        const schema=Joi.object({
        name:Joi.string().min(3).required(),
        isVip:Joi.boolean(),
         phone:Joi.string().required()
        })
      return schema.validate(customer);
    }

    module.exports=router;