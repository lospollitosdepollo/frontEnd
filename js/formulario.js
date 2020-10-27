
AWS.config.region = 'us-east-2'; // Región
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:7b407fd7-19f2-48ee-b302-38bbbbde19fe',
    RoleArn: "arn:aws:iam::374632472070:role/Cognito_ProyectoComponentesUnauth_Role"
});


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
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
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
            "cedula": document.getElementById('txt_cedula'),
            "primernombre": document.getElementById('txt_primer_nombre'),
            "segundonombre": document.getElementById('txt_segundo_nombre'),
            "primerapellido": document.getElementById('txt_primer_apellido'),
            "segundoapellido": document.getElementById('txt_segundo_apellido'),
            "email": document.getElementById('txt_email'),
            "usuario": document.getElementById('txt_usuario'),
            "contrasenna": document.getElementById('txt_contrasenna'),
            "edad": document.getElementById('txt_edad'),
            "pais": "Costa Rica",
            "canton": document.getElementById('txt_canton'),
            "distrito": document.getElementById('txt_distrito'),
            "direccionexacta":document.getElementById('txt_direccionexacta') 
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


let btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener('click', createItem);
