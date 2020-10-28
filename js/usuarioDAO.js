

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




function RegistrarUsuario() {
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



function leerUsuario(   pcedula ) {

    var table = "Usuarios";
    var cedula = pcedula;

    var params = {
        TableName: table,
        Key:{
            "cedula": cedula
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

// ------------------------------------------------------------------------------- Otra Funciones ------------------------------------------------------------------------
// Funciones que no tengo ni idea para que funcionan pero las dejo a si.

function queryData() {
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Querying for movies from 1985.";

    var params = {
        TableName : "Movies",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames:{
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy":1985
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            data.Items.forEach(function(movie) {
                document.getElementById('textarea').innerHTML += "\n" + movie.year + ": " + movie.title;
            });
         
        }
    });
}

function scanData() {
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Scanning for movies between 1950 and 1975." + "\n";

    var params = {
        TableName: "Movies",
        ProjectionExpression: "#yr, title, info.rating",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":start_yr": 1950,
            ":end_yr": 1975
        }
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            // Print all the movies
            document.getElementById('textarea').innerHTML += "Scan succeeded: " + "\n";
            data.Items.forEach(function(movie) {
                document.getElementById('textarea').innerHTML += movie.year + ": " + movie.title + " - rating: " + movie.info.rating + "\n";
            });

            // Continue scanning if we have more movies (per scan 1MB limitation)
            document.getElementById('textarea').innerHTML += "Scanning for more..." + "\n";
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);            
        }
    }
}

function processFile(evt) {
    var moviesProcessed = 0;
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Importing movies into DynamoDB. Please wait..." + "\n";
    var file = evt.target.files[0];
    if (file) {
        var r = new FileReader();

        r.onload = function(e) {
            var contents = e.target.result;
            var allMovies = JSON.parse(contents);

            allMovies.forEach(function (movie) {

                var params = {
                    TableName: "Movies",
                    Item: {
                        "year": movie.year,
                        "title": movie.title,
                        "info": movie.info
                    }
                };
                docClient.put(params, function (err, data) {
                    ++moviesProcessed;
                    if (err) {
                        console.log("Unable to add movie: " + movie.title + "\n");
                    } else {
                        switch(moviesProcessed) {
                            case 2501:
                                document.getElementById('textarea').innerHTML += "_______________" + "\n";
                                document.getElementById('textarea').innerHTML += "Halfway done..." + "\n";
                                document.getElementById('textarea').innerHTML += "_______________" + "\n";
                                break;
                            case 3751:
                                document.getElementById('textarea').innerHTML += "______________" + "\n";
                                document.getElementById('textarea').innerHTML += "Almost done..." + "\n";
                                document.getElementById('textarea').innerHTML += "______________" + "\n";
                                break;
                            case 5001:
                                document.getElementById('textarea').innerHTML += "______________________" + "\n";
                                document.getElementById('textarea').innerHTML += "Finished processing!" + "\n";
                                document.getElementById('textarea').innerHTML += "______________________" + "\n";
                                break;
                            default: document.getElementById('textarea').innerHTML += "Added: " + movie.title + "\n";
                        }
                        textarea.scrollTop = textarea.scrollHeight;
                    }
                });
            });
    };
        r.readAsText(file);
    } else {
        alert("Could not read movie data file");
    }
}










