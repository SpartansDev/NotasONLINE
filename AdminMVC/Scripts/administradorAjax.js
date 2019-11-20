$(function () {
    cargarAdmin();
})

$('#frmAdmin').submit(function (event) {
    event.preventDefault();
    EmailNoExist();
})
$('#frmModificar').submit(function (event) {
    event.preventDefault();
    Modificar();
})

function cargarAdmin() {
    $.ajax({
        url: "/Administrador/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.NombreAdministrador + '</td>';
                html += '<td>' + item.ApellidoAdministrador + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>';
                html += '<a href="#" class="badge badge-danger tbbutons" data-toggle="modal" data-target="#modalModificar" onclick="detalle(' + item.Id + ')">Modificar</a> ';
                
                html += '</td>';
                html += '</tr>';
            });
            $('#tbAdmin tbody').html(html);
        },
        error: function (err) {
            $('.alert').alert("Se ha producido un error en mostrar los Administadores");
        }
    })
}

function Guardar() {
    if (!($('#nombre').val() == "" || $('#apellido').val() == "" || $('#email').val() == "" || $('#pass').val() == "")) {
        var obj = {
            Id: $('#id').val(),
            NombreAdministrador: $('#nombre').val(),
            ApellidoAdministrador: $('#apellido').val(),
            Email: $('#email').val(),
            Contraseña: $('#pass').val()
        }
        $.ajax({
            url: "/Administrador/Agregar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.success("El registro se ha guardado exitósamente.");
                    cargarAdmin();
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
function Modificar() {
    if (!($('#mnombre').val() == "" || $('#mapellido').val() == "" || $('#memail').val() == "" || $('#mpass').val() == "")) {
        var obj = {
            Id: $('#mid').val(),
            NombreAdministrador: $('#mnombre').val(),
            ApellidoAdministrador: $('#mapellido').val(),
            Email: $('#memail').val(),
            Contraseña: $('#mpass').val()
        }
        $.ajax({
            url: "/Administrador/Modificar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.success("El registro se ha guardado exitósamente.");
                    cargarAdmin();
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
        toastr.warning("Todos los campos son requeridos");
    }
}
function detalle(id) {
    $.ajax({
        url: "/Administrador/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#mid').val(data.Id);
            $('#mnombre').val(data.NombreAdministrador);
            $('#mapellido').val(data.ApellidoAdministrador);
            $('#memail').val(data.Email);
            $('#mpass').val(data.Contraseña);
        },
        error: function (err) {
            toastr.error("No se pudo completar esta acción");
        }
    });
}

function limpiar() {
    $('#id').val('');
    $('#nombre').val('');
    $('#apellido').val('');
    $('#email').val('');
    $('#pass').val('');
    $('#mid').val('');
    $('#mnombre').val('');
    $('#mapellido').val('');
    $('#memail').val('');
    $('#mpass').val('');
}

function EmailNoExist() {
    if (!($('#nombre').val() == "" || $('#apellido').val() == "" || $('#email').val() == "" || $('#pass').val() == "")) {
        var obj = {
            Id: $('#id').val(),
            NombreAdministrador: $('#nombre').val(),
            ApellidoAdministrador: $('#apellido').val(),
            Email: $('#email').val(),
            Contraseña: $('#pass').val()
        }
        $.ajax({
            url: "/Administrador/EmailNoExist",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp >0) {
                    toastr.warning("Lo sentimos, correo existente"); 
                }
                else {
                    Guardar();
                }
            },
            error: function (err) {
                toastr.error("No se pudo completar la acción");
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos");
    }
}

