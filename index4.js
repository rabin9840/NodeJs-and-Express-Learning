const config=require('config');
const Joi=require('joi');                               //capital as joi returns Class 
const logger=require('/.logger');
const express=require('express');
const app=express();

//ENVIRONMENT
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get(env)}`);                    //By default set to development environment




//Built in middleware
app.use(express.json());                                //req.body
app.use(express.urlencoded());                          //key=value&key=value
app.use(express.static('public'));
app.use(helmet());


//Configuration
console.log('Application name:'+ config.get('name'));
console.log('Mail Server:'+ config.get('mail.host'));
console.log('Mail Password:'+ config.get('mail.password'));


//use morgan middleware if 
//environment is development only
if(app.get('env')=='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled.');
}


//Custom middeleware
app.use(logger);


app.use(function(req,res,next){
    console.log('Authenticating...');
    next();                                 //To pass control to another middleware Function
                        
});



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
    const result=validateCourse(req.body);
    const {error}=validateCourse(req.body);                             //object disstructuring
    
    
    if(error) return res.status(400).send(error.details[0].message);    //validateCourse returns value and error 
                                                                        //and here we need only error
    
    const course={
        id:course.length+1,
        name: req.body.name
    };
    courses.push(course);

    res.send(course);                                                   //return the new object to the body of the response

});


//UPDATE THE COURSE
//PUT Method
app.put('/api/courses/:id',(req,res)=>{

    const course=courses.find(c=>c.id===parseInt(req.params.id));               //Look up the course
    if(!course) return res.status(404).send("The given course is not found");   //If not return 404
    
    const result=validateCourse(req.body);                                      //validate
    //object disstructuring
    const {error}=validateCourse(req.body);
    //validateCourse returns value and error and here we need only error
    if(error) return res.status(400).send(error.details[0].message);            //If invalid return 400-Bad request
    

    course.name=req.body.name;                                                 //Update Course
 
    res.send(course);                                                          //Return Updated course


});



app.delete('/api/courses/:id',(req,res)=>{

    const course=courses.find(c=>c.id===parseInt(req.params.id));               //Look up the course
    if(!course) return res.status(404).send("The given course is not found");   //Not existing, return 404
    
    const index=courses.indexOf(course);                                        //DELETE
    courses.splice(index,1)                                                     //delete usign splice 

    res.send(course);                                                           //Return the same course


});



function validateCourse(course){
    const schema={                                                              //define schema for joi
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