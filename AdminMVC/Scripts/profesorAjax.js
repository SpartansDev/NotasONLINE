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
                toastr.error("no se pudieron cargar");
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
                        toastr.warning("Este correo ya esta en uso");
                    }
                    else
                    {
                        Guardar();
                    }
                },
                error: function (err) {
                    toastr.warning('Algo salio mal');
                }
            });
        } else {
            toastr.warning('Todos los campos son requeridos');
        }
    }

    function eliminar(id) {
        var resp = confirm("Estas seguro de eliminar este dato?");
        if (resp) {
            $.ajax({
                url: "/Profesor/Eliminar?pId=" + id,
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (res) {
                    if (res > 0) {
                        alert("Registro Eliminado");
                        cargarProfesores();
                    }
                    else {
                        toastr.warning("no se pudo eliminar");
                    }
                },
                error: function (err) {
                    toastr.error("algo salio mal (profesor-ajax)");
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
                toastr.error("Nose pudo completar");
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
                        toastr.success("Registro guardado");
                        cargarProfesor();
                        limpiar();
                    }
                    else {
                        toastr.warning("No se pudo guardar");
                    }
                },
                error: function (err) {
                    toastr.error("No se pudo completar, error inesperado", { positionClass: toast - top - center });
                }
            });
        }
        else {
            toastr.warning("Los campos son requeridos");
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
                        toastr.success("Registro guardado");
                        cargarProfesor();
                        mlimpiar();
                    }
                    else {
                        toastr.warning("No se pudo guardar");
                    }
                },
                error: function (err) {
                    toastr.error("No se pudo completar, error inesperado",{positionClass:toast-top-center});
                }
            });
        }
        else {
            toastr.warning("Los campos son requeridos");
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