let articles = [];

//funcion que importa artículos
function importCart(){
    
    for(let i=0; i< articles.length; i++){
        let article = articles[i]; 
        let subprecio; //es el precio del articulo por la cantidad
        if(article.currency == "USD"){
            subprecio = article.unitCost*article.count * 40; 
            //si la moneda del articulo no es pesos, la convierte
        }  else {
            subprecio = article.unitCost*article.count;
        }

        document.getElementById("carta").innerHTML += `
        <div class="row">
            <div class="col-2">
                <img class="img-thumbnail" src = ` + article.src + `></img>
            </div>
            <div class="col-sm">
                <h3> `  + article.name + `  </h3>
                <h5 id="precio"> ` + `Precio unitario: ` + ` ` + article.unitCost +  ` `  + article.currency +  ` </h4><br>
                
                <label > Cantidad:  
                <input class="cantidad" type="number" min="0" value="` + article.count + `"></input>
                </label>
            
            </div>
            <div class"col- container">
                <h5 class="subprecio"> ` + subprecio.toLocaleString() + ` UYU  </h5> 
            </div>
            </div>
            <hr class"container">
            
        `
       
        
       
    }
        
        
   subtotalUpdate();

  
    //cuando cambia la cantitad de artículos se refleje en el total por artículo, en pesos
    let qty= document.getElementsByClassName("cantidad");
    let divPrecio= document.getElementsByClassName("subprecio");

    for(let i=0; i< articles.length; i++){ 
       let article = articles[i];
       
        qty[i].addEventListener('input',  function() {
            article.count = qty[i].value;
            let subprecio; 
            if(article.currency == "USD"){
                subprecio = article.unitCost*article.count * 40;
    
            }  else {
                subprecio = article.unitCost*article.count;
            }
            divPrecio[i].innerHTML = subprecio.toLocaleString() + " UYU";

            subtotalUpdate();
        });
        
        

    }

}
//funcion para actualizar subtotal(suma del total de todos los precios)
function subtotalUpdate() { 
    let subtotal = 0;
        for(let i= 0; i < articles.length; i++){
            let article = articles[i];
            let subprecio;
            if(article.currency == "USD"){
                subprecio = article.unitCost*article.count * 40;
    
            }  else {
                subprecio = article.unitCost*article.count;
            }
            subtotal += subprecio;
            document.getElementById("subtotal").innerHTML = subtotal.toLocaleString() + " UYU";
        }

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

    //mensaje de compra realizada con exito

    document.getElementById("comprar").addEventListener("submit", function(evento){

        evento.preventDefault();
        getJSONData(CART_BUY_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                compra = resultObj.data.msg;
                window.alert(compra);
            
            };
        
        });
    });

});