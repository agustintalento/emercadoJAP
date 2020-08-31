function logIn(evento) { 
    evento.preventDefault();   //detiene el submit del formulario
    sessionStorage.setItem('logueado', 'true');
    let user = document.getElementById("user").value;
    sessionStorage.setItem('mostrar-usuario', user);
    window.location.href = 'index.html';
    
    return true; //envia la información del submit despues de todo

    


}

function onSignIn(googleUser) {
       
    var profile = googleUser.getBasicProfile();
    
    
    //inicio de sesión con google id
    sessionStorage.setItem('logueado', 'true');
    sessionStorage.setItem('mostrar-usuario', profile.getGivenName()); //nombre usuario en barra
    window.location.href = 'index.html';

}



document.getElementById("log in").addEventListener("submit", logIn);
  

