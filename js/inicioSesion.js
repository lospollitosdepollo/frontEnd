
AWS.config.region = 'us-east-2'; // Región
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:7b407fd7-19f2-48ee-b302-38bbbbde19fe',
    RoleArn: "arn:aws:iam::374632472070:role/Cognito_ProyectoComponentesUnauth_Role"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

let input_usuario = document.getElementById('txt_usuario');
let input_contrasenna = document.getElementById('txt_contrasenna');
let btnIniciarSesion = document.getElementById('btnIniciarSesion');
var table = {TableName : "Usuarios" }



let inicioSesion = async() =>{
   
    let usuario = input_usuario.value;
    let contrasenna = input_contrasenna.value;
    let error = validar(usuario,contrasenna)

    let usuario_aceptado = false;

    if(!error){
        usuario_aceptado = await table(usuario,contrasenna);
         if(usuario_aceptado){
            let usuarioActivo = JSON.parse(sessionStorage.getItem('activo'));
            if (usuarioActivo.estado == 'habilitado'){
                        window.location.href = 'inicio.html';
                 
            }else{
                Swal.fire({ //formato json
                    title: 'Error en el inicio de sesión',
                    type: 'warning',
                    text: 'Su cuenta está desabilitada'
                });
                sessionStorage.clear();
            }
            
        }else{
            Swal.fire({ //formato json
                title: 'Error en el inicio de sesión',
                type: 'warning',
                text: 'Revise los campos resaltados e inténtelo de nuevo'
            });
            input_correo.classList.add('invalido');
            input_contrasena.classList.add('invalido');
            sessionStorage.clear();
        }
    }
};
   
let validar = (pusuario, pcontrasenna) => {
    let error = false;

    if (pusuario == '') {
        error = true;
        input_usuario.classList.add('invalido');
    } else {
        input_usuario.classList.remove('invalido');
    }

    if (pcontrasenna == '') {
        error = true;
        input_contrasenna.classList.add('invalido');
    } else {
        input_contrasenna.classList.remove('invalido');
    }

    return error;
};


btnIniciarSesion.addEventListener('click', inicioSesion);
