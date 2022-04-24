//const debug=require('debug')('app:startup')
//const morgan=require('morgan');
const config= require('config');
const helmet=require('helmet');
const Joi=require('joi');                               //capital as joi returns Class 
const logger=require('./middleware/logger');
const courses=require('./routes/courses');
const home=require('./routes/home');

const express=require('express');


const app=express();


app.set('view engine','pug');
app.set('views','/.views'); //default



//Built in middleware
app.use(express.json());                                //req.body
app.use(express.urlencoded());                          //key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);


//Configuration
console.log('Application name:'+ config.get('name'));
console.log('Mail Server:'+ config.get('mail.host'));
//console.log('Mail Password:'+ config.get('mail.password'));


//Custom middeleware
app.use(logger);

//PORT
const port=process.env.PORT || 3000

app.listen(port,()=>console.log(`Listening to port ${port}...`));