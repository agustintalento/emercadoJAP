function detenerEvento(evento) { //detiene el submit del formulario
    evento.preventDefault();
    sessionStorage.setItem('logueado', 'true');
    window.location.href = 'index.html';
    return true; //envia la información del submit despues de todo
};


document.getElementById("log in").addEventListener("submit", detenerEvento);
   