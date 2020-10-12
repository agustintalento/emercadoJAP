var newCommentScore = 1;

//muestro productos con su informacion

function showproductInfo(productInfo){

    document.getElementById("prodName").innerHTML = decodeURIComponent(window.location.search.substring(1).slice(5));
    document.getElementById("productCost").innerHTML = productInfo.currency + ' ' + productInfo.cost;
    document.getElementById("prodescription").innerHTML= productInfo.description;
    document.getElementById("soldC").innerHTML = productInfo.soldCount;
    document.getElementById("categorie").innerHTML = productInfo.category + ' vendidos';

    //carousel
    
    document.getElementById("slider").innerHTML = `
    <div id="carousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carousel" data-slide-to="0" class="active"></li>
            <li data-target="#carousel" data-slide-to="1"></li>
            <li data-target="#carousel" data-slide-to="2"></li>
            <li data-target="#carousel" data-slide-to="3"></li>
            <li data-target="#carousel" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="` + productInfo.images[0] + `" alt="">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="` + productInfo.images[1] + `" alt="">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="` + productInfo.images[2] + `" alt="">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="` + productInfo.images[3] + `" alt="">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="` + productInfo.images[4] + `" alt="">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
  </div>
`  
            
}

//cambiar imagen principal
function changeImg(event, index){
    event.preventDefault(); //que no siga el link cuando clickeas imagen
    //para que quede el carousel cuando cambias de imagen

    var imagesList = document.getElementById("slider").getElementsByClassName("carousel-item");
    var activeImg = document.getElementById("slider").querySelector(".carousel-item.active");
    activeImg.classList.remove("active");
    imagesList[index].classList.add("active");

    //para que el indicador coincida con el numero de imagen
    var indicators = document.querySelector("ol.carousel-indicators");
    indicators.querySelector(".active").classList.remove("active");
    indicators.getElementsByTagName("li")[index].classList.add("active");
}

//mostrar imagenes pequeñas
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        //cambio de imagen pequeña a grande
        htmlContentToAppend += `
        <a href='#' onclick="changeImg(event, ` + i + `)" class="col-lg-3 col-md-4 col-6"> 
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </a>
        `

        document.getElementById("lilimages").innerHTML = htmlContentToAppend;
    }
}

//muestro comentarios debajo de la imagen
function showComments(comments){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < comments.length; i++){
        let comment = comments[i];
        htmlContentToAppend += `

       
            
            <div class="row d-flex justify-content-between"><span class="uname"> ` + comment.user + `</span><span class="commentdate"> ` + dateString(new Date(comment.dateTime)) + `</span></div>
            <div class="row"> `  + rating(comment.score) + ` </div><br>
            <div class="row"> ` + comment.description + ` </div><br>
            
        
        `
    }

    document.getElementById('comments').innerHTML = htmlContentToAppend;
}

//rating con estrellas
function rating(score){
    let schecked = "<span class='fa fa-star checked'></span>";
    let sunchecked = "<span class='fa fa-star'></span>";
    return schecked.repeat(score) + sunchecked.repeat(5-score);

}

//funcion para marcar estrellas a comentar
function starmark(element){
     
    newCommentScore = parseInt(element.id); //pasa numero de id a valor numerico
    let estrellas = document.getElementById("ratingestrellas").children; //lista de span

    for(let i= 0; i< newCommentScore; i++){ //funcion que marca estrellas
        estrellas[i].classList.add("checked");   
    }
    //para que se desmarquen las que se marcaron pero no condicen con mi rating
    for(let i= newCommentScore; i< 5; i++){
        estrellas[i].classList.remove("checked");
    }

}

//funcion para pasar fecha(objeto) a fecha(string)
function dateString(dateObj){
    date = dateObj.toISOString();
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0,4) + " " + date.slice(11, 13) + ":" + date.slice(14, 16);
    
}

//usuario deja el comentario

function newComment(event) {
    event.preventDefault();

    let userComment = document.getElementById("userComment");
    
    document.getElementById("comments").innerHTML += ` 

    <div class="row d-flex justify-content-between"><span class="uname"> ` + nombreUsuario  + `</span><span class="commentdate"> ` + dateString(new Date) + `</span></div>
    <div class="row"> `  + rating(newCommentScore) + ` </div><br>
    <div class="row"> ` + userComment["textareaComment"].value + ` </div><br> 


    `
    userComment["textareaComment"].value = ""; //limpio el area de comentarios
}


//muestro los productos relacionados
function relatedProducts(relatedProduct) {

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let htmlContentToAppend = "";
            for(let i = 0; i < relatedProduct.length; i++){
                let product = resultObj.data[relatedProduct[i]];
                    htmlContentToAppend += ` 
                    <a href = "product-info.html?name=`+ product.name + `" class="list-group-item list-group-item-action col-4">
                    <img  src=" ` + product.imgSrc + `" class="img-thumbnail"> 
                    <h3> ` + product.name + ` </h3><br>
                    <p> ` + product.currency + ` ` +  product.cost + ` </p>

                    </a>
                `
            }

            document.getElementById('relatedProducts').innerHTML = htmlContentToAppend;
        };

    });
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showproductInfo(resultObj.data);
            showImagesGallery(resultObj.data.images);
            relatedProducts(resultObj.data.relatedProducts);
        };
    
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {   
            showComments(resultObj.data);
        };
    
    });

    document.getElementById("userComment").addEventListener("submit", newComment);

});

