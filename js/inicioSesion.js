

//AWS.config.update
//  region: "us-east-2",
  // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
 // endpoint: 'http://localhost:8000',
  /*
    accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB. 
    For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  */
 // accessKeyId: "fakeMyKeyId",
 // secretAccessKey: "fakeSecretAccessKey"
//

  /* 
     Uncomment the following code to configure Amazon Cognito and make sure to 
     remove the endpoint, accessKeyId and secretAccessKey specified in the code above. 
     Make sure Cognito is available in the DynamoDB web service region (specified above).
     Finally, modify the IdentityPoolId and the RoleArn with your own.
  */

//AWS.config.credentials = new AWS.CognitoIdentityCredentials
//IdentityPoolId: "us-west-2:12345678-1ab2-123a-1234-a12345ab12",
//RoleArn: "arn:aws:iam::123456789012:role/dynamocognito"

AWS.config.region = 'us-east-2'; // Región
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:7b407fd7-19f2-48ee-b302-38bbbbde19fe',
    RoleArn: "arn:aws:iam::374632472070:role/Cognito_ProyectoComponentesUnauth_Role"
});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function readItem() {
    var usuario=document.login.usuario.value; 
    var contrasenna=document.login.contrasenna.value; 
    var table="Usuarios";
   
    
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


let btnIniciarSesion = document.getElementById('btnIniciarSesion');
btnIniciarSesion.addEventListener('click', readItem);
