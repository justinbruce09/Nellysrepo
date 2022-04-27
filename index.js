//requires express
const express = require("express");

//create an express server from funct above
const server = express() //this server is deaf af, cant hear anything

// global object called process 
//console.log(process.env.PORT)

//make it listen (give it ears)
const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> {
	console.log("server listening");
});

//get /justin
server.get("/justin", (req, res)=>{
	res.send("<h1> Hi Justin!</h1>");
})