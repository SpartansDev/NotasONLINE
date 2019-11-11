$(function () {
    cargarStudent();
    cargarGrupos();
    obtenerCarreraGuardar();
    //obtenerCarreraMatricula();
    //obtenerCarreraModificar();
});

//Funcion de modal matricular estudiante
$('#matricula').submit(function (event) {
    event.preventDefault();
    guardarMatricula();
});

//Funcion de modal guardar estudiante
$('#formulario').submit(function (event) {
    event.preventDefault();
    VerificarNoExiste();
});

//Funcion de modal modificar estudiante
$('#formularioModificar').submit(function (event) {
    event.preventDefault();
    Modificar();
});

function cargarStudent() {
    $.ajax({
        url: "/Estudiante/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.NombreEstudiante + '</td>';
                html += '<td>' + item.ApellidoEstudiante + '</td>';
                html += '<td>' + item.Codigo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a> | | ';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalMatricula">Matricular</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbEstudent tbody').html(html);
        },

        error: function (err) {
            toastr.error("Ocurrió un error, no se pudo completar la solicitud");
        }
    })
}

//buscar
function ejecutar() {
    var pBuscar = $("#alumno").val();
    if (pBuscar == "")
    {
        cargarStudent();
    }
    else
    {
        buscar(pBuscar);
    }
};

function buscar(pBuscar) {
    $.ajax({
        url: "/Estudiante/Buscar?pBuscar=" + pBuscar,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.NombreEstudiante + '</td>';
                html += '<td>' + item.ApellidoEstudiante + '</td>';
                html += '<td>' + item.Codigo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a> | | ';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalMatricula">Matricular</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbEstudent tbody').html(html);
        },

        error: function (err) {
            toastr.error("Ocurrió un error, no se pudo completar la solicitud");
        }
    })
};

function VerificarNoExiste() {
    if (!($('#nombre').val() == "" || $('#apellido').val() == "" || $('#codigo').val() == "" || $('#carrera').val() == "" || $('#pass').val() == "")) {
        var obj = {
            Id: $('#id').val(),
            NombreEstudiante: $('#nombre').val(),
            ApellidoEstudiante: $('#apellido').val(),
            Codigo: $('#codigo').val(),
            CarreraId: { Id: $('#carrera').val(), NombreCarrera: '' },
            Contraseña: $('#pass').val()
        }
        $.ajax({
            url: "/Estudiante/CodigoNoExist",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.warning("Este codigo ya esta en uso");
                }
                else {
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

function cargarGrupos() {
    $.ajax({
        url: "/Grupo/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreGrupo + ' ' + item.CarreraId.NombreCarrera + '</option>';
            });
            $('#lgrupo').append(html);
        },
        error: function (err) {
            toastr.error("No se pudieron leer");
        }
    });
}

function detalle(id) {
    $.ajax({
        url: "/Estudiante/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#mid').val(data.Id);
            $('#mnombre').val(data.NombreEstudiante);
            $('#mapellido').val(data.ApellidoEstudiante);
            $('#mcodigo').val(data.Codigo);
            $('#mcarrera').val(data.CarreraId.Id);
            Contraseña: $('#mpass').val(data.Contraseña);
        },
        error: function (err) {
            toastr.error("No se pudo completar");
        }
    });
};

function detalleMatricula(id) {
    $.ajax({
        url: "/Estudiante/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#lestudiante').val(data.Id);
            $('#lnombre').val(data.NombreEstudiante + " " + data.ApellidoEstudiante);
            $("#laño").val("");
            $("#lciclo").val("");
            $("#lcarrera").val("");
            $("#lgrupo").val("");
        },
        error: function (err) {
            toastr.error("No se pudo completar la solicitud");
        }
    });
}

function Guardar() {
    if (!($('#nombre').val() == "" || $('#apellido').val() == "" || $('#codigo').val() == "" || $('#carrera').val() == "" || $('#pass').val() == "")) {
        var obj = {
            Id: $('#id').val(),
            NombreEstudiante: $('#nombre').val(),
            ApellidoEstudiante: $('#apellido').val(),
            Codigo: $('#codigo').val(),
            CarreraId: { Id: $('#carrera').val(), NombreCarrera: '' },
            Contraseña: $('#pass').val()
        }
        $.ajax({
            url: "/Estudiante/Agregar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.success("Registro guardado");
                    cargarStudent();
                    limpiar();
                }
                else {
                    toastr.warning("No se pudo guardar");
                }
            },
            error: function (err) {
                toastr.error("No se pudo completar, error inesperado");
            }
        });
    }
    else {
        toastr.warning("Los campos son requeridos");
    }
}

function Modificar() {
    if (!($('#mnombre').val() == "" || $('#mapellido').val() == "" || $('#mcodigo').val() == "" || $('#mcarrera').val() == "" || $('#mpass').val() == "")) {
        var obj = {
            Id: $('#mid').val(),
            NombreEstudiante: $('#mnombre').val(),
            ApellidoEstudiante: $('#mapellido').val(),
            Codigo: $('#mcodigo').val(),
            CarreraId: { Id: $('#mcarrera').val(), NombreCarrera: '' },
            Contraseña: $('#mpass').val()
        };
        $.ajax({
            url: "/Estudiante/Modificar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.success("Registro guardado");
                    cargarStudent();
                    limpiar();
                }
                else {
                    toastr.warning("No se pudo guardar");
                }
            },
            error: function (err) {
                toastr.error("No se pudo completar, error inesperado");
            }
        });
    }
    else {
        toastr.warning("Los campos son requeridos");
    }
}

function obtenerCarreraGuardar() {
    $.ajax({
        url: "/Carrera/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreCarrera + '</option>';
            });
            $('#carrera').append(html);
            $("#mcarrera").append(html);
            $('#lcarrera').append(html);
        },
        error: function (err) {
            toastr.error("No se pudieron leer");
        }
    });
}

function obtenerCarreraModificar() {
    $.ajax({
        url: "/Carrera/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreCarrera + '</option>';
            });
            $('#mcarrera').append(html);
        },
        error: function (err) {
            toastr.error("No se pudieron leer");
        }
    });
}

function obtenerCarreraMatricula() {
    $.ajax({
        url: "/Carrera/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreCarrera + '</option>';
            });
            $('#lcarrera').append(html);
        },
        error: function (err) {
            toastr.error("No se pudieron leer");
        }
    });
}

function limpiar() {
    $('#id').val('');
    $('#nombre').val('');
    $('#apellido').val('');
    $('#carrera').val('-1');
    $('#codigo').val('');
    $('#pass').val('');
    $('#mid').val('');
    $('#mnombre').val('');
    $('#mapellido').val('');
    $('#mcarrera').val('-1');
    $('#mcodigo').val('');
    $('#mpass').val('');
    $("#lid").val('');
    $("#laño").val('');
    $("#lciclo").val('');
    $("#lcarrera").val('-1');
    $('#lestudiante').val('');
    $("#lgrupo").val('-1');
    $('#lnombre').val('');
}

function guardarMatricula() {
    if (!($("#laño").val() == "" || $("#lciclo").val() == "" || $("lcarrera").val() == "" || $("lestudiante").val() == "" || $("#lgrupo").val() == "")) {
        var obj = {
            Id: $("#lid").val(),
            Año: $("#laño").val(),
            Ciclo: $("#lciclo").val(),
            CarreraId: { Id: $("#lcarrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#lestudiante').val(), NombreEstudiante: '', ApellidoEsdudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: { Id: $("#lgrupo").val(), NombreGrupo: '', Turno: '', CarreraId: '', ProfesorId: '' }
        }
        $.ajax({
            url: "/Matricula/Agregar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                toastr.success("Registro guardado con éxito");
                limpiar();
            },
            error: function (err) {
                toastr.error("No se pudo completar la solicitud");
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos");
    }
}
