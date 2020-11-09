
function editProfile() {

    document.getElementById("contenedorPerfil").innerHTML += `
        <div class="modal fade" id="editarPerfil" tabindex="-1" role="dialog" aria-labelledby="editarPerfil" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Perfil</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="formPerfil" class="container">
                            <input id="nombreModal" type="text" placeholder="Nombre completo" required><br><br>
                            <input id="edadModal" type="text" placeholder="Edad"><br><br>
                            <input id="mailModal" type="email" placeholder="E-mail" required><br><br>
                            <input id="telefonoModal" type="text" placeholder="Teléfono" required>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button form="formPerfil" id="guardarCambios" type="submit" class="btn btn-primary">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    
    `
 

    document.getElementById("guardarCambios").addEventListener('click', dataStorage);

}


function dataStorage() {

    var nombreModal = document.getElementById("nombreModal");
    var edadModal = document.getElementById("edadModal");
    var mailModal = document.getElementById("mailModal");
    var telefonoModal = document.getElementById("telefonoModal");

    var perfil = { 
        nombre :  nombreModal.value ,
        edad : edadModal.value ,
        mail : mailModal.value ,
        telefono : telefonoModal.value 
    };

    
    localStorage.setItem("userProfile", JSON.stringify(perfil));

    

    if(document.getElementById("formPerfil").reportValidity()){

        showProfile();
        $("#editarPerfil").modal('hide');
    }
}

function showProfile() {
    var userData = JSON.parse(localStorage.getItem("userProfile"));

    nombre.innerHTML = userData.nombre;
    edad.innerHTML = userData.edad;
    mail.innerHTML = userData.mail;
    telefono.innerHTML = userData.telefono;

}

function checkData() {

    if(localStorage.getItem("userProfile") === null) {

        var perfil = { 
            nombre :  "" ,
            edad : "" ,
            mail : "" ,
            telefono : "" 
        };
    
        localStorage.setItem("userProfile", JSON.stringify(perfil));    

    }
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let nombre = document.getElementById("nombre");
    let edad = document.getElementById("edad");
    let mail = document.getElementById("mail");
    let telefono = document.getElementById("telefono");

    checkData();
    showProfile();
    document.getElementById("botonEditarPerfil").addEventListener('click', editProfile); 


});