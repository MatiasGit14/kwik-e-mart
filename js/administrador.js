/* Inicio el catalogo vacio para evitar error de calcular ID si no es cargado el localStorage */
let catalogo = [];

catalogo = JSON.parse(localStorage.getItem("catalogo"));

// OBJETO DE PRODUCTOS
class Productos {
	constructor(id, nombre, precio, img, rubro, descripcion) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.img = img;
		this.rubro = rubro;
		this.descripcion = descripcion;
		this.cantidad = 1;
	}
}

/*FUNCION PARA AGREGAR PRODUCTOS*/
const nuevoProducto = () => {
	//Asigno como id 1 + del ultimo del catalogo para que sea unico
	let nuevoId = catalogo.length + 1;
	//Tomo los datos de los inputs
	let nombreProd = document.querySelector(".nuevoNombre").value;
	let precioProd = document.querySelector(".nuevoPrecio").value;
	let imgProd = document.querySelector(".nuevaImg").value;
	let rubroProd = document.querySelector(".nuevoRubro").value;
	let descripcionProd = document.querySelector(".nuevaDescripcion").value;

	//Creo una nueva instancia del producto con los datos tomados
	let nuevoProd = new Productos(
		nuevoId,
		nombreProd,
		precioProd,
		imgProd,
		rubroProd,
		descripcionProd
	);
	//Chequeo que ningun campo esta vacio y pusheo el nuevo articulo al array y este array al storage
	if (
		nombreProd !== "" &&
		precioProd !== "" &&
		imgProd !== "" &&
		rubroProd !== "" &&
		descripcionProd !== ""
	) {
		catalogo.push(nuevoProd);
		localStorage.setItem("catalogo", JSON.stringify(catalogo));
	} else {
		alert("Todos los campos deben estar llenos");
	}
};

/****Evento Submit*****/
document.querySelector(".agregarNuevoProd").addEventListener("click", (e) => {
	e.preventDefault();
	nuevoProducto();
	alert("Producto agregado Correctamente");
});
