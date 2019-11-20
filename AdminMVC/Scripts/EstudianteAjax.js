obtenerCarreras();
cargarEstudiante();
cargarGrupos();


//Funcion de modal matricular estudiante
$('#matricula').submit(function (event) {
    event.preventDefault();
    verificarMatricula();
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

function cargarEstudiante() {
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
                if (item.StatusStudent == 1) {
                    html += '<td>Activo</td>';
                }
                else {
                    html += '<td>Inactivo</td>';
                }
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a> | | ';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalMatricula">Matricular</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbEstudent tbody').html(html);
        },

        error: function (err) {
            toastr.error("Se ha producido un error al mostrar Estudiante.");
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
                html += '<td>' + item.StatusStudent + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a> | | ';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalMatricula">Matricular</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbEstudent tbody').html(html);
        },

        error: function (err) {
            toastr.error("No se pudo completar la acción");
        }
    })
};

function VerificarNoExiste() {
    if (!($('#nombre').val() == "" || $('#apellido').val() == "" || $('#codigo').val() == "" || $('#carrera').val() == "" || $('#pass').val() == "" || $('#status').val() == "")) {
        var obj = {
            Id: $('#id').val(),
            NombreEstudiante: $('#nombre').val(),
            ApellidoEstudiante: $('#apellido').val(),
            Codigo: $('#codigo').val(),
            CarreraId: { Id: $('#carrera').val(), NombreCarrera: '' },
            Contraseña: $('#pass').val(),
            StatusStudent: $('#status').val()
        }
        $.ajax({
            url: "/Estudiante/CodigoNoExist",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.warning("Lo sentimos, código en uso.");
                }
                else {
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
            toastr.error("Se ha producido un error al mostrar Grupo.");
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
            $('#mpass').val(data.Contraseña);
            $('##mstatus').val(data.StatusStudent);
        },
        error: function (err) {
            toastr.error("No se pudo completar la acción.");
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
            $("#lcarrera").val(-1);
            $("#lgrupo").val(-1);
            $("#lstatus").val(-1);
        },
        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    });
}

function Guardar() {
    if (!($('#nombre').val() == "" || $('#apellido').val() == "" || $('#codigo').val() == "" || $('#carrera').val() == "" || $('#pass').val() == "" || $('#status').val() == "")) {
        var obj = {
            Id: $('#id').val(),
            NombreEstudiante: $('#nombre').val(),
            ApellidoEstudiante: $('#apellido').val(),
            Codigo: $('#codigo').val(),
            CarreraId: { Id: $('#carrera').val(), NombreCarrera: '' },
            Contraseña: $('#pass').val(),
            StatusStudent: $('#status').val()
        }
        $.ajax({
            url: "/Estudiante/Agregar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    limpiar();
                    toastr.success("El registro se ha guardado exitósamente.");
                    cargarEstudiante();
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
    if (!($('#mnombre').val() == "" || $('#mapellido').val() == "" || $('#mcodigo').val() == "" || $('#mcarrera').val() == "" || $('#mpass').val() == "" || $('#mstatus').val() == "")) {
        var obj = {
            Id: $('#mid').val(),
            NombreEstudiante: $('#mnombre').val(),
            ApellidoEstudiante: $('#mapellido').val(),
            Codigo: $('#mcodigo').val(),
            CarreraId: { Id: $('#mcarrera').val(), NombreCarrera: '' },
            Contraseña: $('#mpass').val(),
            StatusStudent: $('#mstatus').val(),
        };
        $.ajax({
            url: "/Estudiante/Modificar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    limpiar();
                    toastr.success("El registro se ha guardado exitósamente.");
                    cargarEstudiante();
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

function obtenerCarreras() {
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
            $("#mcarrera").append(html);
            $('#carrera').append(html);
        },
        error: function (err) {
            toastr.error("Se produjo un error al mostrar Carreras.");
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
    $('#statusstudent').val('');
    $('#mid').val('');
    $('#mnombre').val('');
    $('#mapellido').val('');
    $('#mcarrera').val('-1');
    $('#mcodigo').val('');
    $('#mpass').val('');
    $('#mstatuss').val('');
    $("#lid").val('');
    $("#laño").val('');
    $("#lciclo").val('');
    $("#lcarrera").val('-1');
    $('#lestudiante').val('');
    $("#lgrupo").val('-1');
    $('#lnombre').val('');
    $('#lstatus').val('');
}

function guardarMatricula() {
    if (!($("#laño").val() == "" || $("#lciclo").val() == "" || $("lcarrera").val() == "" || $("lestudiante").val() == "" || $("#lgrupo").val() == "")) {
        var obj = {
            Id: $("#lid").val(),
            Año: $("#laño").val(),
            Ciclo: $("#lciclo").val(),
            CarreraId: { Id: $("#lcarrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#lestudiante').val(), NombreEstudiante: '', ApellidoEsdudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: { Id: $("#lgrupo").val(), NombreGrupo: '', Turno: '', CarreraId: '', ProfesorId: '' },
            StatusStudent: $("#lstatus").val(),
        }
        $.ajax({
            url: "/Matricula/Agregar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                limpiar();
                toastr.success("Registro se ha guardado exitósamente.");
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
function verificarMatricula() {
    if (!($("#laño").val() == "" || $("#lciclo").val() == "" || $("lcarrera").val() == "" || $("lestudiante").val() == "" || $("#lgrupo").val() == "")) {
        var obj = {
            Id: $("#lid").val(),
            Año: $("#laño").val(),
            Ciclo: $("#lciclo").val(),
            CarreraId: { Id: $("#lcarrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#lestudiante').val(), NombreEstudiante: '', ApellidoEsdudiante: '', Codigo: '', CarreraId: '', Contraseña: '', StatusStudent:''},
            GrupoId: { Id: $("#lgrupo").val(), NombreGrupo: '', Turno: '', CarreraId: '', ProfesorId: '' }
        }
        $.ajax({
            url: "/Matricula/verificar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.warning("Lo sentimos, Alumno existente en el Ciclo.");
                }
                else {
                    guardarMatricula();
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
};