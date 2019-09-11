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


app.use(cors())


app.get('api/weather',(req,res) => {
    if(!req.query.address) {
        return res.status(500).send({
            error: 'You must provide search address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}) =>{
        if(error){
            return res.status(500).send(error)
        }
        else{
            forecast(latitude,longitude,(error,forecastdata) => {
                if(error)
                    return res.status(500).send(error)
                else{
                    return res.status(200).send({location,forecastdata})
                }
            })
        }
    })
})

app.post('api/register',(req,res) =>{
	db.addUser(req.body)
	
	res.status(200).send(req.body)
})

app.get('api/users',(req,res) =>{
	
	db.listUsers((users)=>{
        console.log(users)
        res.send(users)
    });
    
})

app.get('*',(req,res) =>{
    res.status(404).send('<h1>404 page not found')
})

app.listen(8000,()=>{
    console.log("Serever running on port 8000")
})
