

AWS.config.region = 'us-east-2'; // Región
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:7b407fd7-19f2-48ee-b302-38bbbbde19fe',
    RoleArn: "arn:aws:iam::374632472070:role/Cognito_ProyectoComponentesUnauth_Role"
});


var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


let cedula = document.getElementById('txt_cedula');
let primernombre = document.getElementById('txt_primer_nombre');
let segundonombre = document.getElementById('txt_segundo_nombre');
let primerapellido = document.getElementById('txt_primer_apellido');
let segundoapellido = document.getElementById('txt_segundo_apellido');
let email = document.getElementById('txt_email');
let usuario = document.getElementById('txt_usuario');
let contrasenna = document.getElementById('txt_contrasenna');
let edad = document.getElementById('txt_edad');
let canton = document.getElementById('txt_canton');
let distrito = document.getElementById('txt_distrito');
let direccionexacta = document.getElementById('txt_direccion_exacta');



function crearUsuario() {
    var params = {
        TableName :"Usuarios",
        Item:{
            "cedula": Number(cedula.value),
            "primernombre": primernombre.value,
            "segundonombre": segundonombre.value,
            "primerapellido": primerapellido.value,
            "segundoapellido": segundoapellido.value,
            "email": email.value,
            "usuario": usuario.value,
            "contrasenna": contrasenna.value,
            "edad": edad.value,
            "pais": "Costa Rica",
            "canton": canton.value,
            "distrito": distrito.value,
            "direccionexacta": direccionexacta.value
        }
        
    };

    if(cedula.value){
        cedula.classList.remove('invalido');
        cedula.classList.add('valido');
    }else if(cedula.value === '') {
        cedula.classList.remove('valido');
        cedula.classList.add('invalido');
    }

    if(primernombre.value){
        primernombre.classList.remove('invalido');
        primernombre.classList.add('valido');
    }else if(primernombre.value === '') {
        primernombre.classList.remove('valido');
        primernombre.classList.add('invalido');
    }

    if(primerapellido.value){
        primerapellido.classList.remove('invalido');
        primerapellido.classList.add('valido');
    }else if(primerapellido.value === '') {
        primerapellido.classList.remove('valido');
        primerapellido.classList.add('invalido');
    }

    if(segundoapellido.value){
     segundoapellido.classList.remove('invalido');
     segundoapellido.classList.add('valido');
    }else if(segundoapellido.value === '') {
        segundoapellido.classList.remove('valido');
        segundoapellido.classList.add('invalido');
    }
 
    if(email.value){
        email.classList.remove('invalido');
        email.classList.add('valido');
    }else if(email.value === '') {
        email.classList.remove('valido');
        email.classList.add('invalido');
    }

    if(usuario.value){
        usuario.classList.remove('invalido');
        usuario.classList.add('valido');
    }else if(usuario.value === '') {
        usuario.classList.remove('valido');
        usuario.classList.add('invalido');
    }

    if(contrasenna.value){
        contrasenna.classList.remove('invalido');
        contrasenna.classList.add('valido');
    }else if(contrasenna.value === '') {
        contrasenna.classList.remove('valido');
        contrasenna.classList.add('invalido');
    }

    if(edad.value){
        edad.classList.remove('invalido');
        edad.classList.add('valido');
    }else if(edad.value === '') {
        edad.classList.remove('valido');
        edad.classList.add('invalido');
    }

    if(canton.value){
        canton.classList.remove('invalido');
        canton.classList.add('valido');
    }else if(canton.value === '') {
        canton.classList.remove('valido');
        canton.classList.add('invalido');
    }

    if(distrito.value){
        distrito.classList.remove('invalido');
        distrito.classList.add('valido');
    }else if(distrito.value === '') {
        distrito.classList.remove('valido');
        distrito.classList.add('invalido');
    }

    if(direccionexacta.value){
        direccionexacta.classList.remove('invalido');
        direccionexacta.classList.add('valido');
    }else if(direccionexacta.value === '') {
        direccionexacta.classList.remove('valido');
        direccionexacta.classList.add('invalido');
    }
 

    docClient.put(params, function(err, data) {
        if (err) {
         //   document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
        console.log(JSON.stringify(err, undefined, 2));

        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El usuario no ha sido creado,revise los espacios en blanco',
            confirmButtonText: `Volver al Inicio`,
            showConfirmButton: false,
            timer: 1000
            
          })   
          form.reset();
        
        
        } else {
        //    document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
       console.log(JSON.stringify(data, undefined, 2));

       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El usuario ha sido creado',
        showConfirmButton: false,
        timer: 1000
        
      })   
      form.reset();
    }

    });
}

function BorrarTablaUsuario() {
    var params = {
        TableName : "Usuarios"
    };

    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to delete table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "Table deleted.";
        }
    });
}


function listarUsuarios() {
    var params = {};
    dynamodb.listTables(params, function(err, data) {
    if (err){
        document.getElementById('textarea').innerHTML = "Unable to list tables: " + "\n" + JSON.stringify(err, undefined, 2);
    }
    else{
     document.getElementById('textarea').innerHTML = "List of tables: " + "\n" + JSON.stringify(data, undefined, 2);
    }
});
}



function leerUsuario(pusuario,pcontrasenna ) {

    var table = "Usuarios";
    var usuario = pusuario;
    var contrasenna = pcontrasenna;

    var params = {
        TableName: table,
        Key:{
            "usuario": usuario,
            "contrasenna": contrasenna
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}


function modificarUsuario(  pcedula) {

    var table = "Usuarios";
    var cedula = pcedula;

    var params = {
        TableName:table,
        Key:{

            "cedula": cedula
        },
        UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
        ExpressionAttributeValues:{
            ":r":5.5,
            ":p":"Everything happens all at once.",
            ":a":["Larry", "Moe", "Curly"]
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to update item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "UpdateItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function borrarUsuario(pcedula) {
    var table = "Usuarios";

    var cedula = pcedula;

    var params = {
        TableName:table,
        Key:{

            "cedula": cedula
        }
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to delete item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "DeleteItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
} 


let btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener('click', crearUsuario);







