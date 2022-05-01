import res from "express/lib/response.js";
import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (request, response) => {
	//CONSULTAR 3 VIAJES DEL MODELO VIAJE

	const promiseDB = [];
	promiseDB.push(Viaje.findAll({ limit: 3 }));
	promiseDB.push(Testimonial.findAll({ limit: 3 }));
	try {
		const resultado = await Promise.all(promiseDB);
		response.render("inicio", {
			pagina: "Inicio",
			clase: "home",
			viajes: resultado[0],
			testimoniales: resultado[1],
		});
	} catch (error) {
		console.log(error);
	}
};

const paginaNosotros = (request, response) => {
	response.render("nosotros", {
		pagina: "Nosotros",
	});
};

const paginaTestimoniales = async (request, response) => {
	try {
		const testimoniales = await Testimonial.findAll();

		response.render("testimoniales", {
			pagina: "Testimonios",
			testimoniales,
		});
	} catch (error) {
		console.log(error);
	}
};

const paginaViajes = async (request, response) => {
	//CONSULTAR A LA BASE DE DATOS
	const viajes = await Viaje.findAll();

	response.render("viajes", {
		pagina: "Viajes",
		viajes,
	});
};

//MUESTRA UN VIAJE POR SU SLUG
const paginaDetalleViaje = async (request, response) => {
	const { slug } = request.params;
	//CONSULTAR A LA BASE DE DATOS
	const resultado = await Viaje.findOne({ where: { slug } });

	response.render("viaje", {
		pagina: "Detalles del Viaje",
		resultado,
	});
};

export {
	paginaInicio,
	paginaNosotros,
	paginaTestimoniales,
	paginaViajes,
	paginaDetalleViaje,
};
