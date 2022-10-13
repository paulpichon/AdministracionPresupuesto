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
    //listener al formulario para poder agregar gastos
    formulario.addEventListener('submit', agregarGasto );
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
    //metodo para insertar el presupuesto en el HTML
    insertaPresupuesto( cantidad ) {
        //console.log( cantidad );
        //extrayedo los valores con destructuring
        const { presupuesto, restante } = cantidad;
        //insertar presupuesto y restante respectivamente en el html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
    //metodo para imprimir alertas/mensajes
    imprimirAlerta( mensaje, tipo ) {
        //creael el html
        const divMensaje = document.createElement('div');
        //clases
        divMensaje.classList.add('text-center', 'alert');
        //verificamos el tipo de mensaje
        if ( tipo === 'error') {
            //agregar la clase tipo error
            divMensaje.classList.add('alert-danger');
        }else{
            //agregar la clase tipo exito
            divMensaje.classList.add('alert-success');
        }
        //mensaje de error
        //agregar la clase tipo error
        divMensaje.textContent = mensaje;
        //insertar en el html
        document.querySelector('.primario').insertBefore( divMensaje, formulario );
        //quitar mensaje
        setTimeout(() => {
            //remover mensaje
            divMensaje.remove();
        }, 3000);
    }

}
//instanciar UI
//variable de forma global
const ui = new UI();

//VARIABLES CON EL PRESUPUESTO INTRODUCIDO POR EL USUARIO
let presupuesto;

/**************************FUNCIONES***********/

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
    //insertar el presupuesto en el htm
    ui.insertaPresupuesto( presupuesto );
}
//funcion para agregar gastos
function agregarGasto( e ) {
    //prevenir la accion por default
    e.preventDefault();
    //leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;
    //validar  que los campos no esten vacios
    if ( nombre === '' || cantidad === '') {
        //llamar imprimir alerta
        ui.imprimirAlerta('AMBOS CAMPOS SON OBLIGATORIOS', 'error');
        return;
    }
    //validar que la cantidad no sea negativa
    else if( cantidad <= 0 || isNaN( cantidad ) ) {
        //llamar imprimir alerta
        ui.imprimirAlerta('CANTIDAD NO VALIDA', 'error');
        return;
    }
    //AGREGANDO GASTO
    console.log("agregando gasto");
}