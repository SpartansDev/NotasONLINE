//ejecutarlos al momento que se carga la vista
mostrarMatriculas();
cargarCarreras();
cargarEstudiantes();
cargarGrupos();

$("#frmMatricula").submit(function (event) {
    event.preventDefault();
    verificarMatricula();
});
$("#frmMatriculaModificar").submit(function (event) {
    event.preventDefault();
    modificarMatricula();
});
function capturarTexto() {
    var texto = $("#texto").val();
    if (!(texto == "")) {
        buscarRegistro(texto);
    }
    else {
        mostrarMatriculas();
    }
}
function buscarRegistro(texto) {
    $.ajax({
        url: "/Matricula/buscarPorCodigo?pText="+texto,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.EstudianteId.NombreEstudiante + '' + item.EstudianteId.ApellidoEstudiante + '</td>';
                html += '<td>' + item.Año + '</td>';
                html += '<td>' + item.Ciclo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.GrupoId.NombreGrupo + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a>||';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#inscribir">Inscribir modulo</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbmatricula tbody').html(html);
        },

        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    })
}
function mostrarMatriculas() {
    $.ajax({
        url: "/Matricula/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.EstudianteId.NombreEstudiante + ' ' + item.EstudianteId.ApellidoEstudiante + '</td>';
                html += '<td>' + item.Año+ '</td>';
                html += '<td>' + item.Ciclo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.GrupoId.NombreGrupo + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a>||';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#inscribir">Inscribir modulo</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbmatricula tbody').html(html);
        },

        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    })
}


function verificarMatricula() {
    if (!($("#año").val() == "" || $("#ciclo").val() == "" || $("#carrera").val() == "" || $("#estudiante").val() == "" || $("#grupo").val() == "")) {
        var obj = {
            Id: $("#id").val(),
            Año: $("#año").val(),
            Ciclo: $("#ciclo").val(),
            CarreraId: { Id: $("#carrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#estudiante').val(), NombreEstudiante: '', ApellidoEsdudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: { Id: $("#grupo").val(), NombreGrupo: '', Turno: '', CarreraId: '', ProfesorId: '' }
        }
        $.ajax({
            url: "/Matricula/verificar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if(resp>0)
                {
                    toastr.warning("Lo sentimos, Alumno existente en este Ciclo.");
                }
                else
                {
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

function guardarMatricula() {
    if (!($("#año").val() == "" || $("#ciclo").val() == "" || $("#carrera").val() == "" || $("#estudiante").val() == "" || $("#grupo").val() == "")) 
    { 
        var obj = {
            Id: $("#id").val(),
            Año: $("#año").val(),
            Ciclo: $("#ciclo").val(),
            CarreraId: { Id: $("#carrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#estudiante').val(), NombreEstudiante: '', ApellidoEstudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: {Id:$("#grupo").val(),NombreGrupo:'',Turno:'',CarreraId:'',ProfesorId:''}
        }
        $.ajax({
            url: "/Matricula/Agregar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                toastr.success("El registro se ha guardado exitósamente.");
                limpiarFormulario();
                mostrarMatriculas();
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

function detalleMatricula(id) {
    limpiarFormulario();
    $.ajax({
        url: "/Matricula/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#mid').val(data.Id);
            $('#maño').val(data.Año);
            $('#mciclo').val(data.Ciclo);
            $('#mcarrera').val(data.CarreraId.Id);
            $('#mestudiante').val(data.EstudianteId.Id);
            $('#mgrupo').val(data.GrupoId.Id);
            $('#btnGuardar').val('Guardar cambios');
            $('#nombreAlumno').val(data.EstudianteId.NombreEstudiante + ' ' + data.EstudianteId.ApellidoEstudiante);
            $('#Idmatricula').val(data.Id);
        },
        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    });
}

function limpiarFormulario() {
    $('#nombreAlumno').val('');
    $('#Idmatricula').val('');
    $('#año').val('');
    $('#ciclo').val('');
    $('#carrera').val(-1);
    $('#estudiante').val(-1);
    $('#grupo').val(-1);
    $('#mid').val('');
    $('#maño').val('');
    $('#mciclo').val('');
    $('#mcarrera').val(-1);
    $('#mestudiante').val('');
    $('#mgrupo').val('');
}

function cargarEstudiantes() {
    $.ajax({
        url: "/Estudiante/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreEstudiante + '</option>';
            });
            $('#estudiante').append(html);
            $('#mestudiante').append(html);
        },
        error: function (err) {
            toastr.error("Se ha produciso un error al mostrar Estudiante.");
        }
    });
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
                html += '<option value="' + item.Id + '">' + item.NombreGrupo +' '+ item.CarreraId.NombreCarrera +'</option>';
            });
            $('#grupo').append(html);
            $('#mgrupo').append(html);
        },
        error: function (err) {
            toastr.error("Se ha producido un error al mostrar Grupo.");
        }
    });
}

function cargarCarreras() {
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
            $('#mcarrera').append(html);
        },
        error: function (err) {
            toastr.error("Se ha producido un error al mostrar Carrera.");
        }
    });
}

function modificarMatricula() {
    if (!($("maño").val() == "" || $("#mciclo").val() == "" || $("#mcarrera").val() == "" || $("#mestudiante").val() == "" || $("#grupo").val() == "")) {
        var obj = {
            Id: $("#mid").val(),
            Año: $("#maño").val(),
            Ciclo: $("#mciclo").val(),
            CarreraId: { Id: $("#mcarrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#mestudiante').val(), NombreEstudiante: '', ApellidoEsdudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: { Id: $("#mgrupo").val(), NombreGrupo: '', Turno: '', CarreraId: '', ProfesorId: '' }
        }
        $.ajax({
            url: "/Matricula/Modificar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                toastr.success("El registro se ha guardado exitósamente.");
                limpiarFormulario();
                mostrarMatriculas();
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