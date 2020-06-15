const express = require('express');
const server = express();

const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

// creates session
const expSession = require('express-session')
const knexSeshConnect = require('connect-session-knex')
const knexSessionStore = knexSeshConnect(expSession)

const sessionConfig = {
	name  : 'session-cookie', // name of cookie 
 	secret : 'my secret' , 
	cookies :{
		maxAge : 1000 * 500 ,// life of cookie 
		server : false , // true production . Makes it so only can use HTTPs or not 
		http: true , // cookie cannot be accesses with javactip 

	}, 
	resave: false, // recreates session if not save 
	saveUninitialized: false ,// legalal compliance , true on production 
	store: new knexSessionStore({ // saves cookie acceessiability info 
		knex:require('../database/dbConfig.js'), 
		tablename: "sessions",
		createtable: true, 
	clearInterval : 1000*100*100
})
}
server.use(expSession(sessionConfig))
// 


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
