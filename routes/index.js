import express from "express";

//EL CONTROLLER DE LAS  DIFERENTES RUTAS
import {
	paginaInicio,
	paginaNosotros,
	paginaTestimoniales,
	paginaViajes,
	paginaDetalleViaje,
} from "../controller/paginasController.js";
import { guardarTestimonial } from "../controller/testimonialControlles.js";

const router = express.Router();

//REQUEST ES LO QUE SOLICITA EXPRESS
//RESPONSE ES LO QUE CONTESTA EXPRESS

//EXISTEN DIVERSAS RESPUESTAS COMO:
// response.json
// response.render(MOSTRAR UN HTML)
// response.send

router.get("/", paginaInicio);

router.get("/nosotros", paginaNosotros);

router.get("/testimoniales", paginaTestimoniales);

router.get("/viajes", paginaViajes);

//VIENE DESDE LA BD
router.get("/viajes/:slug", paginaDetalleViaje);

router.post("/testimoniales", guardarTestimonial);

export default router;
