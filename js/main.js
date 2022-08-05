let personas = [];

let formulario;

let inputNombre;
let inputApellido;
let inputEdad;
let inputDias;

let tabla;
let errores;

//----------------local storage

let aux = localStorage.getItem('personas');

if (!aux) {
    personas = [];
} else {
    personas = JSON.parse(aux)
}

//-----------personas

class Persona {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

function inicializarElementos() {
    formularioPersonas = document.getElementById("formularioPersonas");
    formularioTiempo = document.getElementById("formularioTiempo");

    inputNombre = document.getElementById("nombre");
    inputApellido = document.getElementById("apellido");
    inputEdad = document.getElementById("edad");

    inputDias = document.getElementById("dias");
    calcularBtn = document.getElementById("calcularBtn");

    tabla = document.getElementById("tablaPersonas");
    error1 = document.querySelector(".error1")
    error2 = document.querySelector(".error2")
    errorTiempoMax = document.querySelector(".errorTiempoMax")
    error1.style.display = "none";
    error2.style.display = "none";
    errorTiempoMax.style.display = "none";
}

inicializarElementos()

//---------------------formulario personas

formularioPersonas.onsubmit = (event) => {
    event.preventDefault();

    let nuevaPersona = new Persona(inputNombre.value, inputApellido.value, inputEdad.value)
    if (inputNombre.value != "" && inputApellido.value != "" && inputEdad.value != "") {
        personas.push(nuevaPersona)

        personas.reverse()
        limpiarTabla();
        agregarPersonasTabla()
        error1.style.display = "none"
        formularioPersonas.reset()
    } else {
        error1.style.display = "block"
    }


}

function limpiarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1)
    }
}


function agregarPersonasTabla() {
    personas.forEach(persona => {
        let tabla = document.querySelector(".tabla")
        let filaTabla = document.createElement("tr")

        filaTabla.innerHTML = `
        <td>${persona.nombre} </td>
        <td>${persona.apellido} </td>
        <td>${persona.edad} </td>
        `
        localStorage.setItem('personas', JSON.stringify(personas));

        tabla.append(filaTabla)

    });


}

// const menor = persona => persona.edad <= 12;
// const mayor = persona => persona.edad > 12;


// const ninios = personas.filter(menor);
// const adultos = personas.filter(mayor);

// console.log(ninios);
// console.log(adultos);

//-----------------------------------------calcular precio total


function mostrarPrecioFinal() {
    let tiempo = inputDias.value

    let precioTotal = document.getElementById('precioFinal');

    let precioPersonas = 1000*personas.length;
    console.log(precioPersonas);
    
    let precioFinal = precioPersonas*tiempo;
    console.log(precioFinal);


    let infoPrecio = `
    <div class="card-precio">
       <h4>El precio final para ${personas.length} personas por ${tiempo} dias es de $${precioFinal}.</h4>
    </div>
    `
    precioTotal.innerHTML += infoPrecio


}


calcularBtn.onclick = (event) => {

    event.preventDefault();


    if (inputDias.value != "" && inputDias.value <= 30) {

        mostrarPrecioFinal()
        error2.style.display = "none"
        errorTiempoMax.style.display = "none"

    } else if (inputDias.value > 30) {
        errorTiempoMax.style.display = "block"
    } else {
        error2.style.display = "block"
    }

}

function calculo(cantidad,precio,inputtext,totaltext){
	
	// Calculo del subtotal
	subtotal = precio*cantidad;
	inputtext.value=subtotal;
	
        //Calculo del total
	total = eval(totaltext.value);
	totaltext.value = total + subtotal;
}

function mostrarAlert() {

    Swal.fire({
        title: 'Reserva confirmada',
        text: 'Se confirmó tu reserva',
        icon: 'success',
        confirmButtonText: 'Continuar con el pago'
    })
    
}


