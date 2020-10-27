
AWS.config.region = 'us-east-2'; // Región
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:7b407fd7-19f2-48ee-b302-38bbbbde19fe',
    RoleArn: "arn:aws:iam::374632472070:role/Cognito_ProyectoComponentesUnauth_Role"
});

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
let direccionexacta = document.getElementById('txt_direccionexacta');

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
function createUsers() {
    var params = {
        TableName : "Usuarios1",
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH"},
            { AttributeName: "cedula", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [       
            { AttributeName: "id", AttributeType: "N" },
            { AttributeName: "cedula", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 50,
            WriteCapacityUnits: 50
        }
    };

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to create table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "Created table: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function createItem() {
    var params = {
        TableName :"Usuarios1",
        Item:{
            "id": 0,
            "cedula": cedula,
            "primernombre": primernombre,
            "segundonombre": segundonombre,
            "primerapellido": primerapellido,
            "segundoapellido": segundoapellido,
            "email": email,
            "usuario": usuario,
            "contrasenna": contrasenna,
            "edad": edad,
            "pais": "Costa Rica",
            "canton": canton,
            "distrito": distrito,
            "direccionexacta": direccionexacta
        }
        
    };
    docClient.put(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}


