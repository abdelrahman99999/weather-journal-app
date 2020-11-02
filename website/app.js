// for easy writting
const con =console.log;
/* Global Variables */

const baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
// my API Key for OpenWeatherMap API
//i use (&units=metric) to get temperature in Celsius
//i hide my key so no one can use it 
const key='&units=metric&appid=********************************';

// Create a new date instance dynamically with JS
let d = new Date();
//i add one for month bacause (getMonth() return from 0/11)
let newDate = d.getMonth()+1 +'-'+ d.getDate()+'-'+ d.getFullYear();

//////////*function to alert and change ui */////////
function empty_input(){
        alert('please enter the required data and try again!');
        document.getElementById('date').innerHTML=``;
        document.getElementById('temp').innerHTML=``;
        document.getElementById('content').innerHTML=``; 
        document.getElementById('error').innerHTML=`please complete The required data and try again `; 
}

//using add EventListener for my button
document.getElementById('generate').addEventListener('click',performAction);

/* Function called by event listener */
function performAction(e){
const newZip=document.getElementById('zip').value;
const f=document.getElementById('feelings').value;

//handle the app when user don't enter his feeling or the zip
if(f==''||newZip==''){
    empty_input();
}
else{
document.getElementById('error').innerHTML=``; 
getData(baseURL,newZip,key)
    .then(function(data){
        con(data);
        postData('/add',
        {
            date:newDate,
            temp:data.main.temp,
            feeling:f
        });
        updateUI();
    })
}}

//function to get data
const getData=async(base_URL,zip,key)=>{
    const responce=await fetch(base_URL+zip+key);
    //using try/catch to handle the errors
    try{
        const data=await responce.json();
        return data;
    }
    catch(error){
        con('error',error)
    }
}

//function to post data
const postData=async(url='',data={})=>{
    con(data);
    const res=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{'Content-Type':'application/json',},
        body:JSON.stringify(data),});
        //using try/catch to handle the errors
        try{
            const newData=await res.json();
            con(newData);
            return newData;
        }
        catch(error){
            con('error',error);
        }
}

//function to update the perfomance or the user interface 
const updateUI=async()=>{
    const request=await fetch('/all');
    //using try/catch to handle the errors
    try{
        const allData=await request.json();
        document.getElementById('date').innerHTML=`Date: ${allData.date}`;
        document.getElementById('temp').innerHTML=`temperature: ${allData.temp} Celsius`;
        document.getElementById('content').innerHTML=`I feel ${allData.feeling}`;         
    }
    catch(error){
        con('error',error);
    }
}
