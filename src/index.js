const express = require('express')
const bodyparser = require('body-parser')
const routerEmployee = require('../src/routers/employee')
const routerPark = require('../src/routers/parks')
const routerLocation = require('../src/routers/locations')

const app = express()
const door = 2828 || process.env.DOOR

const databaseConnection = require('./database/mongoConnection');
app.use(express.json());
app.use(bodyparser.json())
app.use(routerEmployee)
app.use(routerPark)
app.use(routerLocation)

databaseConnection();

app.listen(door, ()=>{
    console.log(`Connection with door ${door}`)
})