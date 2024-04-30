//------ VALIDACIONES DE UN PRODUCTO ------// 
window.addEventListener('load', function() {
    const formulario = document.querySelector('#create-form');
    const btnForm = document.querySelector('.boton-form');
    const inputs = document.querySelectorAll('#create-form input');
    const selects = document.querySelectorAll('#create-form select');
    const textarea = document.querySelector('#description');

    let campoName = document.querySelector('#name');
    let ulName = document.querySelector(".erroresName");
    let campoDescription = document.querySelector('#description');
    let ulDescription = document.querySelector(".erroresDescription");
    let campoImage = document.querySelector('#image');
    let ulImage = document.querySelector(".erroresImage");
    let campoCategory = document.querySelector('#category');
    let campoType = document.querySelector('#type');
    let ulType = document.querySelector(".erroresType");
    let campoPrice = document.querySelector('#price');
    let ulPrice = document.querySelector(".erroresPrice");

    const campos = {
        name : false,
        description : false,
        image : true,
        type: false,
        price: false
    }

    const expresiones = {
        image : /.(gif|jpeg|jpg|png)$/i,
        price : /^([0-9])*$/
    }

    const validarDescripcion = (e) =>{
        let errors = []
        campoDescription.classList.remove('is-invalid');
        campoDescription.classList.remove('is-valid');
        document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
        if(e.target.value == ""){
            errors.push("El campo no puede estar vacio");
            campoDescription.classList.add('is-invalid');
            campos[e.target.name] = false;
        }else{
            if(e.target.value.length < 20){
                errors.push("El campo tiene que tener al menos 20 caracteres");
                campoDescription.classList.add('is-invalid');
                campos[e.target.name] = false;
            }else{
                campoDescription.classList.add('is-valid');
                ulDescription.innerHTML= ""
                campos[e.target.name] = true;
                document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
            }
        }

        if (errors.length > 0){
            ulDescription.innerHTML= ""
            ulDescription.classList.add('alert-warning')
            for (let i = 0; i < errors.length; i++) {
                ulDescription.innerHTML += "<li>" + errors[i] + "</li>"
            }
        }
    }

    const validarFormulario = (e) =>{
        let errors = []
        switch (e.target.name){
            case "name":
                campoName.classList.remove('is-invalid');
                campoName.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value == ""){
                    errors.push("El campo no puede estar vacio");
                    campoName.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    if(e.target.value.length < 5){
                        errors.push("El campo tiene que tener al menos 5 caracteres");
                        campoName.classList.add('is-invalid');
                        campos[e.target.name] = false;
                    }else{
                        campoName.classList.add('is-valid');
                        ulName.innerHTML= ""
                        campos[e.target.name] = true;
                        document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                    }
                }

                if (errors.length > 0){
                    ulName.innerHTML= ""
                    ulName.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulName.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
            case "image":
                campoImage.classList.remove('is-invalid');
                campoImage.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value != "" && !expresiones.image.test(e.target.value)){
                    errors.push("Las extensiones del archivo tienen que ser .jpg, .jpeg, .png o .gif");
                    campoImage.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    campoImage.classList.add('is-valid');
                    ulImage.innerHTML= ""
                    campos[e.target.name] = true;
                    document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                }

                if (errors.length > 0){
                    ulImage.innerHTML= ""
                    ulImage.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulImage.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
            case "price":
                campoPrice.classList.remove('is-invalid');
                campoPrice.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value == ""){
                    errors.push("El campo no puede estar vacio");
                    campoPrice.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    if(!expresiones.price.test(e.target.value)){
                        errors.push("El campo tiene que ser numerico");
                        campoPrice.classList.add('is-invalid');
                        campos[e.target.name] = false;
                    }else{
                        campoPrice.classList.add('is-valid');
                        ulPrice.innerHTML= ""
                        campos[e.target.name] = true;
                        document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                    }
                }

                if (errors.length > 0){
                    ulPrice.innerHTML= ""
                    ulPrice.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulPrice.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
        }
    }

    const validarFormularioSelect = (e) =>{
        let errors = []
        switch (e.target.name){
            case "category":
                campoCategory.classList.add('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
            break;
            case "type":
                campoType.classList.remove('is-invalid');
                campoType.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value == ""){
                    errors.push("Debe seleccionar una opcion");
                    campoType.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    campoType.classList.add('is-valid');
                    ulType.innerHTML= ""
                    campos[e.target.name] = true;
                    document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                }

                if (errors.length > 0){
                    ulType.innerHTML= ""
                    ulType.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulType.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
        }
    }

    inputs.forEach((input) =>{
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    })

    textarea.addEventListener('keyup', validarDescripcion);
    textarea.addEventListener('blur', validarDescripcion);

    selects.forEach((select) =>{
        select.addEventListener('change', validarFormularioSelect);
        select.addEventListener('blur', validarFormularioSelect);
    })

    btnForm.addEventListener('click', (e) =>{
        e.preventDefault();
        if(campos.name && campos.description && campos.image && campos.type && campos.price){
            Swal.fire({
                title: "Se guardo correctamente!",
                icon: "success",
                showConfirmButton: false,
                timer: 50000
            });
            formulario.submit(); //Reanudamos el evento del submit.
        }else{
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor rellena el formulario correctamente",
            });
        }
    })
})