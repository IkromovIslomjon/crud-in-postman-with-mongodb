function authentic (req,res,next){
    console.log('authentic..');
    next();
    
}
module.exports=authentic;