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


var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                    </div>
                    <div>`+ product.cost + ` `+ product.currency + `</div> 
                    <div>` + product.description + `</div>

                </div>
            </div>
        </div>
        `



    };
    document.getElementById("productos").innerHTML = htmlContentToAppend; 
};




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    
getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        categoriesArray = resultObj.data;
        //Muestro las categorías ordenadas
        showCategoriesList(categoriesArray);
    };

});

});