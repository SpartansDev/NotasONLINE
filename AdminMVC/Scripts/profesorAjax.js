cargarProfesor();
$('#frmProfesor').submit(function (event) {
    event.preventDefault();
    VerificarNoExiste();
})
$('#frmModificar').submit(function (event) {
    event.preventDefault();
    modificar();
})
    function cargarProfesor() {
        $.ajax({
            url: "/Profesor/Mostrar",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                var html = '';
                $.each(data, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.Id + '</td>';
                    html += '<td>' + item.NombreProfesor + '</td>';
                    html += '<td>' + item.ApellidoProfesor + '</td>';
                    html += '<td>' + item.Email + '</td>';
                    html += '<td>';
                    html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a>';
                    html += '</td>';
                    html += '</tr>';
                });
                $('#tbprofe tbody').html(html);
            },
            error: function (err) {
                toastr.error("Se ha producido un error al mostrar Profesor.");
            }
        })
    }
    function VerificarNoExiste() {
        if (!($('#nombre').val() == "" || $('#apellido').val() == "" || $('#email').val() == "" || $('#pass').val() == "")) {
            var obj = {
                Id: $('#id').val(),
                NombreProfesor: $('#nombre').val(),
                ApellidoProfesor: $('#apellido').val(),
                Email: $('#email').val(),
                Contraseña: $('#pass').val()
            }
            $.ajax({
                url: "/Profesor/ExisteProfesor",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify(obj),
                success: function (resp) {
                    if (resp>0) {
                        toastr.warning("Lo sentimos, correo existente.");
                    }
                    else
                    {
                        Guardar();
                    }
                },
                error: function (err) {
                    toastr.warning('Se produjo un error.');
                }
            });
        } else {
            toastr.warning('Todos los campos son requeridos.');
        }
    }

    function eliminar(id) {
        var resp = confirm("Estás seguro de eliminar este dato?");
        if (resp) {
            $.ajax({
                url: "/Profesor/Eliminar?pId=" + id,
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (res) {
                    if (res > 0) {
                        alert("El registro se ha eliminado exitósamente");
                        cargarProfesores();
                    }
                    else {
                        toastr.warning("Se produjo un error al eliminar");
                    }
                },
                error: function (err) {
                    toastr.error("Hub un error (profesor-ajax)");
                }
            });
        }
    }
    function detalle(id) {
        $.ajax({
            url: "/Profesor/ObtenerPorId?pId=" + id,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('#mid').val(data.Id);
                $('#mnombre').val(data.NombreProfesor);
                $('#mapellido').val(data.ApellidoProfesor);
                $('#memail').val(data.Email);
                $('#mpass').val(data.Contraseña);
            },
            error: function (err) {
                toastr.error("No se pudo completar la acción.");
            }
        });
    }

    function Guardar() {
        if (!($('#nombre').val() == "" || $('#apellido').val() == "" || $('#email').val() == "" || $('#pass').val() == "")) {
            var obj = {
                Id: $('#id').val(),
                NombreProfesor: $('#nombre').val(),
                ApellidoProfesor: $('#apellido').val(),
                Email: $('#email').val(),
                Contraseña: $('#pass').val()
            }
            $.ajax({
                url: "/Profesor/Agregar",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify(obj),
                success: function (resp) {
                    if (resp > 0) {
                        toastr.success("El registro se ha guardado exitósamente.");
                        cargarProfesor();
                        limpiar();
                    }
                    else {
                        toastr.warning("Hubo un error al guardar.");
                    }
                },
                error: function (err) {
                    toastr.error("No se pudo completar la acción.", { positionClass: toast - top - center });
                }
            });
        }
        else {
            toastr.warning("Todos los campos son requeridos.");
        }
    }

    function modificar() {
        if (!($('#mnombre').val() == "" || $('#mapellido').val() == "" || $('#memail').val() == "" || $('#mpass').val() == "")) {
            var obj = {
                Id: $('#mid').val(),
                NombreProfesor: $('#mnombre').val(),
                ApellidoProfesor: $('#mapellido').val(),
                Email: $('#memail').val(),
                Contraseña: $('#mpass').val()
            }

            $.ajax({
                url: "/Profesor/Modificar",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify(obj),
                success: function (resp) {
                    if (resp > 0) {
                        toastr.success("El registro se ha guardado exitósamente.");
                        cargarProfesor();
                        mlimpiar();
                    }
                    else {
                        toastr.warning("Hubo un error al guardar.");
                    }
                },
                error: function (err) {
                    toastr.error("No se pudo completar la acción.",{positionClass:toast-top-center});
                }
            });
        }
        else {
            toastr.warning("Todos los campos son requeridos.");
        }
    }


    function limpiar() {
        $('#id').val('');
        $('#nombre').val('');
        $('#apellido').val('');
        $('#email').val('');
        $('#pass').val('');
    }
    function mlimpiar() {
        $('#mid').val('');
        $('#mnombre').val('');
        $('#mapellido').val('');
        $('#memail').val('');
        $('#mpass').val('');
    }