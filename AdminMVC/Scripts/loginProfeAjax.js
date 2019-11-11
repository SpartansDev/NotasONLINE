$('#frmLogin').submit(function (event) {
    event.preventDefault();
    login();
})

function login() {
    if (!($('#pemail').val() == "" || $('#pass').val() == "")) {
        var obj = {
            Email: $('#pemail').val(),
            Contraseña: $('#pass').val()
        }
        $.ajax({
            url: "/Home/Login",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp != null) {
                    location.href = "/Profesor/Perfil";
                }
            },
            error: function (err) {
                toastr.error('Correo o contraseña incorrectos');
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos");
    }
}

