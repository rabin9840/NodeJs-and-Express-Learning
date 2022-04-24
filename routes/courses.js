import { Router } from 'express';
const router=Router();



const courses=[
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course4'},
]


router.get('/',(req,res)=>{
    res.send(courses);

});

//Single Parameter id
router.get('/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)//404
    {
        res.status(404).send("The given course is not found");
    }
    res.send(course);
});

//HTTP POST Method
router.post('/',(req,res)=>{
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


router.put('/:id',(req,res)=>{

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



router.delete('/:id',(req,res)=>{

    const course=courses.find(c=>c.id===parseInt(req.params.id));               //Look up the course
    if(!course) return res.status(404).send("The given course is not found");   //Not existing, return 404
    
    const index=courses.indexOf(course);                                        //DELETE
    courses.splice(index,1)                                                     //delete usign splice 

    res.send(course);                                                           //Return the same course


});



function validateCourse(course){
    const schema={                                                              //define schema for joi
        name:Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);

}



export default router;