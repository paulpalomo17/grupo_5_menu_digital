//------ VALIDACIONES DE LOGIN ------// 
window.addEventListener('load', function() {
    const formulario = document.querySelector('#login-form');
    const btnForm = document.querySelector('#btn-login');
    const inputs = document.querySelectorAll('#login-form input');

    let campoEmail = document.querySelector('#email');
    let ulEmail = document.querySelector(".erroresEmail");
    let campoPassword = document.querySelector('#password');
    let ulPassword = document.querySelector(".erroresPassword");

    const campos = {
        email : false,
        password : false
    }

    const expresiones = {
        email : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }

    const validarFormulario = (e) =>{
        let errors = []
        switch (e.target.name){
            case "email":
                campoEmail.classList.remove('is-invalid');
                campoEmail.classList.remove('is-valid');
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
                    }
                }
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
                if(e.target.value == ""){
                    errors.push("El campo no puede estar vacio");
                    campoPassword.classList.add('is-invalid');
                    campos[e.target.name] = false;
                }else{
                    campoPassword.classList.add('is-valid');
                    ulPassword.innerHTML= ""
                    campos[e.target.name] = true;
                }

                if (errors.length > 0){
                    ulPassword.innerHTML= ""
                    ulPassword.classList.add('alert-warning')
                    for (let i = 0; i < errors.length; i++) {
                        ulPassword.innerHTML += "<li>" + errors[i] + "</li>"
                    }
                }
            break;
        }
    }

    inputs.forEach((input) =>{
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    })

    btnForm.addEventListener('click', (e) =>{
        e.preventDefault();
        if(campos.email && campos.password){
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