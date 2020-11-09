var getJSONData = function(url){
    var result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
};


var productsArray = [];


//ordeno precios ascendente y descendente

function precioAscendente() {
    productsArray = productsArray.sort(function (a, b) { //funcion que ordena de forma ascendente
        return a.cost - b.cost;
    })
    //showproductsList(productsArray);
    showCards(productsArray);

}

function precioDescendente() {
    productsArray = productsArray.sort(function (a, b) { //funcion que ordena de forma descendente
        return b.cost - a.cost;
    })
    //showproductsList(productsArray);
    showCards(productsArray);

}

function ordenoRelevancia() {
    productsArray = productsArray.sort(function (a, b) { 
        return b.soldCount - a.soldCount; //misma funcion ordena descendente, pero esta vez por art. vendidos
    })
    //showproductsList(productsArray);
    showCards(productsArray);
}

 

//filtro por precio mínimo y máximo 
function filtro(array) {
    let precioMin = document.getElementById("precioMin").value;
    let precioMax = document.getElementById("precioMax").value;
    if (precioMin == "") { //si el precio mínimo esta vacío, lo seteo en 0
        precioMin = 0;
    }
    if (precioMax == "") { //si el precio max esta vacio y si tiene precio min que me busque con esa base
        return array.filter(filtrados => (filtrados.cost >= precioMin));
    } else {

        return array.filter(filtrados => (filtrados.cost >= precioMin) && (filtrados.cost <= precioMax));
    }
};

//boton limpiar

function limpiar() {
    document.getElementById("precioMin").value = "";
    document.getElementById("precioMax").value = "";
    
   // showproductsList(productsArray);
   showCards(productsArray);
}

//muestro los productos

function showproductsList(array){
    
    let htmlContentToAppend = "";
    let filterProducts = filtro(array);
    for(let i = 0; i < filterProducts.length; i++){
        let product = filterProducts[i];
        

        htmlContentToAppend += `
        <a href="product-info.html?name=`+ product.name + `" class="list-group-item list-group-item-action noborder">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <span style="font-size: 22px; font-family: arial">`+ product.currency + ` ` + product.cost + ` </span>
                    </div>
                    
                    <div>` + product.description + `</div>

                </div>
            </div>
        </div>
        `
    }

    document.getElementById("productos").innerHTML = htmlContentToAppend; 
}

function showCards(array) {

    let htmlContentToAppend = "";
    let filterProducts = filtro(array);
    for(let i = 0; i < filterProducts.length; i++){
        let product = filterProducts[i];
        

        htmlContentToAppend += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card">
                    <a href="product-info.html?name=`+ product.name + `" class="list-group-item list-group-item-action noborder">
                        <img class="card-img-top" src="` + product.imgSrc + `" alt="` + product.desc + `">
                        <div class="card-body">
                            <h5 class="card-title">`+ product.name +`</h5>
                            <p class="card-text">` + product.description + `</p>
                            <h5 class="card-title">`+ product.currency + ` ` + product.cost + `</h5>
                        </div>
                    </a>
                </div>
            </div>
        `



    };
    document.getElementById("productos").innerHTML = htmlContentToAppend; 

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las productos 
            //showproductsList(productsArray);
            showCards(productsArray);
    };

});


//creo un evento en el cual se filtran los productos al clickear el boton filtrar
document.getElementById("filter").addEventListener('click', () => showCards(productsArray) );

//evento para limpiar los parametros del filtro
document.getElementById("limpiar").addEventListener('click', limpiar );
});

//evento para ordenar precio de forma ascendente
document.getElementById("sortMayor").addEventListener('click', precioDescendente);

//evento para ordenar precio de forma descendente
document.getElementById("sortMenor").addEventListener('click', precioAscendente);

//evento para ordenar por relevancia
document.getElementById("relevancia").addEventListener('click', ordenoRelevancia);
