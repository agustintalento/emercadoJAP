let articles = [];

//declaro variable con valor de conversion del dolar
let USDtoUYU = 40;


//funcion que importa artículos
function importCart(){
    
    let htmlContentToAppend= "";

    for(let i=0; i< articles.length; i++){
        let article = articles[i]; 
        let subprecio; //es el precio del articulo por la cantidad
        if(article.currency == "USD"){
            subprecio = article.unitCost*article.count * USDtoUYU; 
            //si la moneda del articulo no es pesos, la convierte
        }  else {
            subprecio = article.unitCost*article.count;
        }
        

        htmlContentToAppend += `
        <div class="row">
            <button class="close quitarArticulo" type="button" aria-label="Close">
                <span  aria-hidden="true">&times;</span>
            </button>
            <div class="col-2">
                <img class="img-thumbnail" src = ` + article.src + `></img>
            </div>
            <div class="col-sm">
                <h3> `  + article.name + `  </h3>
                <h5 id="precio"> ` + `Precio unitario: ` + ` ` + article.unitCost +  ` `  + article.currency +  ` </h4><br>
                
                <label > Cantidad:  
                <input class="cantidad" type="number" min="0" value="` + article.count + `" required><br>
                </label>
            
            </div>
            <div class"col- container">
                <h5 class="subprecio"> ` + subprecio.toLocaleString() + ` UYU  </h5>
                
            </div>
            </div>
            <hr class"container">
            
        `
    }
    document.getElementById("carta").innerHTML = htmlContentToAppend;  
        
   subtotalUpdate();

  
    //cuando cambia la cantitad de artículos se refleje en el total por artículo, en pesos
    let qty= document.getElementsByClassName("cantidad");
    let divPrecio= document.getElementsByClassName("subprecio");
    let botonQuitar = document.getElementsByClassName("quitarArticulo");

    for(let i=0; i< articles.length; i++){ 
       let article = articles[i];
       
        qty[i].addEventListener('input',  function() {
            article.count = qty[i].value;
            let subprecio; 
            if(article.currency == "USD"){
                subprecio = article.unitCost*article.count * USDtoUYU;
    
            }  else {
                subprecio = article.unitCost*article.count;
            }
            divPrecio[i].innerHTML = subprecio.toLocaleString() + " UYU";

            subtotalUpdate();
        });
        
        //evento que quita articulo del carrito
        botonQuitar[i].addEventListener('click', () => quitarArticulo(i));

    }

}

//funcion para actualizar subtotal(suma del total de todos los precios), el total y el costo de envio
function subtotalUpdate(){

    let envio = document.getElementById("envio");
    let subtotal = 0;
    for(let i= 0; i < articles.length; i++){
        let article = articles[i];
        let subprecio;
        if(article.currency == "USD"){
            subprecio = article.unitCost*article.count * USDtoUYU;

        }  else {
            subprecio = article.unitCost*article.count;
        }
        subtotal += subprecio;
       
    }

    let costoEnvio = envio.value * subtotal;
    let total = costoEnvio + subtotal;
    document.getElementById("subtotal").innerHTML = subtotal.toLocaleString() + " UYU";
    document.getElementById("costoEnvio").innerHTML = costoEnvio.toLocaleString() + " UYU";
    document.getElementById("total"). innerHTML = total.toLocaleString() + " UYU";

}

//quitar articulo del carrito
function quitarArticulo(i){

    articles.splice(i, 1);
    importCart();

}


//validación de los datos ingresados en la forma de pago
function cardFields(e) {


    var regexTarjeta = /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/; // 16 dígitos
    var regexFecha = /^((0[1-9])|(1[0-2]))\/(\d{2})$/; // mes/año
    var regexVerificador = /^([0-9]{3,4})$/; //3 o 4 dígitos
    var regexBank= /^\d{10,14}$/; //de 10 a 14 dígitos 

    var regexInputBank = document.getElementById("nroCuenta");
    var regexInputTarjeta = document.getElementById("tarjeta");
    var regexInputFecha = document.getElementById("fecha");
    var regexInputVerificador = document.getElementById("verificador");
    var inputValido = true;

    document.getElementById("demo").innerHTML = '';
    document.getElementById("demoVerificador").innerHTML = '';
    document.getElementById("demoFecha").innerHTML = '';
    
    if(document.getElementById("comprar")["pago"].value === "credito") {
        
        if (regexTarjeta.test(regexInputTarjeta.value)){
            document.getElementById("demo").innerHTML = '';
            } else {
            document.getElementById("demo").innerHTML = 'Nro. de tarjeta incorrecto';
            inputValido = false;
        }
        
        if (regexFecha.test(regexInputFecha.value)) {
            document.getElementById("demoFecha").innerHTML = '';
            } else {
            document.getElementById("demoFecha").innerHTML = 'Vencimiento incorrecto';
            inputValido = false;
        }

        
        if (regexVerificador.test(regexInputVerificador.value)) {
            
            document.getElementById("demoVerificador").innerHTML = '';
            } else {
            document.getElementById("demoVerificador").innerHTML = 'Código de seguridad de 3 o 4 dígitos';
            inputValido = false;
        }
    } else {
        if (regexBank.test(regexInputBank.value)) {
            document.getElementById("demo").innerHTML = '';
            } else {
            document.getElementById("demo").innerHTML = 'Ingrese Cuenta Bancaria correcta';
            inputValido = false;
        }
    }
    
    return inputValido;
   
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
          articles = resultObj.data.articles;
          importCart();
          
        };

    });

    //mensajes de campos incorrectos en 
    document.getElementById("fecha").addEventListener('input', cardFields);
    document.getElementById("tarjeta").addEventListener('input', cardFields);
    document.getElementById("verificador").addEventListener('input', cardFields);
    document.getElementById("nroCuenta") .addEventListener('input', cardFields);
    document.getElementById("transferencia").addEventListener('input', cardFields);
    document.getElementById("credito").addEventListener('input', cardFields);

    //deshabilito campos de cta. bancaria si selecciono opcion de tarjeta de crédito
    document.getElementById("credito").addEventListener('click', function() {
        if(document.getElementById("credito").checked = true){
            document.getElementById("fieldCredito").disabled = false;
            document.getElementById("fieldTransferencia").disabled = true ;
           
        }
       
    })

    //deshabilito campo de tarjeta de crédito, y habilito el de cta. bancaria
    document.getElementById("transferencia").addEventListener('click', function() {
    
        if(document.getElementById("transferencia").checked = true) {
            document.getElementById("fieldTransferencia").disabled = false;
            document.getElementById("fieldCredito").disabled = true;
        }
    
    })

    //actualizacion de total, subtotal y costo de envio cuando cambia el tipo de envio
    document.getElementById("envio").addEventListener('click', subtotalUpdate);


    //mensaje de compra realizada con exito
    document.getElementById("comprar").addEventListener("submit", function(evento){

        evento.preventDefault();
        if(cardFields()){
            getJSONData(CART_BUY_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    compra = resultObj.data.msg;
                    window.alert(compra);
                    $("#formaPago").modal('hide'); //esconde el modal
                    document.getElementById("comprar").submit();
                };
            
            });
        } 
        
       
    });

});


   