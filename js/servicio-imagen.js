$(function() {
    let imagenUrl = '';
    
    //ConfiguracionCloudinary
    //with credentials available on
    // your cloudinary account dashboard
    $.cloudinary.config({cloud_name: 'pollitos', api_key: '739669841412784'});
    
    //Upload button
    let uploaButton = $('#btnSeleccionarImagen');
    
    //Upload button event
    uploaButton.on('click', function(e){
            //Initiate upload
            cloudinary.openUploadWidget({cloud_name: 'pollitos', upload_preset: 'uploaduser', tags:['cgal']},
            function(error, result){
                if(error) console.log(error);
                //if no Error, log img data to console
                let id = result[0].public_id;

                imagenUrl = 'https://res.cloudinary.com/pollitos/image/upload/' + id;
                document.querySelector('#imagen').src = imagenUrl;
            });    
        });
  
    })
    
    function processImage(id) {
        let options = {
            client_hints: true,
        };
        return $.cloudinary.url(id, options);
    };

    