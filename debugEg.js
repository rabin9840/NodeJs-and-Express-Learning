const debug=require('debug')('app:startup')
//const dbDebugger=require('debug')('app:db');
const morgan=require('morgan');
const express=require('express');
const app=express();


if(app.get('eng')=='development'){
    app.use(morgan('tiny'));
    //console.log('Morgan Enabled');
    debug('Morgan Enabled');

}

//Debugger for database
//dbDebugger('Connected to the Database...');

const port=process.env.PORT||3000
app.listen(port,()=>console.log(`Listening to port ${port}...`));