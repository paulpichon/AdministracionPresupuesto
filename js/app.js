//variables y selectores
//formulario
const formulario = document.querySelector('#agregar-gasto');
//variable que representa donde se pondran los gatos
const gastoListado = document.querySelector('#gastos ul');

//eventos
eventListeners();
function eventListeners() {
    //funcion que preguntara el presupuesto
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );
}

//clases
//clase para presupuesto
class Presupuesto {
    constructor( presupuesto ){
        //Presupuesto
        this.presupuesto = Number( presupuesto );
        //restante al ser la primera vez que se muestra el presupuesto sera igual que el restante
        this.restante = Number( presupuesto );
        //variable para los gastos que ser un arreglo vacio donde se iran acumulando los gastos
        this.gastos = [];
    }
}
//clase para la interface del usuario
class UI{
    //sin constructor
}
//instanciar UI
//variable de forma global
const ui = new UI();

//VARIABLES CON EL PRESUPUESTO INTRODUCIDO POR EL USUARIO
let presupuesto;

//funciones
//funcion para preguntar el presupuesto
function preguntarPresupuesto() {
    //prompt para preguntar el presupuesto
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    //console.log( presupuestoUsuario );
    //validar si esta vacio el input del prompt
    //verificar que no este vacio, que sea NULL o que no sea un numero(letras)
    //isNaN = comprueba si es un numero si no lo es devueklve TRUE
    //y por ultimo verificar que el presupuesto no sea negativo
    if ( presupuestoUsuario === '' || presupuestoUsuario === null || isNaN( presupuestoUsuario ) || presupuestoUsuario <= 0 ) {
        //recargar la pagina
        window.location.reload();
    }
    //presupuesto valido
    //instanciar presupuesto
    presupuesto = new Presupuesto( presupuestoUsuario );
    console.log( presupuesto );
}