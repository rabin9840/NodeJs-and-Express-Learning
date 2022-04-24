
function log(req,res,next){
    console.log('Logging...');
    next();                                 //To pass control to another middleware Function

}

module.exports=log;
