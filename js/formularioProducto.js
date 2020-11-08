    }

    else {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Revisá los campos resaltados e intentalo de nuevo'
        })
    }

}

// Función para validar que los campos no estén vacíos
let validar = (pnombre, pdescripcion, pcondicion, pprecio, pcategoria, pprovincia, pcanton, pdistrito, 
    pdireccionexacta) => {

    let error = false;

    /*if (img_uploader_avatar.src == 'http://localhost:3000/public/imgs/item-placeholder.png') {
        error = true;
        img_uploader_avatar.classList.add('input_error');

    } else {
        img_uploader_avatar.classList.remove('input_error');
    } */

    if (pnombre == '') {
        error = true;
        nombre.classList.add('input_error');
    } else {
        nombre.classList.remove('input_error');
    }

    if (pdescripcion == '') {
        error = true;
        descripcion.classList.add('input_error');
    } else {
        descripcion.classList.remove('input_error');
    }

    if (pcondicion == '') {
        error = true;
        condicion.classList.add('input_error');
    }  else {
        condicion.classList.remove('input_error');
    }

    if (pprecio == '') {
        error = true;
        precio.classList.add('input_error');
    }  else {
        precio.classList.remove('input_error');
    }

    if (pcategoria == '') {
        error = true;
        categoria.classList.add('input_error');
    }  else {
        categoria.classList.remove('input_error');
    }

    if (pprovincia == '') {
        error = true;
        provincia.classList.add('input_error');
    } else {
        provincia.classList.remove('input_error');
    }

    if (pcanton == '') {
        error = true;
        canton.classList.add('input_error');
    } else {
        canton.classList.remove('input_error');
    }

    if (pdistrito == '') {
        error = true;
        distrito.classList.add('input_error');
    } else {
        distrito.classList.remove('input_error');
    }

    if (pdireccionexacta == '') {
        error = true;
        direccionexacta.classList.add('input_error');
    } else {
        direccionexacta.classList.remove('input_error');
    }

    return error;
};


//Función para limpiar el formulario
const limpiarFormulario = () => {

    nombre = '';
    descripcion = '';
    condicion = '';
    precio = '';
    categoria = '';
    canton = '';
    distrito = '';
    direccionexacta = ''; 
    fotografia = '';
    //img_uploader_avatar.src = '../imgs/avatar-placeholder.png';
};


let btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener('click', createItem);

