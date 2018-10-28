const express = require('express');
const mySQL   = require('mysql');
const methodOverride = require('method-override');
const http = require('http');
const bodyParser = require('body-parser');

const UserController = require('./UserController.js');
const AircraftController = require('./AircraftController.js');

const app = express();

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const connectionPool = mySQL.createPool({
    connectionLimit: 1000,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rockDB64',
    database: 'aircraft',
    debug: 'true'
});

const userController = new UserController(connectionPool);
const aircraftController = new AircraftController(connectionPool);

const router = express.Router();

router.route('/usr/login').post(function(req,res,nxt){
    userController.getUser(req,res);
});

router.route('/aircraft/get').get(function(req,res,nxt){
    aircraftController.getAircraft(req,res);
});

router.route('/aircraft/delete').post(function(req,res,nxt){
    aircraftController.deleteAircraft(req,res);
});

router.route('/aircraft/update').post(function(req,res,nxt){
    aircraftController.updateAircraft(req,res);
});

router.route('/aircraft/create').post(function(req,res,nxt){
    aircraftController.createAircraft(req,res);
});

router.route('/aircraft/create-many').post(function(req,res,nxt){    
    console.log("Entered here");
    
    aircraftController.createAircrafts(req,res);
});

app.use(router);

//Listen @ port 3000
app.listen(3000,()=>{
    console.log('Server listening at port 3000');
})