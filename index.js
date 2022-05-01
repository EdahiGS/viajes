import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//CONECTAR LA BASE DE DATOS
db.authenticate()
	.then(() => console.log("Base de  datos conectada"))
	.catch((error) => console.log(`${error}`));

//TODO LO QUE SE PRESENTA A CONTINUACION SE CONOCE COMO MIDDLEWARES

//HABILITAR PUG
app.set("view engine", "pug");

//OBTENER EL AÑO ACTUAL
app.use((req, res, next) => {
	const year = new Date();
	res.locals.actualYear = year.getFullYear();
	res.locals.nombreSitio = "Agencia de Viajes";

	//FORZAR QUE SIGA CON LAS LINEAS DE CODIGO
	return next();
});

//AGREGAR BODY PARSER  PARA LEER LOS DATOS DEL FORMULARIO
app.use(express.urlencoded({ extended: true }));

//AGREGAR ROUTER
app.use("/", router);

//DEFINIR LA CARPETA PUBLIC
app.use(express.static("public"));

//PUERTO Y HOST PARA APP
const host = process.env.HOST || '0.0.0.0';
const portHeroku = process.env.PORT || 4000;

app.listen(portHeroku, host,()=>{
	console.log('Funciona la app');
});



