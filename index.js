const express=require('express');
const app=express();

//methods
/*
app.get()
app.post()
app.put()
app.delete()
*/

//defining the route
//callback function here is route handler
app.get('/',(req,res)=>{
    //when we get the http get request to the root of our website
    res.send('Hello World!!!');

});

//defining another route
app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);

});

//Route Parameter

//Single Parameter id
app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
});

//Multiple Parameter eg
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
  
})

//here no if clause as before

//Environment Variable:part of environment in which process runs
//                     :value set outside the application
//PORT
const port=process.env.PORT || 3000

app.listen(port,()=>console.log(`Listening to port ${port}...`));