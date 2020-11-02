// for easy writting
const con =console.log;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');

// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=3000;
app.listen(port,()=>{
    con('server running...');
    con(`on localhost: ${port}`);
});

//Get Route
app.get('/all',sendData);
function sendData(req,res){
    res.send(projectData);
    
     projectData={};
}

// Post Route
app.post('/add',addData);
function addData(req,res){
    con(req.body);
    projectData.date=req.body.date;
    projectData.temp=req.body.temp;
    projectData.feeling=req.body.feeling;
}