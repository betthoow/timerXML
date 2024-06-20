const express = require('express'); 
const bodyParser = require('body-parser'); 
const fs = require('fs'); 
const app = express(); 
const port = 3000; 

let timeFormt = {
	Hour : 0,
	Minute : 0,
	Seconds: 0
}
// Inicialmente, el XML estara vaci­o
let timeXML = "<root> <hours>"+timeFormt.Hour+"</hours> <minutes>"+timeFormt.Hour+"</minutes> <seconds>"+timeFormt.Hour+"</seconds> </root>";

// Middleware para parsear JSON en las peticiones POST
app.use(bodyParser.json()); 

// Permitir compartir recursos con cualquier URL
app.use((req,res,next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// Ruta GET para acceder al XML
app.get('/timeXML', (req, res) => { res.sendFile(__dirname + '/archivo.xml');
});

//update time and date
let nowTime = null;
setInterval(() => { 

	nowTime = new Date();

	timeFormt.Hour = nowTime.getHours();
	timeFormt.Minute = nowTime.getMinutes();
	timeFormt.Seconds = nowTime.getSeconds();

	timeXML = "<root> <hours>"+timeFormt.Hour+"</hours> <minutes>"+timeFormt.Minute+"</minutes> <seconds>"+timeFormt.Seconds+"</seconds> </root>";
    fs.writeFileSync('archivo.xml', timeXML); 

}, 1000);
// Iniciar el servidor
app.listen(port, () => { 
	console.log("Servidor escuchando en http://localhost " + port);
});