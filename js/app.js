//Variables 
const presupuestoUsuario = prompt('Cual es tu presupuesto Semanal');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;




console.log(presupuestoUsuario);


//clases

// clase de presupuesto 

class Presupuesto {
    constructor(presupuesto){
         this.presupuesto = Number(presupuesto);
         this.restante = Number(presupuesto);
    }
    // metodo para ir restando del presupuesto actual
    
    presupuestoRestante(cantidad = 0){
         
        return this.restante -= Number(cantidad);
    }

}

//clase de interfaz manneja todo lo relaciona con el html

class Interfaz {
     
     insertarPresupuesto(cantidad){
         const presupuestoSpan = document.querySelector('span#total');
         const restante = document.querySelector('span#restante');
       //  console.log(cantidad); 
         
         //insertar html con javascript
         presupuestoSpan.innerHTML = `${cantidad}`;

         restante.innerHTML =  `${cantidad}`;
        }
       
        imprimirMensaje(mensaje , tipo){
         const divMensaje = document.createElement('div');
         divMensaje.classList.add('text-center' , 'alert');
         if(tipo === 'error'){
              divMensaje.classList.add('alert-danger');
            }else{
                divMensaje.classList.add('alert-success');
            }
            divMensaje.appendChild(document.createTextNode(mensaje));
            // insertarel mensaje en el dom
            document.querySelector('.primario').insertBefore(divMensaje , formulario);

            //quitar despues de tres segundos 

            setTimeout(function(){
                 document.querySelector('.primario .alert').remove();
                 formulario.reset(); 
                          
            },3000);
        }


        //insertar los gastos a la lista 

        agregarGastoListado(nombre, cantidad){
               const gastosListado = document.querySelector('#gastos ul');
               
               //crar un Li 
               const li = document.createElement('li');
               li.className = 'list-group-item d-flex justify-content-between align-items-center';
               li.innerHTML = `
                ${nombre} 
                 <span class ="badge badge-primary babge-pill"> ${cantidad}</span>  

               `
               gastosListado.appendChild(li);
            }

            //comproeba el presupuesto  restante 

            presupuestoRestante(cantidad){
                    const restante = document.querySelector('span#restante');
                  //actualizamos el presupuesto restante 
                    const presupuestoRestanteUsuario = 
                    cantidadPresupuesto.presupuestoRestante(cantidad);
                      
                    restante.innerHTML = `${presupuestoRestanteUsuario}`   ;     
                    
                    this.comprobarPresupuesto();
                }
           
            //cambia de color el presupuesto restante 

            comprobarPresupuesto (){
               
               const presupuestoTotal = cantidadPresupuesto.presupuesto;
               const presupuestoRestante = cantidadPresupuesto.restante;
               //comprobar 25%
               if((presupuestoTotal / 4) > presupuestoRestante){
                           
                    const restante = document.querySelector('.restante');
                    restante.classList.remove('alert-sucecss', 'alert-warnig');    
                    restante.classList.add('alert-danger');
                } else if((presupuestoTotal / 2 )> presupuestoRestante){
                    const restante = document.querySelector('.restante');
                    restante.classList.remove('alert-sucecss');    
                    restante.classList.add('alert-warning');
                }
               
               
               //comprobar el 50%


                
                console.log(cantidadPresupuesto);
            }  
}



//Event listener

document.addEventListener('DOMContentLoaded' , function(){

          if( presupuestoUsuario === null || presupuestoUsuario === ''){
                    
              window.location.reload();
            
            }else{
                //instaciar un presupuesto 
                cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
                 
                console.log(cantidadPresupuesto);
                 // instanciar  la clase de interfaz
                 const ui =new Interfaz();     
                 
                 ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
 
            }

});

formulario.addEventListener('submit' , function(e){
      e.preventDefault();
    
       //leer del formulario de gastos 

       const nombreGasto = document.querySelector('#gasto').value;
       const cantidadGasto = document.querySelector('#cantidad').value;
      
       //instanciar la interfaz 
       const ui = new Interfaz();
       
       //comprobar que los campos no esten vacios 
       if(nombreGasto === '' || cantidadGasto === ''){
            // 2 parametros : mensaje y tipo de error 
            ui.imprimirMensaje('Hubo un error' , 'error'); 
            console.log('los campos estan vacios');
       }else{
            //insertar en el HTML
            ui.imprimirMensaje('correcto','correcto ');
            ui.agregarGastoListado(nombreGasto, cantidadGasto);
            ui.presupuestoRestante(cantidadGasto);
            console.log('el gasto se agrego');
       }
       
       
       console.log('enviado');

})