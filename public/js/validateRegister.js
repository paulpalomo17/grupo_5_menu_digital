//------ VALIDACIONES DE REGISTRO DE USUARIOS ------// 
window.addEventListener('load', function() {
    const formulario = document.querySelector('#register-form');
    const btnForm = document.querySelector('#btn-registrar');
    const inputs = document.querySelectorAll('#register-form input');
    const selects = document.querySelectorAll('#register-form select');

    let campoFName = document.querySelector('#firstName');
    let ulFName = document.querySelector(".erroresFName");
    let campoLName = document.querySelector('#lastName');
    let ulLName = document.querySelector(".erroresLName");
    let campoEmail = document.querySelector('#email');
    let ulEmail = document.querySelector(".erroresEmail");
    let campoPassword = document.querySelector('#password');
    let ulPassword = document.querySelector(".erroresPassword");
    let campoCategory = document.querySelector('#category');
    let ulCategory = document.querySelector(".erroresCategory");
    let campoImage = document.querySelector('#image');
    let ulImage = document.querySelector(".erroresImage");

    const campos = {
        firstName : false,
        lastName : false,
        email : false,
        password : false,
        category : false,
        image : true
    }

    const expresiones = {
        email : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        image : /.(gif|jpeg|jpg|png)$/i
    }

    const validarFormulario = (e) =>{
        let errors = []
        switch (e.target.name){
            case "firstName":
                campoFName.classList.remove('is-invalid');
                campoFName.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value == ""){
                    errors.push("El campo no puede estar vacio");
                    campoFName.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    if(e.target.value.length < 2){
                        errors.push("El campo tiene que tener al menos 2 caracteres");
                        campoFName.classList.add('is-invalid');
                        campos[e.target.name] = false;
                    }else{
                        campoFName.classList.add('is-valid');
                        ulFName.innerHTML= ""
                        campos[e.target.name] = true;
                        document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                    }
                }

                if (errors.length > 0){
                    ulFName.innerHTML= ""
                    ulFName.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulFName.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
            case "lastName":
                campoLName.classList.remove('is-invalid');
                campoLName.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value == ""){
                    errors.push("El campo no puede estar vacio");
                    campoLName.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    if(e.target.value.length < 2){
                        errors.push("El campo tiene que tener al menos 2 caracteres");
                        campoLName.classList.add('is-invalid');
                        campos[e.target.name] = false;
                    }else{
                        campoLName.classList.add('is-valid');
                        ulLName.innerHTML= ""
                        campos[e.target.name] = true;
                        document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                    }
                }

                if (errors.length > 0){
                    ulLName.innerHTML= ""
                    ulLName.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulLName.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
            case "email":
                campoEmail.classList.remove('is-invalid');
                campoEmail.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value == ""){
                    errors.push("El campo no puede estar vacio");
                    campoEmail.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    if(!expresiones.email.test(e.target.value)){
                        errors.push("Email no valido");
                        campoEmail.classList.add('is-invalid');
                        campos[e.target.name] = false;
                    }else{
                        campoEmail.classList.add('is-valid');
                        ulEmail.innerHTML= ""
                        campos[e.target.name] = true;
                        document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                    }
                }
                console.log(campos);
                if (errors.length > 0){
                    ulEmail.innerHTML= ""
                    ulEmail.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulEmail.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
            case "password":
                campoPassword.classList.remove('is-invalid');
                campoPassword.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value == ""){
                    errors.push("El campo no puede estar vacio");
                    campoPassword.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    if(e.target.value.length < 8){
                        errors.push("El campo tiene que tener al menos 8 caracteres");
                        campoPassword.classList.add('is-invalid');
                        campos[e.target.name] = false;
                    }else{
                        campoPassword.classList.add('is-valid');
                        ulPassword.innerHTML= ""
                        campos[e.target.name] = true;
                        document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                    }
                }

                if (errors.length > 0){
                    ulPassword.innerHTML= ""
                    ulPassword.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulPassword.innerHTML += "<li>" + errors[i] + "</li>"
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
        }
    }

    const validarFormularioSelect = (e) =>{
        let errors = []
        switch (e.target.name){
            case "category":
                campoCategory.classList.remove('is-invalid');
                campoCategory.classList.remove('is-valid');
                document.querySelector(`.group-${e.target.name} i`).classList.remove('icon-check', 'fa-solid', 'fa-circle-check')
                if(e.target.value == ""){
                    errors.push("Debe seleccionar una opcion");
                    campoCategory.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    campoCategory.classList.add('is-valid');
                    ulCategory.innerHTML= ""
                    campos[e.target.name] = true;
                    document.querySelector(`.group-${e.target.name} i`).classList.add('icon-check', 'fa-solid', 'fa-circle-check')
                }

                if (errors.length > 0){
                    ulCategory.innerHTML= ""
                    ulCategory.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulCategory.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
        }
    }

    inputs.forEach((input) =>{
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    })

    selects.forEach((select) =>{
        select.addEventListener('change', validarFormularioSelect);
        select.addEventListener('blur', validarFormularioSelect);
    })

    btnForm.addEventListener('click', (e) =>{
        e.preventDefault();
        //console.log(campos.firstName + "&& " + campos.lastName + "&& " + campos.email + "&& " + campos.password + "&& " + campos.category + "&& " + campos.image);
        if(campos.firstName && campos.lastName && campos.email && campos.password && campos.category && campos.image){
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
});