

// Esto es un experimento por ahora. Es para cmabiar los textos.

document.getElementById("p_Usuario").innerHTML = "HelloKitty300";


// document.getElementById("p_Nombre").innerHTML = "Ramón Pedro Los Palotes";



// Aca va el usuario que tiene la sesión activa.
var pUsuarioSesion = "117390748";

// var infoUsuario = new usuarioDAO();




// Aca se concatenan y se actualizan los datos para desplegarse en la sección de perfil.
function actualizarDatosPerfil( pUsuarioSesion ) {

    var primerNombre = formulario.leerUsuario(pUsuarioSesion);
// var primerNombre = infoUsuario.leerUsuario(pUsuarioSesion);
console.log(primerNombre);

document.getElementById("p_Nombre").innerHTML = "funciono el botonsillo";
}

// Boton Buscar, pero de momento es para probar el update del perfil.
let btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', actualizarDatosPerfil);