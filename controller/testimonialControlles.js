import { Testimonial } from "../models/Testimoniales.js";
const guardarTestimonial = async (req, res) => {
	//VALIDAR EL FORMULARIO
	const { nombre, correo, mensaje } = req.body;
	const error = [];

	if (nombre.trim() === "" || correo.trim() === "" || mensaje.trim() === "") {
		error.push("Un campo se encuentra vacio");
	}

	if (error.length > 0) {

		//CONSULTAR TESTIMONIALES EXISTENTES
		const testimoniales = await Testimonial.findAll();

		//MOSTRAR LA VISTA CON ERRORES
		res.render("testimoniales", {
			pagina: "Testimoniales",
			error,
			nombre,
			correo,
			mensaje,
			testimoniales
		});
	} else {
		//ALMACENARLO EN UNA BASE DE DATOS
		try {
			await Testimonial.create({
				nombre,
				correo,
				mensaje,    
			});

			//REDIRECCIONAR AL USUARIO UNA VEZ HAYA ENVIADO EL FORMULARIO
			res.redirect("/testimoniales");
		} catch (error) {
			console.log(error);
		}
	}
};

export { guardarTestimonial };
