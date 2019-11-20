$(document).ready(function () {
    AdminNoExist();
});

$('#frmlogin').submit(function (event) {
    event.preventDefault();
    login();
});

$('#frmAdmin').submit(function (event) {
    event.preventDefault();
    Guardar();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function login() {
    if (!($('#pemail').val() == "" || $('#pass').val() == "")) {
        var obj = {
            Email: $('#pemail').val(),
            Contraseña: $('#pass').val()
        }
        $.ajax({
            url: "/Home/Inicio",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp != null) {
                    location.href = "/Grupo/Index";
                }
            },
            error: function (err) {
                toastr.error('Correo o contraseña incorrectos.');
            }
        });
    } else {
        toastr.warning('Todos los campos son requeridos.');
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Guardar() {
    if ($("#mid").val()== "") {
        if (!($('#mnombre').val() == "" || $('#mapellido').val() == "" || $('#memail').val() == "" || $('#mpass').val() == "")) {
            var obj = {
                Id: $('#mid').val(),
                NombreAdministrador: $('#mnombre').val(),
                ApellidoAdministrador: $('#mapellido').val(),
                Email: $('#memail').val(),
                Contraseña: $('#mpass').val()
            }
            $.ajax({
                url: "/Administrador/registrar",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify(obj),
                success: function (resp) {
                    if (resp > 0) {
                        toastr.success("El registro se ha guardado exitósamente.");
                        AdminNoExist();
                        limpiar();
                    }
                    else {
                        toastr.warning("Hubo un error al guardar.");
                    }
                },
                error: function (err) {
                    toastr.error("No se pudo completar la acción.");
                }
            });
        }
        else {
            toastr.warning("Todos los campos son requeridos.");
        }
    }
    else {
        toastr.info("Ya se ha registrado un Administrador");
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AdminNoExist() {
    $.ajax({
        url: "/Administrador/adminNoExist",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (resp) {
            if (resp > 0) {
                document.getElementById('btnRegistrar').style.display = 'none';
            } else {
                document.getElementById('btnRegistrar').style.display = 'block';
            }
        },
        error: function (err) {
            toastr.error("No se pudo verificar la existencia de usuarios.", "Error");
        },
    });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function limpiar() {
    $("#mid").val('1');
    $("#mnombre").val('');
    $("#mapellido").val('');
    $("#memail").val('');
    $("#mpass").val('');
}