const Joi=require('joi');   //capital as joi returns Class 

const express=require('express');
const app=express();

//for req.body.name to work in post method
app.use(express.json());

const courses=[
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course4'},
]


//defining the route

app.get('/',(req,res)=>{
    res.send('Hello World!!!');
});

//defining another route
app.get('/api/courses',(req,res)=>{
    res.send(courses);

});

//HTTP POST Method
app.post('/api/courses',(req,res)=>{

    //define schema for joi

    const schema={
        name:Joi.string().min(3).required();
    };

    //for easy validation of client input
    const result=Joi.validate(req.body,schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }


    /*
    //Manual Input Validation Logic
    if(!req.body.name || req.body.name.length<3){
        res.status(400).send("Name is required and should be minimum of length 3.");
    }

    */

    const course={
        id:course.length+1,
        name: req.body.name
    };
    courses.push(course);

    //return the new object to the body of the response
    res.send(course);

});


//UPDATE THE COURSE
//PUT Method
app.put('/api/courses/:id',(req,res)=>{
    //Look up the course
    //If not return 404
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)//404
    {
        res.status(404).send("The given course is not found");
    }

    //validate
    //If invalid return 400-Bad request

    /*
    const schema={
        name:Joi.string().min(3).required();
    };
    const result=Joi.validate(req.body,schema);

    */

    
    const result=validateCourse(req.body);
    //object disstructuring
    const {error}=validateCourse(req.body);
    //validateCourse returns value and error and here we need only error
    if(error){
        res.status(400).send(error.details[0].message);
    }


    /*if(result.error){
        res.status(400).send(result.error.details[0].message);
    }*/
    


    //Update Course
    course.name=req.body.name;
    //Return Updated course
    res.send(course);


})

function validateCourse(course){
    const schema={
        name:Joi.string().min(3).required();
    };
    return Joi.validate(course,schema);

}



//Route Parameter

//Single Parameter id
app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)//404
    {
        res.status(404).send("The given course is not found");
    }
    res.send(course);
});

//here no if clause as before


//PORT
const port=process.env.PORT || 3000

app.listen(port,()=>console.log(`Listening to port ${port}...`));