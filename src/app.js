const path = require('path')
const express = require('express')
const cors = require('cors')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')
const db= require('./utils/db')



const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')

//SetUp static directory to serve 
app.use(express.static(path.join(__dirname,'../public')))
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}

app.use(cors())


app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide search address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}) =>{
        if(error){
            return res.send(500,error)
        }
        else{
            forecast(latitude,longitude,(error,forecastdata) => {
                if(error)
                    return res.send(500,error)
                else{
                    return res.send({location,forecastdata})
                }
            })
        }
    })
})

app.post('/register',(req,res) =>{
	db.addUser(req.body)
	
	res.send(req.body)
})

app.get('/users',(req,res) =>{
	
	db.listUsers((users)=>{
        console.log(users)
        res.send(users)
    });
    
})

app.get('*',(req,res) =>{
    res.send('<h1>404 page not found')
})

app.listen(8000,()=>{
    console.log("Serever running on port 8000")
})
