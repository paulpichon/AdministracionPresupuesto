//17/10/2010
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

    //metodo para crear un nuevo gasto
    nuevoGasto( gasto) {
        //se asigna el valor del arreglo más el nuevo gasto
        this.gastos = [ ...this.gastos, gasto ];
        //console.log( this.gastos );
        //llamar metodo clacularRestante
        this.calcularRestante();
    }
    //metodo para calcular el resto
    calcularRestante() {
        //usamos un array method
        //.reduce( acumulado, objeto actual ) 
        const gastado = this.gastos.reduce( ( total, gasto) => total + gasto.cantidad, 0 );
        //obtenemos el restante de la siguiente forma
        this.restante = this.presupuesto - gastado;
        console.log( this.restante );
    }
    //eliminar un gasto 
    eliminarGasto( id ) {
        //filter()
        this.gastos = this.gastos.filter( gasto => gasto.id !== id );
        //console.log( this.gastos );
        //para actualizar el restante
        //llamar metodo clacularRestante
        this.calcularRestante();
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
    //funcion para mostrar los gastos
    mostrarGastos( gastos ) {
        //limpiar el html anterior se llama con this
        this.limpiarHTML();
        //iterara sobre los gastos
        gastos.forEach(gasto => {
            //destructuring
            const { cantidad, nombre, id } = gasto;
            //crear el li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            //buena forma de hacerlo
            //nuevoGasto.setAttribute('data-id', id);
            //nueva forma de hacerlo = recomendada
            nuevoGasto.dataset.id = id;

            //agregar el html del gasto
            nuevoGasto.innerHTML = `${ nombre }<span class="badge badge-primary badge-primary badge-pill">$ ${ cantidad } </span> `;
            
            //boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            //agregar funcion para borrar gasto
            btnBorrar.onclick = () => {
                //funcion pára eliminar el gasto y como parametro le pasamos el id que se encuentra mas arriba
                eliminarGasto( id );
            }
            //texcontent
            btnBorrar.innerHTML = 'Borrar &times;';
            nuevoGasto.appendChild( btnBorrar );
            //agregar al html
            gastoListado.appendChild( nuevoGasto );
        });
    }

    //limpiar el html anterior
    limpiarHTML(){
        while( gastoListado.firstChild ) {
            gastoListado.removeChild( gastoListado.firstChild );
        }
    }

    //metodo para actualizar el restante en el html
    actualizarRestante( restante ) {
        //restante en el html
        document.querySelector('#restante').textContent = restante;
    }
    //metodo para comprobar lo que queda del presupuesto
    comprobarPresupuesto( presupuestoObj ) {
        //destructuring
        const { presupuesto, restante } = presupuestoObj;
        //variable que hace referencia a divRestante
        const restanteDiv = document.querySelector('.restante');

        //comprobar 25%
        if ( ( presupuesto / 4 ) > restante ) {
            //quitar clase alert-success
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            //agregar alert-danger
            restanteDiv.classList.add('alert-danger');
        }else if( ( presupuesto / 2 ) > restante ) {
            //quitar clase alert-success
            restanteDiv.classList.remove('alert-success');
            //agregar alert-warning
            restanteDiv.classList.add('alert-warning');
        }//cuando se borrar los gastos
        else {
             //quitar clases cuando se eliminen gastos
             restanteDiv.classList.remove('alert-danger', 'alert-warning');
             //agregar clase de success
            restanteDiv.classList.add('alert-success');
        }

        //si el total es 0 o menor
        if ( restante <= 0) {
            ui.imprimirAlerta('EL PRESUPUESTO SE HA AGOTADO', 'error');
            //evitar que puedan agregar mas gastos en caso de que el presupuesto se haya pasado
            formulario.querySelector('button[type="submit"]').disabled = true;
        }

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
    const cantidad = Number( document.querySelector('#cantidad').value );
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
    //generar un objeto con el gasto
    //contrario al destructuring como se ve aqui abajo
    //MEJORIRA DEL OBJETO LITERAL( Object Literal Enhancement ) = lo contrario al destructuring
    //aqui mismo agregamos el id del gasto
    const gasto = { nombre, cantidad, id: Date.now() };

    //añade un nuevo gasto
    presupuesto.nuevoGasto( gasto );

    //mostrar alerta de correcto
    ui.imprimirAlerta('GASTO AGREGADO CORRECTAMENTE');

    //imprimir los gastos
    //destructuring
    const { gastos, restante } = presupuesto;
    //llamar al metodo y pasamos como argumento los gastos
    ui.mostrarGastos( gastos );
    //mostrar el restante
    ui.actualizarRestante( restante );
    //metodo para comprobar el presupuesto
    ui.comprobarPresupuesto( presupuesto );
    //RESETEAR EL FORMULARIO
    formulario.reset();
}
//funcion para eliminar un gasto
function eliminarGasto( id ) {
    //eliminar un gasto desde el objeto
    presupuesto.eliminarGasto(id);

    //elimina el gasto desde el html
    //destructuring para acceder a gastos del arreglo presupuesto
    const { gastos, restante } = presupuesto;
    //renderizar los gastos
    ui.mostrarGastos( gastos );
    //mostrar el restante
    ui.actualizarRestante( restante );
    //metodo para comprobar el presupuesto
    ui.comprobarPresupuesto( presupuesto );
}