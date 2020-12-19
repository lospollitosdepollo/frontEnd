// Variables de cloudinary
const imgpreview = document.getElementById('img_preview');
const uploader_avatar = document.getElementById('img_uploader_imagen');
const progress_bar = document.getElementById('progress_bar');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/pollitos/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'icstnrqx';

AWS.config.region = 'us-east-2'; // Región
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:7b407fd7-19f2-48ee-b302-38bbbbde19fe',
    RoleArn: "arn:aws:iam::374632472070:role/Cognito_ProyectoComponentesUnauth_Role"});


var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


let nombre = document.getElementById('txt_nombre');
let descripcion = document.getElementById('txt_descripcion');
let condicion = document.getElementById('txt_condicion');
let precio = document.getElementById('txt_precio');
let categoria = document.getElementById('txt_categoria');
let pais = document.getElementById('txt_pais');
let provincia = document.getElementById('txt_provincia');
let canton = document.getElementById('txt_canton');
let distrito = document.getElementById('txt_distrito');
let direccionexacta = document.getElementById('txt_direccion_exacta');
const fotografia = document.querySelector('#imagen');


// Funcion para crear Productos

function createItem() {
    let error = validar(nombre, descripcion, condicion, precio, categoria, provincia, canton, distrito, direccionexacta);
    
    if(error == false) {
        var params = {
            TableName :"Productos",
            Item:{
                //"idProducto": producto.value, autoincrementable??
                "nombre": nombre.value,
                "descripcion": descripcion.value,
                "condicion": condicion.value,
                "precio": Number(precio.value),
                "categoria": categoria.value,
                "pais": "Costa Rica",
                "provincia": provincia.value,
                "canton": canton.value,
                "distrito": distrito.value,
                "direccionexacta": direccionexacta.value,
               // "fotografia": fotografia.value,
                "estado": "Disponible"
            }
            
        };
        docClient.put(params, function(err, data) {
            if (err) {
             //   document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
            alert(JSON.stringify(err, undefined, 2));
            } else {
            //    document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
           alert(JSON.stringify(data, undefined, 2));
            alert("Usuario Creado");    
        }
        });
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

