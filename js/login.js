function detenerEvento(evento) { //detiene el submit del formulario
    evento.preventDefault();
    sessionStorage.setItem('logueado', 'true');
    let user = document.getElementById("user").value;
    sessionStorage.setItem('mostrar-usuario', user);
    window.location.href = 'index.html';
    
    return true; //envia la información del submit despues de todo

    


}
function onSignIn(googleUser) {
       
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    //inicio de sesión con google id
    sessionStorage.setItem('logueado', 'true');
    window.location.href = 'index.html';

}

document.getElementById("log in").addEventListener("submit", detenerEvento);
  

